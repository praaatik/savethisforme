import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/get-user';
import { useToggleFavoriteBookmarkMutation, useGetAllBookmarksForUserQuery, useCreateBookmarkMutation, useUpdateBookmarkTagsMutation } from '../store';
import Collections from './Collections';

export default function Home() {
    const { error, user } = useUserData()
    const navigate = useNavigate()

    useEffect(() => {
        if (error?.status === 401) {
            navigate("/")
        }
    }, [error, user])

    return (
        <div className="">
            <Collections />
        </div>
    )
}
