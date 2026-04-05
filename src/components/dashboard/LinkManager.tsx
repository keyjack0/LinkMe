'use client'

import { useState, useTransition } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { createLink, updateLink, deleteLink, toggleLinkActive, reorderLinks } from '@/lib/actions/links.actions'
import type { Link } from '@/types'

// ─── Sortable Link Item ───────────────────────────────────────
function SortableLinkItem({
  link,
  onEdit,
  onDelete,
  onToggle,
}: {
  link: Link
  onEdit: (link: Link) => void
  onDelete: (id: string) => void
  onToggle: (id: string, val: boolean) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 p-4 bg-white rounded-2xl border border-[var(--border)] transition-all ${
        isDragging ? 'shadow-xl shadow-black/10 scale-[1.02] z-10 opacity-90' : 'hover:border-ink-light'
      } ${!link.is_active ? 'opacity-50' : ''}`}
    >
      {/* Drag handle */}
      <button {...attributes} {...listeners} className="text-ink-light hover:text-ink-muted cursor-grab active:cursor-grabbing touch-none p-1">
        <GripVertical size={18} />
      </button>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base flex-shrink-0"
        style={{ background: link.color ?? '#1B56FD' }}
      >
        {link.icon ?? '🔗'}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-ink truncate">{link.title}</div>
        <div className="text-xs text-ink-muted truncate">{link.url}</div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => onToggle(link.id, !link.is_active)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted hover:text-ink hover:bg-cream transition-all"
          title={link.is_active ? 'Sembunyikan' : 'Tampilkan'}
        >
          {link.is_active ? <Eye size={15} /> : <EyeOff size={15} />}
        </button>
        <button
          onClick={() => onEdit(link)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted hover:text-brand hover:bg-brand/10 transition-all"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(link.id)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}

// ─── Link Form Modal ──────────────────────────────────────────
const PRESET_COLORS = ['#1B56FD', '#7C3AED', '#EC4899', '#059669', '#F59E0B', '#EF4444', '#0EA5E9', '#0A0A0A']
const PRESET_ICONS = ['🔗', '🎨', '📸', '▶️', '✍️', '💼', '🛒', '🎵', '📧', '🌐', '💻', '📱', '🎮', '📚', '🎬']

function LinkFormModal({
  link,
  onClose,
  onSave,
}: {
  link: Partial<Link> | null
  onClose: () => void
  onSave: (data: { title: string; url: string; icon: string; color: string; is_active: boolean }) => void
}) {
  const [title, setTitle] = useState(link?.title ?? '')
  const [url, setUrl] = useState(link?.url ?? '')
  const [icon, setIcon] = useState(link?.icon ?? '🔗')
  const [color, setColor] = useState(link?.color ?? '#1B56FD')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !url) { toast.error('Judul dan URL wajib diisi'); return }
    startTransition(() => { onSave({ title, url, icon, color, is_active: link?.is_active ?? true }) })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-5 border-b border-[var(--border)]">
          <h2 className="font-display text-lg font-bold text-ink">
            {link?.id ? 'Edit Link' : 'Tambah Link Baru'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Preview */}
          <div
            className="flex items-center gap-3 p-4 rounded-2xl text-white"
            style={{ background: color }}
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg">{icon}</div>
            <span className="font-medium text-sm">{title || 'Judul Link'}</span>
            <span className="ml-auto text-white/70 text-xs">→</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Judul</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="contoh: Portfolio Saya" className="input-base" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">URL</label>
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." type="url" className="input-base" required />
          </div>

          {/* Icon picker */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Ikon</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_ICONS.map(i => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                    icon === i ? 'ring-2 ring-brand scale-110 bg-brand/10' : 'hover:bg-cream'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Warna</label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  style={{ background: c }}
                  className={`w-8 h-8 rounded-full transition-all ${
                    color === c ? 'ring-2 ring-offset-2 ring-brand scale-110' : 'hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 py-3">Batal</button>
            <button type="submit" disabled={isPending} className="btn-primary flex-1 py-3">
              {isPending ? <Loader2 size={16} className="animate-spin" /> : null}
              {link?.id ? 'Simpan Perubahan' : 'Tambah Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Main LinkManager ─────────────────────────────────────────
export function LinkManager({ initialLinks, profileId }: { initialLinks: Link[]; profileId: string }) {
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [editingLink, setEditingLink] = useState<Partial<Link> | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isPending, startTransition] = useTransition()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = links.findIndex(l => l.id === active.id)
    const newIndex = links.findIndex(l => l.id === over.id)
    const newLinks = arrayMove(links, oldIndex, newIndex)
    setLinks(newLinks)
    startTransition(async () => {
      const result = await reorderLinks(newLinks.map(l => l.id))
      if (result.error) toast.error(result.error)
    })
  }

  function handleAdd() {
    setEditingLink(null)
    setShowModal(true)
  }

  function handleEdit(link: Link) {
    setEditingLink(link)
    setShowModal(true)
  }

  async function handleSave(data: { title: string; url: string; icon: string; color: string; is_active: boolean }) {
    if (editingLink?.id) {
      const result = await updateLink(editingLink.id, data)
      if (result.error) { toast.error(result.error); return }
      setLinks(prev => prev.map(l => l.id === editingLink.id ? { ...l, ...data } : l))
      toast.success('Link diperbarui!')
    } else {
      const result = await createLink({ ...data, url: data.url })
      if (result.error) { toast.error(result.error); return }
      toast.success('Link ditambahkan!')
      // Reload list dari server
      window.location.reload()
    }
    setShowModal(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus link ini?')) return
    setLinks(prev => prev.filter(l => l.id !== id))
    const result = await deleteLink(id)
    if (result.error) { toast.error(result.error); setLinks(initialLinks); return }
    toast.success('Link dihapus')
  }

  async function handleToggle(id: string, val: boolean) {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, is_active: val } : l))
    const result = await toggleLinkActive(id, val)
    if (result.error) { toast.error(result.error); setLinks(prev => prev.map(l => l.id === id ? { ...l, is_active: !val } : l)) }
  }

  return (
    <>
      <div className="space-y-4">
        <button onClick={handleAdd} className="btn-primary w-full py-3.5 rounded-2xl text-base">
          <Plus size={18} />
          Tambah Link Baru
        </button>

        {links.length === 0 ? (
          <div className="text-center py-16 card">
            <div className="text-4xl mb-4">🔗</div>
            <p className="font-display text-lg font-bold text-ink">Belum ada link</p>
            <p className="text-sm text-ink-muted mt-1">Klik tombol di atas untuk menambahkan link pertamamu</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={links.map(l => l.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {links.map(link => (
                  <SortableLinkItem
                    key={link.id}
                    link={link}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        <p className="text-xs text-center text-ink-muted pt-2">
          💡 Drag & drop untuk mengubah urutan link
        </p>
      </div>

      {showModal && (
        <LinkFormModal
          link={editingLink}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  )
}
