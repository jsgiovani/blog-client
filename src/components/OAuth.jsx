import { Button } from 'flowbite-react';
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from '../firebase';
import axiosConnection from '../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess } from '../features/user/userSlice';

const OAuth = () => {
    
    const auth = getAuth(app);
    const {error, loading} = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navegate = useNavigate();

    //login with google OAuth
    const handleClick = async () =>{

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});



        try {


            const {user} = await signInWithPopup(auth, provider);
            const {email, displayName, photoURL} = user;


            const data = {
                username: displayName,
                email,
                photo: photoURL
            };

    
            dispatch(loginStart());
            const {data:dt} = await axiosConnection.post('/api/auth/google',{...data});


            //if api response is success
            if (!dt.success) {
                return  dispatch(loginFailure({message:dt.message, status:true}));
            };

            
            dispatch(loginSuccess(dt.data));
            navegate('/');

            
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <Button
        outline
        className='w-full'
        type='button'
        gradientDuoTone={'pinkToOrange'}
        onClick={handleClick}
    >
        <span className='flex items-center gap-1'>
            <FaGoogle />
            Continue With Google 
        </span>
    </Button>
  )
}

export default OAuth