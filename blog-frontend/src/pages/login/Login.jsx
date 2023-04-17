import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();

  const {dispatch, isFetching} = useContext(Context)


  const handleSubmit = async (e)=>{
    e.preventDefault()
    dispatch({type : "LOGIN_START"});
    try {
      const res = await axios.post("/auth/login", {
        username : userRef.current.value,
        password : passwordRef.current.value
      })
      dispatch({type:"LOGIN_SUCCESS" , payload : res.data});
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"});
    }
  }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit} >
        <label>Username</label>
        <input className="loginInput" type="text" ref={userRef} placeholder="Enter your username..." />
        <label>Password</label>
        <input className="loginInput" type="password" ref={passwordRef} placeholder="Enter your password..." />
        <button className="loginButton" type="submit" >Login</button>
      </form>
        <button className="loginRegisterButton"  disabled={isFetching}>
          <Link className="link" to="/register">Register</Link>
        </button>
    </div>
  );
}