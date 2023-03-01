import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import ICollection from "../../utils/interfaces/ICollection.interface";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const collectionsApi = createApi({
  reducerPath: "collections",
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      getCollections: builder.query<ICollection[] | PostgrestError, void>({
        async queryFn(arg) {
          const { data, error } = await supabase.from("collections").select();

          if (data) {
            const collections: ICollection[] = data as ICollection[];
            return { data: collections };
          } else {
            return { error };
          }
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
