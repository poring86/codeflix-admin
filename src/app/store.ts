import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'

import { categoriesApiSlice } from '../features/categories/categorySlice'
import { castMembersApiSlice } from '../features/castMembers/castMembersSlice'
import { genreSlice } from '../features/genre/genreSlice'
import { videosSlice } from '../features/videos/videosSlice'
import { uploadsReducer } from '../features/uploads/uploadSlice'
import { uploadQueue } from '../middleware/uploadQueue'

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  [castMembersApiSlice.reducerPath]: apiSlice.reducer,
  [videosSlice.reducerPath]: apiSlice.reducer,
  [genreSlice.reducerPath]: apiSlice.reducer,
  uploadSlice: uploadsReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
        .prepend(uploadQueue.middleware)
        .concat(apiSlice.middleware)
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
