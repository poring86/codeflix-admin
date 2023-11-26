import { Result, Results, Video, VideoParams } from "../../types/Videos";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/videos";

export const initialState: Video = {
  id: "",
  title: "",
  rating: "",
  genres: [],
  duration: "0",
  opened: false,
  deleted_at: "",
  created_at: "",
  updated_at: "",
  categories: [],
  description: "",
  year_launched: "0",
  cast_members: [],
  thumb_file_url: "",
  video_file_url: "",
  banner_file_url: "",
  trailer_file_url: "",
};

function parseQueryParams(params: VideoParams) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value.toString());
    }
  });

  return query.toString();
}

const getVideos = ({ page = 1, perPage = 10, search = "" }: VideoParams) => {
  return `${endpointUrl}?${parseQueryParams({ page, perPage, search })}`;
};

function deleteVideo({ id }: { id: string }) {
  return { url: `${endpointUrl}/${id}`, method: "DELETE" };
}

const getVideo = ({ id }: { id: string }) => {
  return `${endpointUrl}/?${id}`;
};


export const videosSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getVideos: query<Results, VideoParams>({
      query: getVideos,
      providesTags: ["Videos"],
    }),
    getVideo: query<Result, { id: string }>({
      query: getVideo,
      providesTags: ["Videos"],
    }),
    deleteVideo: mutation<Result, { id: string }>({
      query: deleteVideo,
      invalidatesTags: ["Videos"],
    }),
  })
})

export const {
  useGetVideosQuery,
  useDeleteVideoMutation,
  useGetVideoQuery
} = videosSlice