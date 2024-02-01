import { Button, FileInput, Select, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Create = () => {

    const [loading, setLoading] = useState(false);

    const handleChange = ()=>{

    }




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
                <FileInput className='w-full' type="file" name="image" id="image" />

                <Button
                    gradientDuoTone={'purpleToPink'}
                    type='button'
                    className=''
                    outline
                    size={'sm'}
                    disabled = {loading}

                >
                    Upload Image
                </Button>
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