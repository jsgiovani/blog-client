import { Alert, Button, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import axiosConnection from "../config/axios";

const Comment = ({postId}) => {

    const {currentUser} = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);





    const handleChange = (e)=>{
        setComment(e.target.value);
    }

    const handleSubmit= async (e) => {
        e.preventDefault();

        if (comment.length>200 || comment.length === 0) {return setError('Insert your comment')};


        try {

            setLoading(true);

            const {data} = await axiosConnection.post(`/api/comments/${postId}`, {content:comment}, {
                headers:{
                    'authorization': `Bearer ${currentUser.token}`,
                },
            });


            if (!data.success) {
                setError(data.message);
                setLoading(false);
            }



            setLoading(false);
            setComment('');

            
        } catch (error) {
            setError(error.response.data.message);
        }

    }



    
  return (
    <section>
        <div className="py-5">{currentUser ? (
            <div className="flex gap-1 items-center text-sm">
                <p>Signed in as:</p>
                <img className="rounded-full w-8 h-8" src={currentUser.photo} alt={`${currentUser.username} photo}`} />
                <Link className="text-xs text-cyan-500 hover:underline" to = {`/dashboard?tab=profile`}>@{currentUser.username}</Link>
                
            </div>
    
        ):(
            <div>
                <p className="my-2">You most be signed in to commet</p>
                <Link className="font-semibold"  to = {`/login`}>
                    <Button className='font-semibold' gradientDuoTone='purpleToPink'>
                        Login
                    </Button>
                </Link>
            </div>
        )}</div>

        {currentUser && currentUser.username ? (
            <form onSubmit={handleSubmit} className="border rounded-md p-4 border-teal-500">

                <Textarea
                    type='text'
                    placeholder='Add a comment...'
                    id='comment'
                    onChange={handleChange}
                    rows={3}
                    value={comment}
                    className="resize-none"
                />

                <div className="flex justify-between items-center text-sm mt-2">

                    <p>{200-comment.length || 0} remaining</p>

                    <Button
                        gradientDuoTone={'purpleToPink'}
                        type='submit'
                        outline

                    >
                        Submit
                    </Button>

                </div>
                {error && <Alert className="mt-3 text-sm " color={'failure'}>{error}</Alert>}

            </form>

):(
            <p>no</p>
        )}

    </section>
  )
}

export default Comment