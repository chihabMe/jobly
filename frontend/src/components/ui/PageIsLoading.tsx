import React from 'react';
import {SyncLoader} from 'react-spinners';

const PageIsLoading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <SyncLoader size={10} color="#2563EB" />
    </div>
  )
}

export default PageIsLoading