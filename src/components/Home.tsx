import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/get-user';
import { useGetCollectionsByUserQuery, useUpdateCollectionNameMutation, useDeleteCollectionMutation } from '../store';

export default function Home() {
    const { error, user } = useUserData()
    const navigate = useNavigate()
    const userId = user ? user?.id : ""

    const { data } = useGetCollectionsByUserQuery(userId)
    // const [updateCollection, result] = useUpdateCollectionNameMutation()
    const [deleteCollection, result] = useDeleteCollectionMutation()

    useEffect(() => {
        if (error?.status === 401) {
            navigate("/")
        }
    }, [error, user,])

    const handleOnClick = () => {
        // updateCollection({ collectionId: 45, updatedCollectionName: "kitty collection only" })
        deleteCollection(44)
    }


    return (
        <div>
            <div>Home</div>
            <button onClick={handleOnClick}>Delete!</button>
        </div>
    )
}
