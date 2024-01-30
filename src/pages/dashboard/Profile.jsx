import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux"


const Profile = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false)

    const handleChange = ()=>{

    }

    const handleSubmit = ()=>{

    }

  return (
    <div className='p-3 max-w-lg mx-auto w-full'>
        <h1 className="text-center my-10">Profile</h1>
        <form  onSubmit={handleSubmit}>
            <div className="flex justify-center overflow-hidden">
                <div className="w-24 flex justify-center shadow mb-5 overflow-hidden rounded-full">
                    <img className="rounded-full w-full border-4 border-[lightgray] cursor-pointer " src={currentUser.photo} alt={`${currentUser.username} image`} />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <Label 
                        value='Your Username'
                        htmlFor='username'

                    />
                    
                    <TextInput
                        type='text'
                        placeholder='Username'
                        id='username'
                        onChange={handleChange}
                        value={currentUser.username}
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
                        onChange={handleChange}
                        value={currentUser.email}
                    />
                </div>

                <div>
                    <Label 
                        value='New Password'
                        htmlFor='password'

                    />
                    
                    <TextInput
                        type='password'
                        placeholder='Insert your new password'
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
                    {loading ? <Spinner size={'sm'}  />:'Update'}
                </Button>

            </div>


        </form>

        <div className="flex justify-between my-5 text-red-500 font-semibold">
            <span>Delete Account</span>
            <span>Logout</span>
        </div>
    </div>
  )
}

export default Profile