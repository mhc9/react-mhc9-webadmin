import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <div>
            <Navbar />

            <main><Outlet /></main>

            <Footer />
        </div>
    )
}

export default DefaultLayout