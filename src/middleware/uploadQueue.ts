import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addUpload } from "../features/uploads/uploadSlice";
import { uploadVideo } from "../features/uploads/uploadThunk";

const uploadQueue = createListenerMiddleware();

uploadQueue.startListening({
  actionCreator: addUpload,
  effect: async (action, store) => {
    await store.dispatch(uploadVideo(action.payload));
  },
});

export { uploadQueue };
