import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/get-user';
import { useToggleFavoriteBookmarkMutation, useGetAllBookmarksForUserQuery, useCreateBookmarkMutation, useUpdateBookmarkTagsMutation } from '../store';

export default function Home() {
    const { error, user } = useUserData()
    const navigate = useNavigate()
    const userId = user ? user?.id : ""

    const { } = useGetAllBookmarksForUserQuery(userId)
    // const { data } = useGetBookmarksByCollectionQuery(userId)
    const [toggleBookmarkFavorite, result] = useToggleFavoriteBookmarkMutation()
    const [createBookmark, result_2] = useCreateBookmarkMutation()
    const [updateBookmark, result_3] = useUpdateBookmarkTagsMutation()

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
        toggleBookmarkFavorite({ bookmarkId: "6", isFavorite: false })
    }

    const handleOnAdd = () => {
        // createCollection({ collectionName: "kitty collection newww", userId })
        createBookmark({ bookmarkURL: "https://temp2.com", collectionId: 45, isFavorite: true, tags: [], userId: "21b56bf5-afe6-4bab-b036-359b1a163bcb" })
    }

    const handleOnUpdateURL = () => {
        updateBookmark({ bookmarkURL: "https://www.test_url.com", bookmarkId: 6 })
    }
    const handleOnUpdateTags = () => {
        updateBookmark({ tags: ["one", "two", "four"], bookmarkId: 6 })
    }

    const handleUpdateBoth = () => {
        updateBookmark({ tags: ["one", "two", "three"], bookmarkURL: "https://www.test_url_both.com", bookmarkId: 14 })
    }

    return (
        <div>
            <div>Home</div>
            <button onClick={handleOnDelete}>Delete!</button>
            <button onClick={handleOnAdd}>Add new bookmark!</button>
            <button onClick={handleOnUpdateURL}>Update bookmark URL</button>
            <button onClick={handleOnUpdateTags}>Update bookmark tags</button>
            <button onClick={handleUpdateBoth}>Update both</button>
            <button onClick={handleToggle}>Toggle!</button>

        </div>
    )
}
