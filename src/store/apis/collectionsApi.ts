import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import ICollection from "../../utils/interfaces/ICollection.interface";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

interface IUpdateCollectionName {
  collectionId: number;
  updatedCollectionName: string;
}

const collectionsApi = createApi({
  reducerPath: "collections",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["collection"],
  endpoints(builder) {
    return {
      getCollections: builder.query<ICollection[] | PostgrestError, void>({
        providesTags: ["collection"],
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
        providesTags: ["collection"],
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
      updateCollectionName: builder.mutation<
        ICollection | PostgrestError,
        IUpdateCollectionName
      >({
        invalidatesTags: ["collection"],
        async queryFn(arg) {
          const { data, error } = await supabase
            .from("collection")
            .update({ collectionName: arg.updatedCollectionName })
            .eq("collectionId", arg.collectionId)
            .select();

          if (data) {
            const updatedCollection: ICollection = data[0] as ICollection;
            return { data: updatedCollection };
          } else {
            return { error };
          }
        },
      }),
    };
  },
});

export const {
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
  useUpdateCollectionNameMutation,
} = collectionsApi;
export { collectionsApi };

//getCollectionByUserId
//updateCollectionName

//deleteCollection
//createCollection
