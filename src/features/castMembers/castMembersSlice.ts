import { CastMember, CastMemberParams, Results } from "../../types/CastMembers"
import { Result } from "../../types/Category"
import { apiSlice } from "../api/apiSlice"

const endpointUrl = "/cast_members"

export const initialState: CastMember = {
  id: "",
  name: "",
  type: 0,
  createdAt: "",
  updatedAt: "",
  deletedAt: null
}

function parseQueryParams(params: CastMemberParams) {
  return null
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
    data: castMember
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
    deleteCastMembers: mutation<Result, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ["CastMembers"]
    })
  }),
})

const { useGetCastMembersQuery, useGetCastMemberQuery, useDeleteCastMembersMutation, useUpdateCastMemberMutation, useCreateCastMemberMutation } = castMembersApiSlice