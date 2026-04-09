-- ============================================================
-- LinkMe — Fix Storage RLS Policies
-- ============================================================

-- Drop policy lama yang salah
drop policy if exists "avatar_upload_own" on storage.objects;
drop policy if exists "avatar_read_public" on storage.objects;

-- Policy baru untuk INSERT - user bisa upload ke folder avatars dengan filename user ID mereka
create policy "avatar_upload_own" on storage.objects
  for insert
  with check (
    bucket_id = 'linkme-uploads'
    and (storage.foldername(name))[1] = 'avatars'
    and (storage.filename(name))::text like (auth.uid()::text || '.%')
  );

-- Policy baru untuk UPDATE (dibutuhkan untuk upsert: true)
create policy "avatar_update_own" on storage.objects
  for update
  with check (
    bucket_id = 'linkme-uploads'
    and (storage.foldername(name))[1] = 'avatars'
    and (storage.filename(name))::text like (auth.uid()::text || '.%')
  );

-- Policy untuk READ - publik bisa baca semua avatar
create policy "avatar_read_public" on storage.objects
  for select
  using (bucket_id = 'linkme-uploads');

-- Policy untuk DELETE - user bisa delete avatar mereka sendiri
create policy "avatar_delete_own" on storage.objects
  for delete
  using (
    bucket_id = 'linkme-uploads'
    and (storage.foldername(name))[1] = 'avatars'
    and (storage.filename(name))::text like (auth.uid()::text || '.%')
  );
