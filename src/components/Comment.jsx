import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

import axiosConnection from "../config/axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { Button, Modal, Textarea } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Comment = ({comment, likeUnlike, deleteComment, updateComment}) => {
    const {currentUser} = useSelector(state => state.user);
    const {content, userId, numberLikes, createdAt, _id:commentId, likes} = comment;
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [editableComment, setEditableComment] = useState(content);
    const [modal, setModal] = useState(false);

    const [showEditable, setShowEditable] = useState(false);


    const fetchUser = async () => {
        try {
            setLoading(true);
            const {data} = await axiosConnection.get(`/api/users/${userId}`);
            
            if (!data.success) {
                setLoading(false);
                setError(data.message);
            }

            setUser(data.data);
            setLoading(false);

        } catch (error) {
            setError(error.request.data.message);
        }
    }


    useEffect(() => {
        if (comment) {
            fetchUser();    
        }
    }, [comment])


    const handleChange = (e)=>{
        setEditableComment(e.target.value);
    }

    const handleUpdateComment = (commentId, content)=> {
        setShowEditable(false);
        updateComment(commentId, content)
    }


  return (
    <div className="flex gap-4 text-xs border-b py-2 last-of-type:border-b-0">
       <img className="w-12 h-12 object-cover rounded-full " src={user.photo} alt={`${user.username} photo`} />

       <div className="space-y-1 w-full">
            {showEditable ? (
                <div className="">

                    <Textarea 
                        className="w-full resize-none"
                        value={editableComment}
                        onChange={handleChange} 
                        rows="4">
                    </Textarea>

                    <div className="flex justify-end gap-1 mt-2">
                        <Button
                            gradientDuoTone={'purpleToBlue'}
                            onClick={()=>handleUpdateComment(commentId, {content:editableComment})}
                            type='button'
                            outline

                        >
                            Save
                        </Button>


                        <Button
                            gradientDuoTone={'purpleToBlue'}
                            type='button'
                            outline
                            onClick={()=> setShowEditable(false)}

                        >
                            Cancel
                        </Button>
                    </div>


                </div>
            ):(
                <div>
                    <div className="flex gap-1 items-center">
                        <h3 className="font-semibold">@{user.username}</h3>
                        <span className="font-light">{moment(createdAt).fromNow()}</span>
                    </div>
                    <p>{content}</p>
                    <div className="flex items-center gap-1 border-t mt-2 pt-2">
                        <button className="text-md" onClick={()=>likeUnlike(commentId)}>
                            <AiOutlineLike color="blue" />
                        </button>

                        {numberLikes>0 && <span>{numberLikes } Like</span>}

                        {(currentUser._id === userId || currentUser.isAdmin)  && (
                            <div className="flex gap-1 items-center">
                                <button onClick={()=>setShowEditable(true)}  className="hover:text-blue-500">Edit</button>
                                <button className='font-medium hover:text-red-500 hover:underline cursor-pointer' onClick={()=>setModal(true)}>Delete</button>
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
                                                Are you sure you want to delete this comment?
                                            </h3>
                                            <div className="flex justify-center gap-4">
                                                <Button color="failure" onClick={()=>deleteComment(commentId)}>
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
                        )}
                    </div>

                </div>
            )}
       </div>
    </div>
  )
}

export default Comment