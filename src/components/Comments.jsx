import { Alert, Button, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import axiosConnection from "../config/axios";
import Comment from "./Comment";

const Comments = ({postId}) => {

    const {currentUser} = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const navegate = useNavigate();





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
            setComments([data.data, ...comments]);
            setComment('');

            
        } catch (error) {
            setError(error.response.data.message);
        }

    }


    const fetchComments = async()=>{
        try {
            setLoading(true);

            const {data} = await axiosConnection.get(`/api/comments/${postId}`);
            if (!data.success) {
                setError(data.message);
                setLoading(false);
            }

            setComments(data.data);
            setLoading(false);
            
        } catch (error) {
            setError(error.response.data.message);
        }
    }




    useEffect(() => {
        if (postId) {
            fetchComments();
        }
    }, [postId]);



    const likeUnlike = async (commentId) => {
        

        if (!currentUser ) {
            return navegate('/login');
        }


        
        // const isLiked = likes.some(like => like === currentUser._id);

        try {
            setLoading(true);
            const {data} = await axiosConnection.post(`/api/comments/likes/${commentId}`, {}, {
                headers:{
                    'authorization': `Bearer ${currentUser.token}`,
                },
            });
            
            if (!data.success) {
                setLoading(false);
                setError(data.message);
            }

           
            const comentsUpdated = comments.map(comment => {
                if (comment._id === commentId) {
                    comment.numberLikes = data.data.comment.numberLikes
                }

                return comment
            });


            setComments(comentsUpdated);
            setLoading(false);

        } catch (error) {
            setError(error.request.data.message);
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
            <div className="text-sm">
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

                <p className="my-4 font-semibold">Comments <span className="border border-gray-400 px-2 py-1 rounded-md">{comments.length}</span></p>

                {comments.length>0 ? (
                   <div className="mt-4 space-y-8">
                        {comments.map(comment => <Comment comment={comment} likeUnlike={likeUnlike} key={comment._id}/>)}
                   </div>
                ):(<p>No comments yet</p>)}





            </div>

        ):(
            <p>no</p>
        )}

    </section>
  )
}

export default Comments