import React, { ReactNode } from 'react'

const Container: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='mx-auto max-w-screen-lg  '>
            {children}
        </div>
    )
}

export default Container