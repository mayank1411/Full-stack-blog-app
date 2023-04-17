import { useEffect, useState } from "react"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import SideBar from "../../components/sideBar/SideBar"
import "./Home.css"
import axios from "axios";
import { useLocation } from "react-router-dom"

const Home = () => {
  const [posts,setPosts] =  useState([]);
  const {search} = useLocation();
  useEffect(()=>{
    const fetchPosts = async ()=>{
      try {
        const res = await axios.get("/posts/" + search);
        console.log(res.data)
        setPosts(res.data);
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  },[search])

  
  return (
    <>
      <Header/>
      <div className="home">
      <Posts posts={posts}/>
      <SideBar/>
      </div>
    </>
  )
}

export default Home