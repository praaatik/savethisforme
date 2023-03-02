import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/get-user';
import { useGetCollectionsByUserQuery, useUpdateCollectionNameMutation } from '../store';

export default function Home() {
    const { error, user } = useUserData()
    const navigate = useNavigate()
    const userId = user ? user?.id : ""

    const { data } = useGetCollectionsByUserQuery(userId)
    const [updateCollection, result] = useUpdateCollectionNameMutation()

    useEffect(() => {
        if (error?.status === 401) {
            navigate("/")
        }
    }, [error, user,])

    const handleOnClick = () => {
        updateCollection({ collectionId: 45, updatedCollectionName: "kitty collection only" })
    }


    return (
        <div>
            <div>Home</div>
            <button onClick={handleOnClick}>Update!</button>
        </div>
    )
}
