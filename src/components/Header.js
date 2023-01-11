import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ url, title }) => {
    return (
        <>
            <header className="bar bar_blue">
                <Link to={url} className="bar_action_back">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </Link>
                <h1 className="bar_title">{title}</h1>
            </header>
        </>
    )
}

export default Header
