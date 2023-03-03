import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/get-user';
import { useDeleteBookmarkMutation, useGetBookmarksByCollectionQuery } from '../store';

export default function Home() {
    const { error, user } = useUserData()
    const navigate = useNavigate()
    const userId = user ? user?.id : ""

    // const { data } = useGetAllBookmarksByUserQuery()
    // const { data } = useGetBookmarksByCollectionQuery(userId)
    const [deleteBookmark, result] = useDeleteBookmarkMutation()

    useEffect(() => {
        if (error?.status === 401) {
            navigate("/")
        }
        // console.log(data)

    }, [error, user])

    const handleOnDelete = () => {
        // deleteCollection(65)
        deleteBookmark(1)
    }

    const handleOnAdd = () => {
        // createCollection({ collectionName: "kitty collection newww", userId })
    }


    return (
        <div>
            <div>Home</div>
            <button onClick={handleOnDelete}>Delete!</button>
            <button onClick={handleOnAdd}>Add new collection!</button>
        </div>
    )
}
