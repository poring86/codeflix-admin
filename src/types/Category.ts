export interface Results {
  meta: Meta
  links: Links
  data: Category[]
}

export interface Result {
  meta: Meta
  links: Links
  data: Category
}

export interface Category {
  description: string
  id: string
  name: string
  deleted_at: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Links {
  prev: null
  last: string
  next: string
  first: string
}

export interface Meta {
  to: number
  from: number
  path: string
  total: number
  per_page: number
  last_page: number
  current_page: number
}

export interface CategoryParams {
  search: any
  page?: number
  perPage?: number
  next?: string
  isActive?: boolean
}