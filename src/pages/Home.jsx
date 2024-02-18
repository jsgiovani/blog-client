import React from 'react'
import CallToAction from '../components/CallToAction'

const Home = () => {
  return (
    <div className='min-h-screen max-w-7xl md:mx-auto'>
      <div className='flex flex-col items-center justify-center h-screen space-y-14 p-4'>
        <h1 className='text-3xl font-bold lg:text-6xl  '>Welcome to my blog</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, harum libero repudiandae impedit aliquam veritatis laborum minima? Ex debitis accusamus, fugiat commodi hic reprehenderit suscipit voluptatem voluptatibus laboriosam et vitae?</p>
        <CallToAction/>
      </div>
    </div>
  )
}

export default Home