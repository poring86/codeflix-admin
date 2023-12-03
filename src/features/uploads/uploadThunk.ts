import { createAsyncThunk } from "@reduxjs/toolkit";
import { UploadState, setUploadProgress } from "./uploadSlice";
import { uploadProgress, uploadService } from "./uploadAPI";
import { AxiosProgressEvent } from "axios";

export const uploadVideo = createAsyncThunk(
  "uploads/uploadVideo",
  async ({ videoId, id, file, field }: UploadState, thunkAPI) => {

    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
      const progress = uploadProgress(progressEvent)
      thunkAPI.dispatch(setUploadProgress({ id, progress }))
    }

    try {
      const params = { videoId, id, file, field, onUploadProgress };
      const response = await uploadService(params);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
      return thunkAPI.rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);