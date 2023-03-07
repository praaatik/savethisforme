import { CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import useUserData from "../hooks/get-user";
import { useGetAllBookmarksForUserQuery } from "../store";
import IBookmark from "../utils/interfaces/IBookmark.interface";
import BookmarkCard from "./BookmarkCard";
import { CurrentBookmarkSetContext } from "./Collections";


export default function Bookmarks() {
    const { user } = useUserData()
    const userId = user ? user?.id : ""

    const { data: allMyBookmarks, isLoading } = useGetAllBookmarksForUserQuery(userId)
    const [currentBookmarks, currentBookmarksSet] = useState<IBookmark[] | any[]>([]);
    const { currentCollectionId, displayAllBookmarks } = useContext(CurrentBookmarkSetContext)

    const showAllBookmarks = false

    useEffect(() => {
        if (allMyBookmarks) {
            currentBookmarksSet(allMyBookmarks.filter(bookmark => {
                return bookmark.collectionId === currentCollectionId
            }))
        } else {
            currentBookmarksSet([])
        }

    }, [currentCollectionId, allMyBookmarks])

    return (
        <div className="md:mt-10 mt-20">
            {isLoading && <div className="items-center flex justify-center w-full"><CircularProgress /></div>}
            {(allMyBookmarks === null || allMyBookmarks === undefined || allMyBookmarks.length === 0) && (!isLoading) && <h1>No bookmarks found</h1>}
            {(!displayAllBookmarks && currentBookmarks.length === 0) && <h1>No bookmarks found!</h1>}
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                columnGap={1}
                rowGap={4}
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
