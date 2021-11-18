import React from 'react'
import Auth from '../auth/Auth'
import Footer from './footer/Footer'
import MenuBar from './header/MenuBar'
import MobileMenu from './header/MobileMenu'
import NavBar from './header/NavBar'
import TopBar from './header/TopBar'
import ScrollToTop from './ScrollToTop'
import StickyFooter from './StickyFooter'

export default function Layout({ children }) {
    return (
        <>
            <header className="header">
                <TopBar />
                <MenuBar />
                <NavBar />
            </header>

            {children}
            <Footer />

            <StickyFooter />
            <ScrollToTop />
            <MobileMenu />


        </>
    )
}
