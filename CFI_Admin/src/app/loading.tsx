
import { Spinner } from 'flowbite-react'
import React from 'react' 

const Loader: React.FC = () => {
    return (
        <section className='w-full h-screen flex items-center justify-center'>
            <Spinner size="xl" color="purple" aria-label="Success spinner example" />
        </section>
    )
}

export default Loader
