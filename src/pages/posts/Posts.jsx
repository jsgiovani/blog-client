import React, { useEffect, useState } from 'react'
import axiosConnection from '../../config/axios'
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';


const Posts = () => {
    const { currentUser } = useSelector((state) => state.user);



  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [modal, setModal] = useState(false);

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


  const deleteItem = async(itemId)=>{
    setModal(false);
    try {
        setLoading(true);

        const { data } = await axiosConnection.delete(`/api/posts/${itemId}/${currentUser._id}`, {
            headers:{
                'authorization': `Bearer ${currentUser.token}`,
            },
        });

        if (!data.success) {
            setError(data.message);
            setLoading(false)
        }

        
       fetchPosts();
        
    } catch (error) {
        console.log(error);
        // setError(error.response.data.message);
        setLoading(false);
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

                                        <button className='font-medium text-red-500 hover:underline cursor-pointer' onClick={()=>setModal(true)}>Delete</button>
                                        <Modal
                                            show = {modal}
                                            onClose={()=>setModal(false)}
                                            popup
                                            size={'md'}
                                        >
                                            <Modal.Header />
                                            <Modal.Body>
                                                <div className="text-center">
                                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                    Are you sure you want to delete this post?
                                                </h3>
                                                <div className="flex justify-center gap-4">
                                                    <Button color="failure" onClick={() => deleteItem(_id)}>
                                                    {"Yes, I'm sure"}
                                                    </Button>
                                                    <Button color="gray" onClick={() => setModal(false)}>
                                                    No, cancel
                                                    </Button>
                                                </div>
                                                </div>
                                            </Modal.Body>

                                        </Modal>

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