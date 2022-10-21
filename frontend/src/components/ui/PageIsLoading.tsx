import React from 'react';
import { SyncLoader,CircleLoader } from 'react-spinners';

const PageIsLoading = ({ size }: { size?: number }) => {
    const spinnerSize = size || 10;
    return (
        <div className='w-full  h-full flex items-center justify-center'>
            <span className=''>
                <CircleLoader size={spinnerSize} color="#2563EB" />
            </span>
        </div>
    )
}

export default PageIsLoading