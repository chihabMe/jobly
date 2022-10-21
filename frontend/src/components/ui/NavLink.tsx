import React from 'react'
import Link from 'next/link'

const NavLink: React.FC<{ text: string, className?: string, href: string }> = ({ href, text, className }) => {
    return (
        <Link href={href}><span className={`${className}  `}>{text}</span></Link>
    )
}

export default NavLink;