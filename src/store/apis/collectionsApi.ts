import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import ICollection from "../../utils/interfaces/ICollection.interface";
import IInsertCollection from "../../utils/interfaces/IInsertCollection.interface";
import IUpdateCollectionName from "../../utils/interfaces/IUpdateCollectionName.interface";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

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
      deleteCollection: builder.mutation<ICollection | PostgrestError, number>({
        invalidatesTags: ["collection"],
        async queryFn(arg) {
          const { error, data } = await supabase
            .from("collection")
            .delete()
            .eq("collectionId", arg)
            .select();
          if (data) {
            const deletedCollection: ICollection = data[0] as ICollection;
            return { data: deletedCollection };
          } else {
            return { error };
          }
        },
      }),
      createCollection: builder.mutation<
        ICollection | PostgrestError,
        IInsertCollection
      >({
        invalidatesTags: ["collection"],
        async queryFn(arg) {
          const { error, data } = await supabase
            .from("collection")
            .insert({ collectionName: arg.collectionName, userId: arg.userId });
          if (data) {
            const newCollection = data[0] as ICollection;
            return { data: newCollection };
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
  useDeleteCollectionMutation,
  useCreateCollectionMutation,
} = collectionsApi;
export { collectionsApi };
