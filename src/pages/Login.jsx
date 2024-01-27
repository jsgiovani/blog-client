import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosConnection from '../config/axios';
import { useSelector, useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../features/user/userSlice';

const Login = () => {

    const {error, loading} = useSelector((state) => state.user);

    const dispatch = useDispatch()


    const navegate = useNavigate();

    const [user, setUser] = useState({
        email:'',
        password:''
    });


    const handleChange = (e)=>{
        setUser({...user, [e.target.id]:e.target.value.trim()});
    };


    const handleSubmit = async (e)=>{
        e.preventDefault();


        if (Object.values(user).includes('')) {
            return  dispatch(loginFailure({message:'All fields are required', status:true}));
        }


        try {
            dispatch(loginStart());
        
            const {data} = await axiosConnection.post('/api/auth/login', user);

            if (data.success ===false) {
                dispatch(loginFailure({status:true, message:error.response.data.message}))
            }

            dispatch(loginSuccess(data.data));
            navegate('/');


        } catch (error) {
            dispatch(loginFailure({status:true, message:error.response.data.message}))
        }



    };


  return (
    <main className='min-h-screen mt-20'>

        <div className='flex flex-col gap-5 px-1 max-w-3xl mx-auto md:grid md:grid-cols-2'>
            <div className="">
                <Link to="/" className='flex gap-1 font-semibold items-end text-2xl'>
                    <h1>Blog</h1>
                </Link>

                <p className='text-sm mt-5'>Enim rerum harum ducimus exercitationem sed dolor reiciendis saepe ipsa quibusdam culpa distinctio aliquid, omnis non voluptates quae. Veritatis neque commodi officiis!</p>

            </div>

            <div>

       
            
                <form className='space-y-4' onSubmit={handleSubmit}>


                    <div>
                        <Label 
                            value='Your email'
                            htmlFor='email'


                        />
                        
                        <TextInput
                            type='email'
                            placeholder='Your email'
                            id='email'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label 
                            value='Your Password'
                            htmlFor='password'

                        />
                        
                        <TextInput
                            type='password'
                            placeholder='Password'
                            id='password'
                            onChange={handleChange}
                        />
                    </div>

                    <Button
                        gradientDuoTone={'purpleToPink'}
                        type='submit'
                        className='w-full'
                        disabled = {loading}

                    >
                        {loading ? <Spinner size={'sm'}  />:'Login'}
                    </Button>


                </form>

                <div className='flex items-center gap-1 text-sm mt-4'>
                    <span>Dont have an account?</span>
                    <Link className='text-blue-500' to="/register">Register</Link>

                </div>


                {error && error.status && (
                    <Alert className='mt-4' color={'failure'}>{error.message}</Alert>
                )}


            </div>

        </div>


    </main>
  )
}

export default Login