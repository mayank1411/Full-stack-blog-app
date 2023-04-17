import { Link } from "react-router-dom"
import "./register.css"
import { useState } from "react"
import axios from "axios"
export default function Register() {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(false)
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register" , {
        username,email,password
      });  
      res.data && window.location.replace("/login")
    } catch (error) { 
      setError(true)
      console.log(error)
    }
  }
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit} >
        <label>Username</label>
        <input className="registerInput" 
        type="text" 
        placeholder="Enter your username..." 
        value={username}
        onChange={(e)=>{setUsername(e.target.value)}}
        />
        <label>Email</label>
        <input className="registerInput" 
        type="text" 
        placeholder="Enter your email..."
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
         />
        <label>Password</label>
        <input className="registerInput"
         type="password" 
         placeholder="Enter your password..."
         value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
          />
        <button className="registerButton" type="submit">Register</button>
      </form>
        <button className="registerLoginButton"><Link className="link" to="/login">Login</Link></button>
        {error && <span style={{color:"red" , marginTop: "10px"}} >Something went worng</span>}
    </div>
    )
}