import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { apiSlice } from "../api/apiSlice"
import { CategoryParams, Result, Results } from "../../types/Category"

export interface Category {
  id: string,
  name: string,
  description: string | null,
  is_active: boolean,
  deleted_at: string | null,
  created_at: string,
  updated_at: string,
}

const endpointUrl: string = "/categories"

function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams()

  if (params.page) {
    query.append('page', params.page.toString())
  }

  if (params.perPage) {
    query.append('per_page', params.perPage.toString())
  }

  if (params.search) {
    query.append('search', params.search.toString())
  }

  if (params.isActive) {
    query.append('is_active', params.isActive.toString())
  }

  return query.toString()
}

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search, isActive: true };

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

function createCategoryMutation(category: Category) {
  return {
    url: endpointUrl,
    method: "POST",
    body: category
  }
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: 'PUT',
    body: category
  }
}

function getCategory({ id }: { id: string }) {
  return `${endpointUrl}/${id}`
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategory: query<Result, { id: string }>({
      query: getCategory,
      providesTags: ["Categories"],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ['Categories']
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: mutation<Result, { id: string }>({
      query: updateCategoryMutation,
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

export const { useGetCategoriesQuery, useGetCategoryQuery, useDeleteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation } = categoriesApiSlice