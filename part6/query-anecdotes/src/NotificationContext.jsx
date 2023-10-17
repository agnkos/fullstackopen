import { createContext, useReducer } from "react";
import React from 'react'
import PropTypes from 'prop-types'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return `Anecdote '${action.payload}' was added.`
        case 'VOTE':
            return `Anecdote '${action.payload}' voted.`
        case 'NULL':
            return null
        case 'ERROR':
            return 'Too short anecdote, must have length 5 or more'
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {

    const [notification, notificationDispatch] = useReducer(notificationReducer)

    return (
        <NotificationContext.Provider value={{ notification, notificationDispatch }}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext

NotificationContextProvider.propTypes = {
    children: PropTypes.object
}