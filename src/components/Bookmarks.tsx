import { CircularProgress, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import { useGetAllBookmarksForUserQuery } from "../store";
import IBookmark from "../utils/interfaces/IBookmark.interface";
import AddBookmark from "./AddBookmark";
import BookmarkCard from "./BookmarkCard";
import { CurrentBookmarkSetContext } from "./Collections";


export default function Bookmarks() {
    const { user } = useUserData()
    const userId = user ? user?.id : ""

    const { data: allMyBookmarks, isLoading, isFetching } = useGetAllBookmarksForUserQuery(userId)

    const [currentBookmarks, currentBookmarksSet] = useState<IBookmark[] | any[]>([]);
    const { currentCollectionId, displayAllBookmarks } = useContext(CurrentBookmarkSetContext)
    const [tags, tagsSet] = useState<Set<string>>(new Set())

    useEffect(() => {
        if (allMyBookmarks) {
            allMyBookmarks.map(bookmark => {
                tagsSet(prevState => {
                    const newTagsSet = new Set(prevState);
                    bookmark.tags.forEach(value => newTagsSet.add(value));
                    return newTagsSet;
                });
            })
            currentBookmarksSet(allMyBookmarks.filter(bookmark => {
                return bookmark.collectionId === currentCollectionId
            }))
        } else {
            currentBookmarksSet([])
        }
    }, [currentCollectionId, allMyBookmarks])

    return (
        <div className="md:mt-0 mt-20 ">
            <AddBookmark tags={tags} userId={userId} />
            {(isLoading || isFetching) && <div className="items-center flex justify-center w-full"><CircularProgress /></div>}
            {(allMyBookmarks === null || allMyBookmarks === undefined || allMyBookmarks.length === 0) && (!isFetching) && (!isLoading) && <div className="justify-center flex items-center"><h1>No bookmarks found</h1></div>}
            {(!displayAllBookmarks && currentBookmarks.length === 0 && !isFetching && !isLoading) && <div className="justify-center flex items-center"><h1>No bookmarks found</h1></div>}
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                columnGap={1}
                rowGap={4}
                sx={{ marginBottom: "2rem" }}
            >{
                    !displayAllBookmarks ? (currentBookmarks && currentBookmarks.map((bookmark) => {
                        return <BookmarkCard bookmarkId={bookmark.bookmarkId} bookmarkURL={bookmark.bookmarkURL} collectionId={bookmark.collectionId} isFavorite={bookmark.isFavorite} tags={bookmark.tags} key={bookmark.bookmarkId} />
                    })) : (allMyBookmarks && allMyBookmarks.map((bookmark) => {
                        return <BookmarkCard bookmarkId={bookmark.bookmarkId} bookmarkURL={bookmark.bookmarkURL} collectionId={bookmark.collectionId} isFavorite={bookmark.isFavorite} tags={bookmark.tags} key={bookmark.bookmarkId} />
                    }))
                }

            </Grid>
        </div>
    )
}
