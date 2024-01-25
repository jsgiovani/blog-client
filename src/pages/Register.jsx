import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
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
                <form className='space-y-4'>

                    <div>
                        <Label 
                            value='Your Username'
                            htmlFor='username'

                        />
                        
                        <TextInput
                            type='text'
                            placeholder='Username'
                            id='username'
                        />
                    </div>

                    <div>
                        <Label 
                            value='Your email'
                            htmlFor='email'

                        />
                        
                        <TextInput
                            type='email'
                            placeholder='Your email'
                            id='email'
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
                        />
                    </div>

                    <Button
                        gradientDuoTone={'purpleToPink'}
                        type='submit'
                        className='w-full'
                    >
                        Register
                    </Button>


                </form>

                <div className='flex items-center gap-1 text-sm mt-4'>
                    <span>Have an account?</span>
                    <Link className='text-blue-500' to="/login">Login</Link>

                </div>


            </div>

        </div>


    </main>
  )
}

export default Register