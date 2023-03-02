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
      getCollectionsByUser: builder.query<
        ICollection[] | PostgrestError,
        string
      >({
        async queryFn(arg) {
          const { data, error } = await supabase
            .from("collection")
            .select("*")
            .eq("userId", arg);
          if (data) {
            console.log(data);
            const collections: ICollection[] = data as ICollection[];
            return { data: collections };
          } else {
            return { error };
          }
        },
      }),
    };
  },
});

export const { useGetCollectionsQuery, useGetCollectionsByUserQuery } =
  collectionsApi;
export { collectionsApi };

//getCollectionByUserId
//updateCollectionName
//deleteCollection
//createCollection
