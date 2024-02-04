import React, { useEffect, useState } from 'react'
import axiosConnection from '../../config/axios'
import { useSelector } from 'react-redux';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';


const Posts = () => {
    const { currentUser } = useSelector((state) => state.user);



  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(true);

//fetch first 9 posts
  const fetchPosts = async ()=>{

    try {
      setLoading(true)
      const {data} = await axiosConnection.get(`api/posts?userId=${currentUser._id}`);

      if (!data.success) {
        setError(data.message)
        setLoading(false);
      }

      if (data.data.length<9) {
        setShowMore(false);
      }

      setPosts(data.data.posts);
      setLoading(false);

      
    } catch (error) {
      console.log(error);
      setError(error.respose.data.message)
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchPosts();
  }, [])


  //fetch more posts
  const fetchMore = async ()=>{
    try {
        setLoading(true)
        const {data} = await axiosConnection.get(`api/posts?userId=${currentUser._id}&startIndex=${posts.length}`);
  
        if (!data.success) {
          setError(data.message)
          setLoading(false);
        }
  
        if (data.data.posts.length<9) {
          setShowMore(false);
        }

  
        setPosts([...posts, ...data.data.posts]);
        setLoading(false);
  
        
      } catch (error) {
        setError(error.respose.data.message)
        setLoading(false)
      }
  }


  return (
    <main className='max-w-7xl mx-auto p-5 table-auto overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && !loading && posts.length>0 && (
            <>
                <Table
                    hoverable
                    className='shadow-sm'
                >
                    <Table.Head>
                        <Table.HeadCell>Last Update</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>
                            <span>Delete</span>
                        </Table.HeadCell>

                        <Table.HeadCell>
                            <span>Update</span>
                        </Table.HeadCell>
                    </Table.Head>

                   <Table.Body className='divide-y'>
                        {posts.map((post => {
                            const { _id, updatedAt, image, title, category, slug } = post;
                            return(
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={_id}>
                                    <Table.Cell>{new Date(updatedAt).toDateString()}</Table.Cell>

                                    <Table.Cell>
                                        <Link to={`/posts/${slug}`}>
                                            <img className='w-20 h-10 object-contain' src={image} alt="img" />
                                        </Link>
                                    </Table.Cell>

                                    <Table.Cell className='font-semibold text-gray-900 dark:text-white'>{title}</Table.Cell>
                                    <Table.Cell>{category}</Table.Cell>
                                    <Table.Cell>
                                        <button className='font-medium text-red-500 hover:underline cursor-pointer'>
                                            Delete
                                        </button>

                                    </Table.Cell>

                                    <Table.Cell className=''>
                                        <Link to={`/posts/${slug}/update`}>Update</Link>
                                    </Table.Cell>

                                </Table.Row>

                            );
                        }))}
                   </Table.Body>

                </Table>

                {showMore && (
                    <button 
                        className='self-center w-full text-sm py-2 text-teal-500'
                        onClick={fetchMore}
                    >
                        Show more
                    </button>
                  
                )}


            </>
        )}
    </main>
  )
}

export default Posts