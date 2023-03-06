import { Card, CardContent, IconButton, Link, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import A from "../assets/alphabets/A.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    bookmarkURL: string
}

export default function BookmarkCard({ bookmarkURL }: Props) {


    return (
        <Card variant="outlined">
            <CardContent className="flex justify-between gap-4">
                <div className=" flex flex-col justify-around items-center">
                    <Link href={bookmarkURL} underline="hover" className="" >{bookmarkURL}</Link>
                    <div className="flex w-full justify-evenly ">
                        <IconButton>
                            <FavoriteBorderIcon className="cursor-pointer" />
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
        </Card>
    )
}
