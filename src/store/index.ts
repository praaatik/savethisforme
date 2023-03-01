import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { collectionsApi } from "./apis/collectionsApi";

export const store = configureStore({
  reducer: {
    [collectionsApi.reducerPath]: collectionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(collectionsApi.middleware);
  },
});

setupListeners(store.dispatch);
export {
  useGetCollectionsQuery,
  useGetCollectionByIdQuery,
} from "./apis/collectionsApi";
