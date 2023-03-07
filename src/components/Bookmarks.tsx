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
    const { currentCollectionId, currentCollectionIdSet } = useContext(CurrentBookmarkSetContext)

    useEffect(() => {
        console.log(`Hello, I am from bookmarks and currentCollectionId has been uipdated!`)
        console.log(currentCollectionId)
        if (allMyBookmarks) {
            currentBookmarksSet(allMyBookmarks.filter(bookmark => {
                return bookmark.collectionId === currentCollectionId
            }))
        } else {
            currentBookmarksSet([])
        }

    }, [currentCollectionId])


    return (
        <div className="md:mt-10 mt-20">
            {isLoading && <div className="items-center flex justify-center"><CircularProgress /></div>}
            {allMyBookmarks === undefined || allMyBookmarks?.length === 0 && <h1 className="text-center">No bookmarks found!</h1>}
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                columnGap={1}
                rowGap={4}
            >{
                    currentBookmarks.length === 0 ? allMyBookmarks && allMyBookmarks.map((bookmark) => {
                        return <BookmarkCard bookmarkId={bookmark.bookmarkId} bookmarkURL={bookmark.bookmarkURL} collectionId={bookmark.collectionId} isFavorite={bookmark.isFavorite} tags={bookmark.tags} key={bookmark.bookmarkId} />
                    }) : currentBookmarks && currentBookmarks.map((bookmark) => {
                        return <BookmarkCard bookmarkId={bookmark.bookmarkId} bookmarkURL={bookmark.bookmarkURL} collectionId={bookmark.collectionId} isFavorite={bookmark.isFavorite} tags={bookmark.tags} key={bookmark.bookmarkId} />
                    })
                }
            </Grid>
        </div>
    )
}
