import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/get-user';
import { useGetCollectionsByUserQuery } from '../store';

export default function Home() {
    const { error, user } = useUserData()
    const navigate = useNavigate()
    const userId = user ? user?.id : ""

    const { data } = useGetCollectionsByUserQuery(userId)

    useEffect(() => {
        if (error?.status === 401) {
            navigate("/")
        }
    }, [error, user,])

    return (
        <div>Home</div>
    )
}
