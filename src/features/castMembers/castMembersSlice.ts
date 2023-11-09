import { CastMember, CastMemberParams, Results } from "../../types/CastMembers"
import { Result } from "../../types/CastMembers"
import { apiSlice } from "../api/apiSlice"

const endpointUrl = "/cast_members"

export const initialState: CastMember = {
  id: "",
  name: "",
  type: 0,
  created_at: "",
  updated_at: "",
  deleted_at: null
}

function parseQueryParams(params: CastMemberParams) {
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

  if (params.type) {
    query.append('type', params.type.toString())
  }

  return query.toString()
}

function getCastMembers(params: CastMemberParams) {
  const { page = 1, perPage = 10, search, type } = params
  return `${endpointUrl}?${parseQueryParams({ page, perPage, search, type })}`
}

function deleteCastMember({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: 'DELETE',
  }
}

function updateCastMember(castMember: CastMember) {
  return {
    method: "PUT",
    url: `${endpointUrl}/${castMember.id}`,
    body: castMember,
  };
}

function getCastMember({ id }: { id: string }) {
  return {
    method: 'GET',
    url: `${endpointUrl}/${id}`,
  }
}

function createCastMember(castMember: CastMember) {
  return {
    method: "POST",
    url: endpointUrl,
    body: castMember
  }
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"]
    }),
    getCastMember: query<Result, { id: string }>({
      query: getCastMember,
      providesTags: ["CastMembers"]
    }),
    updateCastMember: mutation<Result, CastMember>({
      query: updateCastMember,
      invalidatesTags: ["CastMembers"]
    }),
    createCastMember: mutation<Result, CastMember>({
      query: createCastMember,
      invalidatesTags: ["CastMembers"]
    }),
    deleteCastMember: mutation<Result, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ["CastMembers"]
    })
  }),
})

export const { useGetCastMembersQuery, useGetCastMemberQuery, useDeleteCastMemberMutation, useUpdateCastMemberMutation, useCreateCastMemberMutation } = castMembersApiSlice