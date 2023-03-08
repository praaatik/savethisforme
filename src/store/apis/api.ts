import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import IBookmark from "../../utils/interfaces/IBookmark.interface";
import ICollection from "../../utils/interfaces/ICollection.interface";
import IInsertBookmark from "../../utils/interfaces/IInsertBookmark.interface";
import IInsertCollection from "../../utils/interfaces/IInsertCollection.interface";
import IToggleBookmark from "../../utils/interfaces/IToggleBookmark.interface";
import IUpdateBookmark from "../../utils/interfaces/IUpdateBookmark.interface";
import IUpdateCollectionName from "../../utils/interfaces/IUpdateCollectionName.interface";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

interface IGetBookmarksByCollectionResponse {
  collectionName: string;
  bookmark: IBookmark[];
}

const api = createApi({
  reducerPath: "data",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["collection", "bookmark"],
  endpoints(builder) {
    return {
      getCollections: builder.query<ICollection[] | PostgrestError, void>({
        providesTags: ["collection"],
        async queryFn(arg) {
          const { data, error } = await supabase.from("collection").select();

          if (data) {
            const collections: ICollection[] = data as ICollection[];
            return { data: collections };
          } else {
            return { error };
          }
        },
      }),
      getCollectionsByUser: builder.query<ICollection[], string>({
        providesTags: ["collection"],
        async queryFn(arg) {
          const { data, error } = await supabase
            .from("collection")
            .select("*")
            .eq("userId", arg);
          const collections: ICollection[] = data as ICollection[];
          return { data: collections };
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
        invalidatesTags: ["collection", "bookmark"],
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
      getAllBookmarksForUser: builder.query<IBookmark[], string>({
        providesTags: ["bookmark"],
        async queryFn(arg) {
          const { data, error } = await supabase
            .from("bookmark")
            .select("*")
            .eq("userId", arg)
            .order("bookmarkId", { ascending: false });
          const bookmarks: IBookmark[] = data as IBookmark[];
          return { data: bookmarks };
        },
      }),
      getBookmarksByCollection: builder.query<
        IGetBookmarksByCollectionResponse | null,
        number
      >({
        providesTags: ["bookmark", "collection"],
        async queryFn(arg) {
          const { data, error } = await supabase
            .from("collection")
            .select(
              `
          collectionName,
          bookmark(
            bookmarkId,
            bookmarkURL,
            isFavorite,
            tags,
            collectionId
          )
          `
            )
            .eq("collectionId", arg);
          if (data) {
            const response: IGetBookmarksByCollectionResponse =
              data[0] as IGetBookmarksByCollectionResponse;

            return { data: response };
          } else {
            return { data: null };
          }
        },
      }),

      deleteBookmark: builder.mutation<IBookmark | PostgrestError, number>({
        invalidatesTags: ["bookmark"],
        async queryFn(arg) {
          const { error, data } = await supabase
            .from("bookmark")
            .delete()
            .eq("bookmarkId", arg)
            .select();
          if (data) {
            const deletedBookmark: IBookmark = data[0] as IBookmark;
            return { data: deletedBookmark };
          } else {
            return { error };
          }
        },
      }),
      toggleFavoriteBookmark: builder.mutation<boolean, IToggleBookmark>({
        invalidatesTags: ["bookmark"],
        async queryFn(arg) {
          const { data, error } = await supabase
            .from("bookmark")
            .update({ isFavorite: !arg.isFavorite })
            .eq("bookmarkId", arg.bookmarkId)
            .order("bookmarkId", { ascending: false })
            .select();

          return { data: true };
        },
      }),
      createBookmark: builder.mutation<
        IBookmark | PostgrestError,
        IInsertBookmark
      >({
        invalidatesTags: ["bookmark", "collection"],
        async queryFn(arg) {
          const { data, error } = await supabase
            .from("bookmark")
            .insert({
              bookmarkURL: arg.bookmarkURL,
              userId: arg.userId,
              collectionId: arg.collectionId,
              isFavorite: arg.isFavorite,
              tags: arg.tags,
            })
            .select();
          if (data) {
            const newBookmark: IBookmark = data[0] as IBookmark;
            return { data: newBookmark };
          } else {
            return { error };
          }
        },
      }),
      updateBookmarkTags: builder.mutation<null, IUpdateBookmark>({
        async queryFn(arg) {
          if (arg.tags) {
            await supabase
              .from("bookmark")
              .update({ tags: arg.tags })
              .eq("bookmarkId", arg.bookmarkId);
          }
          if (arg.bookmarkURL) {
            await supabase
              .from("bookmark")
              .update({ bookmarkURL: arg.bookmarkURL })
              .eq("bookmarkId", arg.bookmarkId);
          }
          return { data: null };
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
  // useGetBookmarksQuery,
  useGetAllBookmarksForUserQuery,
  useGetBookmarksByCollectionQuery,
  useDeleteBookmarkMutation,
  useToggleFavoriteBookmarkMutation,
  useCreateBookmarkMutation,
  useUpdateBookmarkTagsMutation,
} = api;
export { api };
