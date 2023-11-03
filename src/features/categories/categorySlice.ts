import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { apiSlice } from "../api/apiSlice"
import { Results } from "../../types/Category"

export interface Category {
  id: string,
  name: string,
  description: string,
  is_active: boolean,
  deleted_at: string | null,
  created_at: string,
  updated_at: string,
}

const endpointUrl: string = "/categories"

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  }
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, void>({
      query: () => `${endpointUrl}`,
      providesTags: ["Categories"],
    }),
    deleteCategory: mutation<Results, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    })
  })
})

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
  { ...category, id: "199183e2-5d97-11ee-8c99-0242ac120004", name: "Banana" },
]

export const initialState = [
  ...categories
]

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateCategory(state, action) {
      const index = state.findIndex((category) => category.id === action.payload.id)

      state[index] = action.payload
    },
    createCategory(state, action) {
      console.log('action.payload', action.payload)
      state.push(action.payload)
    },
    deleteCategory(state, action) {
      const index = state.findIndex((category) => category.id === action.payload.id)

      state.splice(index, 1)
    }
  }
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

export const { updateCategory, createCategory, deleteCategory } = categoriesSlice.actions

export const { useGetCategoriesQuery, useDeleteCategoryMutation } = categoriesApiSlice