import { Link } from "react-router-dom"
import "./SideBar.css"
import { useEffect, useState } from "react"
import axios from "axios"
const SideBar = () => {
  const [cats,setCat] = useState([]);

  useEffect(()=>{
    const getCat = async ()=>{
      const res = await axios.get("/categories");
      setCat(res.data)
    }
    getCat();
  }, [])

  return (
    <div className="sidebar"> 
     <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://thumbs.dreamstime.com/b/open-book-hardback-books-wooden-table-education-background-back-to-school-copy-space-text-76106466.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
        {
            cats.map((c , key)=>(
              
          <li className="sidebarListItem" >
          <Link className="link"  to={`/?cat=${c.name}`}>
              {c.name}
            </Link>
          </li>
            ))}
        </ul>
      </div>
      <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-square-facebook"></i>
            <i className="sidebarIcon fa-brands fa-square-twitter"></i>
            <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
            </div>
      </div>
    </div>
  )
  
}

export default SideBar