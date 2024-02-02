import { Alert, Button, FileInput, Select, Spinner, TextInput } from 'flowbite-react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../../firebase";
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

const Create = () => {

    const [loading, setLoading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(null);

    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [uploadPorcentage, setUploadPorcentage] = useState(null);

    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);

    const handleChange = ()=>{

    }

    const updateFile = async (file) =>{
        try {
            if (!file) {
                return setImageUploadError('Please select an image to upload')
            }

            setImageUploadError(null);

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
                    setImageUploadError('Image size must be max: 2MB');
                    setUploadPorcentage(null);
                    setImageFileUrl(null);
                },
    
                ()=>{
                    getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) =>{
                        setImageFileUrl(downloadURL);
                        setFormData({...formData, image:downloadURL});
                        setImageUploadError(null);
                        setUploadPorcentage(null);
                    })
                }
            )


        } catch (error) {
            setImageUploadError('Something went wrong uploading the image')
        }
    }
    


    useEffect(() => {
        if (file) {
            updateFile(file)
        }
    
    }, [file])


    console.log(file);
  return (
    <main className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center font-bold text-2xl my-7'>Create a new post</h1>
        
        <form className='space-y-5'>

            <div className='flex gap-2 flex-col md:flex-row'>
                <TextInput
                    type='text'
                    placeholder='Title'
                    className='md:w-full'
                    id='title'
                    onChange={handleChange}
                />

                <Select id="category" required>
                    <option>Select</option>
                    <option value={'javascript'}>Javascript</option>
                    <option value={'react'}>React</option>
                    <option value={'php'}>Php</option>
                </Select>

            </div>


            <div className='flex gap-4 items-center justify-between border-dotted p-2 rounded-md border-2 border-indigo-500'>
                <FileInput className='w-full' type="file" name="image" id="image" onChange={(e)=>setFile(e.target.files[0])} />
            </div>

            {imageUploadError && (
                <Alert className='my-2 text-center w-full font-medium' color={'failure'}>{imageUploadError}</Alert>
            )}

            <div className='flex justify-start items-center'>

                {uploadPorcentage && (
                    <CircularProgressbar 
                    defaultValue={uploadPorcentage} 
                    className='w-48 h-40'
                    text={`${uploadPorcentage}%`}
                />
                )}

                {formData.image && (
                    <img  className='w-48 h-40 object-fill rounded-md' src={formData.image} alt="img file" />
                )}
            </div>

            <div>
                <ReactQuill 
                    theme='snow' 
                    placeholder='Write something...'
                    className='h-72 rounded-md mb-14'
                />


            </div>




            <div className='mt-5'>
                <Button
                    gradientDuoTone={'purpleToBlue'}
                    type='submit'
                    className='w-full md:w-auto md:px-5'
                    disabled = {loading}

                >
                    {loading ? <Spinner size={'sm'}  />:'Publish'}
                </Button>

            </div>

        </form>
    </main>
  )
}

export default Create