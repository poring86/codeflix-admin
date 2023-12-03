import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { uploadVideo } from "./uploadThunk"

export interface UploadState {
  id: string
  videoId: string
  field: string
  file: File
  progress?: number
  status?: "idle" | "loading" | "success" | "failed"
}

type UploadProgress = {
  id: string
  progress: number
}

const initialState: UploadState[] = []

const uploadSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
    addUpload(state, action: PayloadAction<UploadState>) {
      state.push({ ...action.payload, status: "idle", progress: 0 })
    },
    removeUpload(state, action: PayloadAction<string>) {
      const index = state.findIndex((upload) => upload.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    setUploadProgress(state, action: PayloadAction<UploadProgress>) {
      const { id, progress } = action.payload
      const upload = state.find((upload) => upload.id === id)
      if (upload) {
        upload.progress = progress
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadVideo.pending, (state, action) => {
      const upload = state.find((upload) => upload.id === action.meta.arg.id);
      if (upload) {
        upload.status = "loading";
      }
    });

    builder.addCase(uploadVideo.fulfilled, (state, action) => {
      const upload = state.find((upload) => upload.id === action.meta.arg.id);
      if (upload) {
        upload.status = "success";
      }
    });

    builder.addCase(uploadVideo.rejected, (state, action) => {
      const upload = state.find((upload) => upload.id === action.meta.arg.id);
      if (upload) {
        upload.status = "failed";
      }
    });
  },
})

export const { addUpload, removeUpload, setUploadProgress } = uploadSlice.actions

export const selectUploads = (state: RootState) => state.uploadSlice;

export const uploadsReducer = uploadSlice.reducer