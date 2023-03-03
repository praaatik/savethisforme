import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "./apis/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

setupListeners(store.dispatch);
export {
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
  useUpdateCollectionNameMutation,
  useDeleteCollectionMutation,
  useCreateCollectionMutation,
  useGetBookmarksQuery,
  useGetAllBookmarksForUserQuery,
  useGetBookmarksByCollectionQuery,
  useDeleteBookmarkMutation,
} from "./apis/api";
