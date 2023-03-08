import { Card, CardContent, Chip, Grid, IconButton, Link, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import A from "../assets/alphabets/A.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IBookmark from '../utils/interfaces/IBookmark.interface';
import { useToggleFavoriteBookmarkMutation } from '../store';

export default function BookmarkCard({ bookmarkURL, isFavorite, bookmarkId, tags }: IBookmark) {
    const [toggleFavorite, _] = useToggleFavoriteBookmarkMutation()

    const handleOnToggleFavorite = () => {
        toggleFavorite({ bookmarkId: bookmarkId.toString(), isFavorite })

    }
    return (
        <Card variant="outlined" sx={{ width: "30rem", height: "10rem" }}>
            <CardContent className="flex justify-between gap-4">
                <div className=" flex flex-col justify-around items-center">
                    <div className="mb-4 sm:text-2xl text-xl">
                        <Link href={bookmarkURL} underline="hover" >{bookmarkURL}</Link>
                    </div>
                    {
                        tags.length > 0 && <Grid
                            container
                            xs
                            zeroMinWidth
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            spacing={0.5}
                            rowGap={1}
                        >
                            {
                                tags.map(tag => {
                                    return <Chip label={`${tag}`} size="small" />

                                })
                            }
                        </Grid>
                    }

                    <div className="flex w-full justify-evenly ">
                        <IconButton onClick={handleOnToggleFavorite}>
                            {isFavorite ? <FavoriteIcon className="cursor-pointer" /> : <FavoriteBorderIcon className="cursor-pointer" />}
                        </IconButton>

                        <IconButton>
                            <EditIcon className="cursor-pointer" />
                        </IconButton>

                        <IconButton>
                            <DeleteIcon className="cursor-pointer" />
                        </IconButton>
                    </div>
                </div>
                <img src={A} alt="alphabet" height="100px" width="100px" loading='lazy' className="border-l-2 border-black" />
            </CardContent>
        </Card >
    )
}
