import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

import axiosConnection from "../config/axios";
import { useSelector } from "react-redux";
import moment from "moment";

const Comment = ({comment, likeUnlike}) => {
    const {currentUser} = useSelector(state => state.user);
    const {content, userId, numberLikes, createdAt, _id:commentId, likes} = comment;
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);


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




  return (
    <div className="flex gap-4 text-xs border-b py-2 last-of-type:border-b-0">
       <img className="w-12 h-12 object-cover rounded-full " src={user.photo} alt={`${user.username} photo`} />
       <div className="space-y-1">
            <div className="flex gap-1 items-center">
                <h3 className="font-semibold">@{user.username}</h3>
                <span className="font-light">{moment(createdAt).fromNow()}</span>
            </div>
            <p>{content}</p>
            <div className="flex items-center gap-1 border-t mt-2 pt-2">
                <button className="text-md" onClick={()=>likeUnlike(commentId)}>
                    <AiOutlineLike color="blue" />
                </button>

                {numberLikes>0 && <span>{numberLikes} Like</span>}

                {currentUser._id === userId && (
                    <div className="flex gap-1 items-center">
                        <button className="hover:text-blue-500">Edit</button>
                        <button className="hover:text-red-500 hover:underline">Delete</button>
                    </div>
                )}

            </div>
       </div>
    </div>
  )
}

export default Comment