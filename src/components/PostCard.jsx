import React from 'react'
import { Link } from 'react-router-dom';

const Post = ({post}) => {
    const {image, title, slug} = post;
  return (
    <li className='rounded-md overflow-hidden border-2'>
        <Link className='' to={`/posts/${slug}`}>
            <img className='w-full md:h-[150px] object-fill' src={image} alt={`${title} image`} />

            <div className='p-4'>
                <h3 className='font-semibold'>{title}</h3>
            </div>
        </Link>

    </li>
  )
}

export default Post