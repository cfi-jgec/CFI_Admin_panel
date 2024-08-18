"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { Store } from './Store'

type props = {
    children: React.ReactNode
}

const ReduxProvider: React.FC<props> = ({ children }) => {
    return (
        <Provider store={Store} >
            {children}
        </Provider>
    )
}

export default ReduxProvider