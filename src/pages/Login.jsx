import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosConnection from '../config/axios';

const Login = () => {

    const navegate = useNavigate();

    const [user, setUser] = useState({
        email:'',
        password:''
    });


    const [alert, setAlert] = useState({status:false});
    const [loading, setLoading] = useState(false);




    const handleChange = (e)=>{
        setUser({...user, [e.target.id]:e.target.value.trim()});
    };


    const handleSubmit = async (e)=>{
        e.preventDefault();


        if (Object.values(user).includes('')) {
            return setAlert({message:'All fields are required', status:true});
        }


        try {
            setLoading(true);
            setAlert({status:false});
            const {data} = await axiosConnection.post('/api/auth/login', user);

            if (data.success ===false) {
                setAlert({message:data.message, status:true});
                return setLoading(false);
            }

            setLoading(false);
            navegate('/');


        } catch (error) {
            setAlert({message:error.response.data.message, status:true});
            setLoading(false);
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


                {alert.status && (
                    <Alert className='mt-4' color={'failure'}>{alert.message}</Alert>
                )}


            </div>

        </div>


    </main>
  )
}

export default Login