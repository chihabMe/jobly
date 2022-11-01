import React from 'react';
import { PuffLoader   } from 'react-spinners';

const PageIsLoading = ({ size ,color}: { size?: number ,color?:string}) => {
    const spinnerSize = size || 25;
    return (
        <div className='w-full  h-full flex items-center justify-center'>
            <span className=''>
                <PuffLoader   size={spinnerSize} color={color||"#2563EB"} />
            </span>
        </div>
    )
}

export default PageIsLoading