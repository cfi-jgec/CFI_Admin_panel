

import React from 'react'
import { Spinner, Button } from 'flowbite-react'

const Loader = () => {
    return (
        <div className='w-full  h-screen fixed top-0 left-0 flex justify-center items-center bg-black/60  z-[999] !m-0'>
            <Button color="gray">
                <Spinner aria-label="Alternate spinner button example" size="md" />
                <span className="pl-3">Loading...</span>
            </Button>
        </div>
    )
}

export default Loader
