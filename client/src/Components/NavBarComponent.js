import React, { useState } from 'react'
import '../Styles/NavBarStyle.css'

function NavBarComponent() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="Navbar">
                <div className={`nav-items ${isOpen && "open"}`}>
                    <a href="/">Home</a>
                    <a href="/admin">Admin</a>
                </div>
                <div
                    className={`nav-toggle ${isOpen && "open"}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="bar"></div>
                </div>
            </div>
        </>
    )
}

export default NavBarComponent