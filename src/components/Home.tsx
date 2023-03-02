import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/get-user';
import { useGetCollectionsByUserQuery, useUpdateCollectionNameMutation, useDeleteCollectionMutation, useCreateCollectionMutation } from '../store';

export default function Home() {
    const { error, user } = useUserData()
    const navigate = useNavigate()
    const userId = user ? user?.id : ""

    const { data } = useGetCollectionsByUserQuery(userId)
    // const [updateCollection, result] = useUpdateCollectionNameMutation()
    const [deleteCollection, result] = useDeleteCollectionMutation()
    const [createCollection, result_2] = useCreateCollectionMutation()

    useEffect(() => {
        if (error?.status === 401) {
            navigate("/")
        }
    }, [error, user,])

    const handleOnDelete = () => {
        deleteCollection(65)
    }

    const handleOnAdd = () => {
        createCollection({ collectionName: "kitty collection new", userId })
    }


    return (
        <div>
            <div>Home</div>
            <button onClick={handleOnDelete}>Delete!</button>
            <button onClick={handleOnAdd}>Add new collection!</button>
        </div>
    )
}
