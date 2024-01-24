import React, { useState, useEffect } from 'react'
import server from '@/utils/server'
import axios from 'axios'
import { useCookies } from 'react-cookie';

export const useUserById = (id) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getUser() {
            try {
                const { data } = await axios.get(`${server}/api/user/${id}`)
                setUser(data.user)
                setLoading(false)
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }
        getUser()
    }, [id])

    return { user, loading, error }
}

export const useCommentOnPost = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [cookies] = useCookies(['x-auth-token']);

    const addComment = async (postId, comment) => {
        setLoading(true)
        try {
            const { data } = await axios.post(`${server}/api/post/comment/${postId}`, { comment },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': cookies['x-auth-token']
                    }
                })
            setLoading(false)
            return data
        } catch (err) {
            setError(err)
            setLoading(false)
        }
    }

    return { addComment, loading, error }
}

export const useAddLike = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [cookies] = useCookies(['x-auth-token']);

    const addLike = async (postId) => {
        setLoading(true)
        try {
            const { data } = await axios.put(`${server}/api/post/like/${postId}`, {},
                {
                    headers: {
                        'x-auth-token': cookies['x-auth-token']
                    }
                })
            setLoading(false)
            return data
        } catch (err) {
            setError(err)
            setLoading(false)
        }
    }

    return { addLike, loading, error }
}