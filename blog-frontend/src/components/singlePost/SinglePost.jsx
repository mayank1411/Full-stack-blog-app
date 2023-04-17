import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import './singlePost.css'
import {Context} from "../../context/Context"
import {useLocation} from 'react-router'
import { Link } from 'react-router-dom';
const SinglePost = () => {
  const [post,setPost] = useState({})
  const location = useLocation();
  const {user} = useContext(Context)
  const path = location.pathname.split("/")[2]
  const PF = "http://localhost:5000/images/"

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [updatemode, setUpdatemode] = useState(false)

useEffect(()=>{
  const getPost = async()=>{
    const res = await axios.get(`/posts/${path}`);
    setPost(res.data)
    setTitle(res.data.title)
    setDesc(res.data.desc)
  };
  getPost()
},[path])

const handleDelete = async ()=>{
  try {
    await axios.delete(`/posts/${post._id}` ,{data:{username: user.username}})
    window.location.replace("/")
  } catch (error) {
    console.log(error);
  }
}

const handleUpdate = async ()=>{
  try {
    await axios.put(`/posts/${post._id}` ,{username: user.username, title,desc})
    setUpdatemode(false)
  } catch (error) {
    console.log(error);
  }
}

  return (
    <div className='singlePost'>
    <div className="singlePostWrapper">
    {post.photo && 
      <img src={PF + post.photo} 
      alt="" className='singlePostImg'/>
    }
    {updatemode ? <input type = "text" value={title}  onChange={(e)=>setTitle(e.target.value)} className='singlePostTitleInput' autoFocus /> : (

      <h1 className='singlePostTitle'>
      {title}

      {post.username === user?.username &&
      
      <div className="singlePostEdit">
      <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdatemode(true)} ></i>
      <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete} ></i>
      </div>
       }
      </h1>
    )
    
    }
      <div className="singlePostInfo">
        <span className='singlePostAuthor'>
          Author : 
          <Link to={`/?user=${post.username}`} className='link' >

          <b>{post.username}</b>
          </Link>
        </span>
        <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
      </div>
      {updatemode ? (<textarea value={desc}  onChange={(e)=>setDesc(e.target.value)} className='singlePostDescInput' /> ) : (


        <p className='singlePostDesc'> 
        {desc}
        </p>
      )}
      {
        updatemode && (

      <button className='singlePostButton' onClick={handleUpdate}>Update</button>
        )
      }

    </div>
    </div>
  )
}

export default SinglePost