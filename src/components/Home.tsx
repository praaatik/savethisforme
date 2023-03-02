import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/get-user';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
    const { error, user } = useUserData()
    const navigate = useNavigate()

    useEffect(() => {
        if (error?.status === 401) {
            navigate("/")
        }
    }, [error, user])

    return (
        <div>Home</div>
    )
}
