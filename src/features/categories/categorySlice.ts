import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface Category {
  id: string,
  name: string,
  description: string,
  is_active: boolean,
  deleted_at: string | null,
  created_at: string,
  updated_at: string,
}

const category = {
  id: "199183e2-5d97-11ee-8c99-0242ac120001",
  name: "Olive",
  description: "Earum quo at dolor tempore nisi.",
  is_active: true,
  deleted_at: null,
  created_at: "2020-06-06T11:00:00+0000",
  updated_at: "2020-06-06T11:00:00+0000",
}

const categories = [
  category,
  { ...category, id: "199183e2-5d97-11ee-8c99-0242ac120002", name: "Peach" },
  { ...category, id: "199183e2-5d97-11ee-8c99-0242ac120003", name: "Apple" },
  { ...category, id: "199183e2-5d97-11ee-8c99-0242ac120003", name: "Banana" },
]

export const initialState = [
  ...categories
]

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {}
})

// Selectors
export const selectCategories = (state: RootState) => state.categories

export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id)

  console.log('category 2', id)

  return (category ?? {
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: "",
    updated_at: "",
  })
}

export default categoriesSlice.reducer