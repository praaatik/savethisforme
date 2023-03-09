import { Card, CardContent, Chip, Grid, IconButton, Link, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import A from "../assets/alphabets/A.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IBookmark from '../utils/interfaces/IBookmark.interface';
import { useDeleteBookmarkMutation, useToggleFavoriteBookmarkMutation } from '../store';

export default function BookmarkCard({ bookmarkURL, isFavorite, bookmarkId, tags }: IBookmark) {
    const [toggleFavorite, _] = useToggleFavoriteBookmarkMutation()
    const [deleteBookmark, result] = useDeleteBookmarkMutation()

    const handleOnToggleFavorite = () => {
        toggleFavorite({ bookmarkId: bookmarkId.toString(), isFavorite })
    }

    const handleOnDelete = () => {
        deleteBookmark(bookmarkId)
    }

    return (
        <Card variant="outlined" sx={{ width: { xs: "18em", md: "30em" }, overflowX: "scroll" }}>
            <CardContent className="flex justify-between gap-4">
                <div className=" flex flex-col justify-center items-center text-center w-full ">
                    <div className="mb-4 sm:text-xl text-sm w-full">
                        <Link href={bookmarkURL} underline="hover" >{bookmarkURL}</Link>
                    </div>
                    {
                        tags.length > 0 && <Grid
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            spacing={0.5}
                            rowGap={1}
                        >
                            {
                                tags.map((tag, index) => {
                                    return <Chip label={`${tag}`} size="small" key={index} />

                                })
                            }
                        </Grid>
                    }

                    <div className="flex w-full justify-evenly">
                        <IconButton onClick={handleOnToggleFavorite}>
                            {isFavorite ? <FavoriteIcon className="cursor-pointer" color='error' /> : <FavoriteBorderIcon className="cursor-pointer" />}
                        </IconButton>

                        <IconButton>
                            <EditIcon className="cursor-pointer" />
                        </IconButton>

                        <IconButton onClick={handleOnDelete}>
                            <DeleteIcon className="cursor-pointer" />
                        </IconButton>
                    </div>
                </div>
                <img src={A} alt="alphabet" height="100px" width="100px" loading='lazy' className="border-l-2 border-black" />
            </CardContent>
        </Card >
    )
}
