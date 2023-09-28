import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

interface Category {
  id: string,
  name: string,
  description: string,
  is_active: boolean,
  delete_at: string | null,
  created_at: string,
  updated_at: string,
}

const category = {
  id: "199183e2-5d97-11ee-8c99-0242ac120001",
  name: "Olive",
  description: "Earum quo at dolor tempore nisi.",
  is_active: true,
  delete_at: null,
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

export const selectCategories = (state: RootState) => state.categories

export default categoriesSlice.reducer