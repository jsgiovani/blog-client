import React, { useEffect, useState } from 'react'
import axiosConnection from '../../config/axios'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";


const DashComments = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { isAdmin, _id } = currentUser;


  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [modal, setModal] = useState(false);

//fetch first 9 posts
  const fetchComments = async ()=>{

    try {
      setLoading(true)
      const {data} = await axiosConnection.get(`api/comments`, {
        headers:{
            'authorization': `Bearer ${currentUser.token}`,
        },
      });

      if (!data.success) {
        setError(data.message)
        setLoading(false);
      }

      if (data.data.length<9) {
        setShowMore(false);
      }

      setComments(data.data.comments);
      setLoading(false);

      
    } catch (error) {
        console.log(error);
      setError(error.respose.data.message)
      setLoading(false)
    }
  }


  useEffect(() => {
    if (currentUser.isAdmin) {
        fetchComments();
    }
  }, [])


  //fetch more posts
  const fetchMore = async ()=>{
    try {
        setLoading(true)
        const {data} = await axiosConnection.get(`api/comments?&startIndex=${comments.length}`);

  
        if (!data.success) {
          setError(data.message)
          setLoading(false);
          return;
        }

        
  
        if (data.data.users.length<9) {
          setShowMore(false);
        }

  
        setComments([...comments, ...data.data.users]);
        setLoading(false);
  
        
      } catch (error) {
        setError(error.respose.data.message)
        setLoading(false)
      }
  }


  const deleteItem = async(itemId)=>{
    setModal(false);

    try {

        const { data } = await axiosConnection.delete(`/api/comments/${itemId}/${_id}`, {
            headers:{
                'authorization': `Bearer ${currentUser.token}`,
            },
        });

        if (!data.success) { 
            setError(data.message);
        }


        setComments((comments) => comments.filter((comment) => comment._id !==itemId));
        
    } catch (error) {
        setError(error.response.data.message);
    }
  }


  return (
    <main className='max-w-7xl mx-auto p-5 table-auto overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && !loading && comments.length>0 && (
            <>
                <Table
                    hoverable
                    className='shadow-sm'
                >
                    <Table.Head>
                        <Table.HeadCell>Date Updated</Table.HeadCell>
                        <Table.HeadCell>Content</Table.HeadCell>
                        <Table.HeadCell>Number of Likes</Table.HeadCell>
                        <Table.HeadCell>PostId</Table.HeadCell>
                        <Table.HeadCell>UserId</Table.HeadCell>
                        <Table.HeadCell>
                            <span>Delete</span>
                        </Table.HeadCell>

                    </Table.Head>

                   <Table.Body className='divide-y'>
                        {comments.map((comment => {

                            const { _id, updatedAt, content, postId, userId, numberLikes } = comment;
                            return(
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={_id}>
                                    <Table.Cell>{new Date(updatedAt).toDateString()}</Table.Cell>

        
                                    <Table.Cell className='font-semibold text-gray-900 dark:text-white'>{content}</Table.Cell>
                                    <Table.Cell className='dark:text-white'>{numberLikes}</Table.Cell>
                                    <Table.Cell className='dark:text-white'>{postId}</Table.Cell>
                                    <Table.Cell className='dark:text-white'>{userId}</Table.Cell>
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
                                                    Are you sure you want to delete this comment?
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

export default DashComments