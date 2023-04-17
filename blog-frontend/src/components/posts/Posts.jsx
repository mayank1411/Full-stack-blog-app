import "./Posts.css"
import Post from "../post/Post"
const Posts = ({posts}) => {
  return (
    <div className='posts'>
    {
      posts.map((p,key)=>(
        <Post key = {p._id} post={p} img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
      ))
    } 
       
      
    </div>
  )
}

export default Posts