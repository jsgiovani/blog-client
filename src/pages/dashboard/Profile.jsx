import { Alert, Button, Label, Modal, TextInput } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import app from "../../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axiosConnection from "../../config/axios";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateFailure, updateStart, updateSucces } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";


const Profile = () => {



    const { currentUser, error } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const navegate = useNavigate();

    const distpatch = useDispatch();


    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [uploadPorcentage, setUploadPorcentage] = useState(null);
    const imageRef = useRef();

    const [formData, setFormData] = useState({});




    //fn to upload image to server
    const uploadImage = async(file)=>{

        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storeRef = ref(storage, fileName);
        const uploadFile = uploadBytesResumable(storeRef, file);

        uploadFile.on('state_changed', 
        
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadPorcentage(parseInt(progress));
            },

            (error) =>  {
                setError('Image size must be max: 2MB');
                setUploadPorcentage(null);
                setImageFileUrl(null);
            },

            ()=>{
                getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) =>{
                    setImageFileUrl(downloadURL);
                    setFormData({...formData, photo:downloadURL});
                    setError(null);
                })
            }
        )

    }


    const handleChange = (e)=>{
        setFormData({...formData, [e.target.id]:e.target.value})
    }


    //fn to update user information
    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            distpatch(updateStart());
            const {data} = await axiosConnection.put(`/api/users/${currentUser._id}`, formData, {
                headers:{
                    'authorization': `Bearer ${currentUser.token}`,
                },
            });


            if (!data.success) {
                distpatch(updateFailure({status:true, message:error.response.data.message}))
            }


            distpatch(updateSucces({...data.data, token:currentUser.token}));
        } catch (error) {
           distpatch(updateFailure({status:true, message:error.response.data.message}))
        }




    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setImageFileUrl(URL.createObjectURL(file));
        };
    }

    const removeAccount = async ()=>{
        setModal(false);

        try {
            distpatch(deleteUserStart());
            const {data} = await axiosConnection.delete(`/api/users/${currentUser._id}`, {
                headers:{
                    'authorization': `Bearer ${currentUser.token}`,
                },
            });


            if (!data.success) {
                distpatch(deleteUserFailure({status:true, message:error.response.data.message}))
            }


            distpatch(deleteUserSuccess());
            navegate('/login');

        } catch (error) {
           distpatch(deleteUserFailure({status:true, message:error.response.data.message}))
        }

    }

    useEffect(() => {
        if (imageFile) {
            uploadImage(imageFile)
        };

    }, [imageFile])


  return (
    <div className='p-3 max-w-lg mx-auto w-full'>
        <h1 className="text-center my-10">Profile</h1>
        <form  onSubmit={handleSubmit}>

            <input className="hidden" type="file" accept="image/*" ref={imageRef} onChange={handleImageChange} />

        

            <div className="flex justify-center overflow-hidden">
                <div className="w-24 h-24 flex justify-center shadow mb-5 overflow-hidden rounded-full relative" onClick={()=>imageRef.current.click()}>
                    {uploadPorcentage && (
                        <CircularProgressbar 
                            defaultValue={uploadPorcentage} 
                            text={`${uploadPorcentage}%`}
                            styles={
                                {
                                    root:{
                                        width:'100%',
                                        height:'100%',
                                        position:'absolute',
                                        top:0,
                                        left:0
                                    },
                                    path:{
                                        stroke:`rgba(62, 152, 199, ${uploadPorcentage / 100})`
                                    }
                                }
                            } 
                        />
                    )}
                    <img className="rounded-full w-full object-fill border-4 border-[lightgray] cursor-pointer " src={imageFileUrl || currentUser.photo} alt={`${currentUser.username} image`} />
                </div>
            </div>

            { error && error.status && (
                <Alert className='my-2 text-center w-full font-medium' color={'failure'}>{error.message}</Alert>
            )}

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
                        defaultValue={currentUser.username}
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
                        defaultValue={currentUser.email}
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

        <div className="flex justify-between my-5 text-red-500">
            <button onClick={()=>setModal(true)}>Delete Account</button>
            <span>Logout</span>
        </div>

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
                    Are you sure you want to delete your account?
                </h3>
                <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={() => removeAccount()}>
                    {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => setModal(false)}>
                    No, cancel
                    </Button>
                </div>
                </div>
            </Modal.Body>

        </Modal>
    </div>
  )
}

export default Profile