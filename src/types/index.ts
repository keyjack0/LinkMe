export * from './database.types'

// App-specific types
export interface NavItem {
  label: string
  href: string
  icon?: string
}

export interface ThemeConfig {
  id: string
  name: string
  bgColor: string
  textColor: string
  accentColor: string
  cardStyle: 'rounded' | 'pill' | 'square' | 'outline'
  isPremium: boolean
}

export interface LinkFormData {
  title: string
  url: string
  icon: string
  color: string
  is_active: boolean
}

export interface ProfileFormData {
  username: string
  display_name: string
  bio: string
  theme_id: string
}

export type ToastType = 'success' | 'error' | 'loading'
