import { Link, useParams } from "react-router-dom"
import axiosConnection from "../../config/axios";
import { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";

const Post = () => {

  const {slug} = useParams();


  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  //fetch post
  const fetchData = async () =>{

    try {
      setLoading(true);
      const {data} = await axiosConnection.get(`/api/posts?slug=${slug}`);

      if (!data.success) {
        setError(data.message)
        setLoading(false);
      }

      setPost(data.data.posts[0])
      setLoading(false);
    } catch (error) {
      set(error.response.data.message);
      setLoading(false);
    }



  }

  useEffect(() => {
    if (slug) {
      fetchData();
    }
  }, [slug])



  if (loading && post && post.content) {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <Spinner className="xl" color={'primary'}/>
        </div>
    );
  }

  return (
    <main className="p-3 max-w-6xl mx-auto">
      <h1 className="text-center text-3xl mt-5 p-3 font-serif ">{post && post.title}</h1>
  

      <div className="flex justify-center my-5">
        <Link to={`/search?category=${post && post.category}`}>
            <Button color="gray" size={'sm'} pill >{post && post.category}</Button>
        </Link>
      </div>


      <div className="w-full flex justify-center">
        <img className="max-h-[600px] w-full object-contain" src={post && post.image} alt={`post ${post && post.name}`} />
      </div>

      <div className="flex justify-between items-center py-3 border-b border-slate-500 text-sm">
            <p>{ new Date(post && post.createdAt).toLocaleDateString()}</p>
            {/* <p>{(post &&  post.content.length/1000).toFixed(0)}</p> */}
      </div>

        
        <div dangerouslySetInnerHTML={{ __html:post && post.content }} className="my-5 max-w-2xl mx-auto w-full post-content">

        </div>



    </main>
  )
}

export default Post