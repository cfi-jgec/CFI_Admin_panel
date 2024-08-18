"use client"

import { useAppSelector } from '@/redux/Store'
import React from 'react'
import Loader from './Loader'

const Loading = () => {
    const { loading } = useAppSelector(state => state.admin)
    return (
        <>
            {
                loading && <Loader />
            }
        </>
    )
}

export default Loading
