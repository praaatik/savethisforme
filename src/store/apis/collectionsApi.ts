import {
  createApi,
  fetchBaseQuery,
  fakeBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const collectionsApi = createApi({
  reducerPath: "collections",
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      getCollections: builder.query<any, void>({
        async queryFn() {
          const data = await supabase.from("collection").select();
          return { data };
        },
      }),
      getCollectionById: builder.query<any, number>({
        async queryFn(arg) {
          const data = await supabase
            .from("collection")
            .select("*")
            .eq("collectionId", arg);
          return { data };
        },
      }),
    };
  },
});

export const { useGetCollectionsQuery, useGetCollectionByIdQuery } =
  collectionsApi;
export { collectionsApi };
