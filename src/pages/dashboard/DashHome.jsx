import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axiosConnection from '../../config/axios';
import { TbUsersGroup } from "react-icons/tb";
import { FaArrowUp } from "react-icons/fa6";
import { HiArrowSmRight, HiChartPie, HiDocumentText, HiInbox, HiOutlineUsers, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Button, Table } from 'flowbite-react';

const DashHome = () => {

    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const { currentUser } = useSelector((state) => state.user);

   const { isAdmin, token } = currentUser;



   const fetchUsers = async() =>{

    try {
        const { data } = await axiosConnection.get('/api/users?limit=5', {
            headers:{
                'authorization': `Bearer ${token}`,
            }
        });
        
        if (!data.success) {
            return setError(data.message);
        }

        setUsers(data.data.users);
        setTotalUsers(data.data.totalUsers);
        setLastMonthUsers(data.data.lastMonthUsers)
        setError(null);

    } catch (error) {
        setError(error.response.data.message);
    }
   };


   const fetchComments = async() =>{

    try {
        const { data } = await axiosConnection.get('/api/comments?limit=5', {
            headers:{
                'authorization': `Bearer ${token}`,
            }
        });
        
        if (!data.success) {
            return setError(data.message);
        }

        setComments(data.data.comments);
        setTotalComments(data.data.totalComments);
        setLastMonthComments(data.data.lastMonthComments);
        setError(null);

    } catch (error) {
        setError(error.response.data.message);
    }
   };
   const fetchPosts = async() =>{

    try {
        const { data } = await axiosConnection.get('/api/posts?limit=5', {
            headers:{
                'authorization': `Bearer ${token}`,
            }
        });
        
        if (!data.success) {
            return setError(data.message);
        }

        setPosts(data.data.posts);
        setTotalPosts(data.data.totalPosts);
        setLastMonthPosts(data.data.lastMonthPosts);
        setError(null);

    } catch (error) {
        setError(error.response.data.message);
    }
   };
   
   
   useEffect(() => { 
    if (isAdmin) {
        fetchUsers();
        fetchComments();
        fetchPosts();
    }      
   }, [])


  return (
    <main className='p-2 max-w-7xl md:mx-auto space-y-4'>

        <div className='grid gap-4 md:grid-cols-3'>

            <div className='px-2 py-4 rounded-md shadow-md space-y-2'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h3 className='text-gray-500 text-sm uppercase'>Total Users</h3>
                        <p className='text-2xl'>{totalUsers}</p>
                    </div>
                    <TbUsersGroup className='bg-teal-600 text-white rounded-full p-3 text-5xl shadow-lg' />
                </div>

                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <FaArrowUp />
                        {lastMonthUsers}
                    </span>

                    <p className='text-gray-500'>Last month</p>
                </div>

            </div>

            <div className='px-2 py-4 rounded-md shadow-md space-y-2'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h3 className='text-gray-500 text-sm uppercase'>Total Posts</h3>
                        <p className='text-2xl'>{totalPosts}</p>
                    </div>
                    <HiDocumentText className='bg-teal-600 text-white rounded-full p-3 text-5xl shadow-lg' />
                </div>

                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <FaArrowUp />
                        {lastMonthPosts}
                    </span>

                    <p className='text-gray-500'>Last month</p>
                </div>

            </div>


            <div className='px-2 py-4 rounded-md shadow-md space-y-2'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                        <p className='text-2xl'>{totalComments}</p>
                    </div>
                    <HiOutlineUsers className='bg-teal-600 text-white rounded-full p-3 text-5xl shadow-lg' />
                </div>

                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <FaArrowUp />
                        {lastMonthComments}
                    </span>

                    <p className='text-gray-500'>Last month</p>
                </div>

            </div>

        </div>


        <div className='grid md:grid-cols-2 gap-4'>

            <div className='shadow-md rounded-md overflow-hidden'>
                <div className='flex justify-between items-center p-3'>
                    <h3>Recent Users</h3>

                    <Link to={'/dashboard?tab=users'} className="block">
                        
                        <Button
                            gradientDuoTone={'purpleToPink'}
                            type='button'
                            className=''
                            outline
        
                        >
                            See all
                        </Button>
                    </Link>
                </div>


                <Table
                    hoverable
                >
                    <Table.Head>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>

                    </Table.Head>

                   <Table.Body className='divide-y'>
                        {users.map((user => {

                            const { _id, photo, email } = user;
                            return(
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 border-none p-2' key={_id}>

                                    <Table.Cell>
                                        <img className='w-14 h-14 rounded-full' src={photo} alt="img" />
                                    </Table.Cell>

                                    <Table.Cell className='text-gray-900 dark:text-white text-sm'>{email}</Table.Cell>

                                </Table.Row>

                            );
                        }))}
                   </Table.Body>

                </Table>

               

            </div>

            <div className='shadow-md rounded-md overflow-hidden'>
                <div className='flex justify-between items-center p-3'>
                    <h3>Recent Comments</h3>

                    <Link to={'/dashboard?tab=comments'} className="block">
                        
                        <Button
                            gradientDuoTone={'purpleToPink'}
                            type='button'
                            className=''
                            outline
        
                        >
                            See all
                        </Button>
                    </Link>
                </div>


                <Table
                    hoverable
                >
                    <Table.Head>
                        <Table.HeadCell>Comment</Table.HeadCell>
                        <Table.HeadCell>Likes</Table.HeadCell>

                    </Table.Head>

                   <Table.Body className='divide-y'>
                        {comments.map((comment => {

                            const { _id, content, numberLikes } = comment;
                            return(
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 border-none p-2' key={_id}>

                                    <Table.Cell className='text-gray-900 dark:text-white text-sm'>{content}</Table.Cell>
                                    <Table.Cell className='text-gray-900 dark:text-white text-sm'>{numberLikes}</Table.Cell>

                                </Table.Row>

                            );
                        }))}
                   </Table.Body>

                </Table>

               

            </div>

           


        </div>



    </main>
  )
}

export default DashHome