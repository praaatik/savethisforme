import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/get-user';
import { useToggleFavoriteBookmarkMutation, useGetAllBookmarksForUserQuery } from '../store';

export default function Home() {
    const { error, user } = useUserData()
    const navigate = useNavigate()
    const userId = user ? user?.id : ""

    const { } = useGetAllBookmarksForUserQuery(userId)
    // const { data } = useGetBookmarksByCollectionQuery(userId)
    const [toggleBookmarkFavorite, result] = useToggleFavoriteBookmarkMutation()

    useEffect(() => {
        if (error?.status === 401) {
            navigate("/")
        }
        // console.log(data)

    }, [error, user])

    const handleOnDelete = () => {
        // deleteCollection(65)
        // toggleBookmarkFavorite({ bookmarkId: "2", isFavorite: false })
    }

    const handleToggle = () => {
        toggleBookmarkFavorite({ bookmarkId: "2", isFavorite: false })
    }

    const handleOnAdd = () => {
        // createCollection({ collectionName: "kitty collection newww", userId })
    }


    return (
        <div>
            <div>Home</div>
            <button onClick={handleOnDelete}>Delete!</button>
            <button onClick={handleOnAdd}>Add new collection!</button>
            <button onClick={handleToggle}>Toggle!</button>
        </div>
    )
}
