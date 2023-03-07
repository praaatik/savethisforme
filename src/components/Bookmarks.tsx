import { Button, Card, CardActions, CardContent, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import useUserData from "../hooks/get-user";
import { useGetAllBookmarksForUserQuery } from "../store";
import BookmarkCard from "./BookmarkCard";


export default function Bookmarks() {
    const { user } = useUserData()
    const userId = user ? user?.id : ""

    const { data: allMyBookmarks, isLoading } = useGetAllBookmarksForUserQuery(userId)

    const card = (bookmarkURL: string) => (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Bookmark
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {bookmarkURL}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (
        <div className="md:mt-10 mt-20">
            {isLoading && <div className="items-center flex justify-center"><CircularProgress /></div>}
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                columnGap={1}
                rowGap={4}
            >
                {allMyBookmarks && allMyBookmarks.map((bookmark) => {
                    return <BookmarkCard bookmarkId={bookmark.bookmarkId} bookmarkURL={bookmark.bookmarkURL} collectionId={bookmark.collectionId} isFavorite={bookmark.isFavorite} tags={bookmark.tags} key={bookmark.bookmarkId} />
                })}
            </Grid>
        </div>
    )
}
