import React, { useEffect, useState } from 'react'
import axiosConnection from '../../config/axios'
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";


const Users = () => {
    const { currentUser } = useSelector((state) => state.user);



  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [modal, setModal] = useState(false);

//fetch first 9 posts
  const fetchUsers = async ()=>{

    try {
      setLoading(true)
      const {data} = await axiosConnection.get(`api/users`, {
        headers:{
            'authorization': `Bearer ${currentUser.token}`,
        },
      });

      if (!data.success) {
        setError(data.message)
        setLoading(false);
      }

      if (data.data.users.length<9) {
        setShowMore(false);
      }

      setUsers(data.data.users);
      setLoading(false);

      
    } catch (error) {
      setError(error.respose.data.message)
      setLoading(false)
    }
  }


  useEffect(() => {
    if (currentUser.isAdmin) {
        fetchUsers();
    }
  }, [])


  //fetch more posts
  const fetchMore = async ()=>{
    try {
        setLoading(true)
        const {data} = await axiosConnection.get(`api/users?&startIndex=${users.length}`);

  
        if (!data.success) {
          setError(data.message)
          setLoading(false);
          return;
        }

        
  
        if (data.data.users.length<9) {
          setShowMore(false);
        }

  
        setUsers([...users, ...data.data.users]);
        setLoading(false);
  
        
      } catch (error) {
        setError(error.respose.data.message)
        setLoading(false)
      }
  }


  const deleteItem = async(itemId)=>{
    setModal(false);

    try {

        const { data } = await axiosConnection.delete(`/api/users/${itemId}`, {
            headers:{
                'authorization': `Bearer ${currentUser.token}`,
            },
        });

        if (!data.success) {
            setError(data.message);
        }


        setUsers((users) => users.filter((user) => user._id !==itemId));
        
    } catch (error) {
        setError(error.response.data.message);
    }
  }


  return (
    <main className='max-w-7xl mx-auto p-5 table-auto overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && !loading && users.length>0 && (
            <>
                <Table
                    hoverable
                    className='shadow-sm'
                >
                    <Table.Head>
                        <Table.HeadCell>Date Created</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Admin</Table.HeadCell>
                        <Table.HeadCell>
                            <span>Delete</span>
                        </Table.HeadCell>

                    </Table.Head>

                   <Table.Body className='divide-y'>
                        {users.map((user => {
                            const { _id, updatedAt, photo, isAdmin, username, email } = user;
                            return(
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={_id}>
                                    <Table.Cell>{new Date(updatedAt).toDateString()}</Table.Cell>

                                    <Table.Cell>
                                        <img className='w-14 h-14 rounded-full' src={photo} alt="img" />
                                    </Table.Cell>

                                    <Table.Cell className='font-semibold text-gray-900 dark:text-white'>{username}</Table.Cell>
                                    <Table.Cell className='text-gray-900 dark:text-white'>{email}</Table.Cell>
                                    <Table.Cell>{isAdmin ? <FaCheck className='text-green-700'/>: <FaTimes className='text-red-700'/>}</Table.Cell>
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
                                                    Are you sure you want to delete this user?
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

export default Users