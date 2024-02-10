import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <article className='border-2 grid md:grid-cols-2 rounded-3xl p-5 gap-6 md:items-center  rounded-bl-none rounded-tr-none'>
        <section className='space-y-4'>
            <h3 className='text-2xl text-center font-semibold'>Want to lern HTML, CSS and Javascipt by builidng fun and real world projects?</h3>
            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque accusantium ad eum quae architecto reprehenderit praesentium vero magni odio sed a impedit minus dolorem eius rerum saepe aspernatur, debitis maiores.</p>
            
            <Button className='w-full font-semibold' gradientDuoTone='purpleToPink'>
                100 JS, CSS, React Projects
            </Button>

        </section>


        <section>
            <img className='w-full h-full object-cover'  src="../../public/img/ad.jpg" alt="add img" />
        </section>
    </article>
  )
}

export default CallToAction