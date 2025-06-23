import React, { useEffect, useState } from 'react'
import './user.css'
import axios from "axios"
import {Link} from "react-router-dom"
import toast from "react-hot-toast"

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{
      try{

        const response = await axios.get("http://localhost:8000/api/user/all")
        setUsers(response.data);

      }catch(error){
        console.log("error while fetching data",error);
      }
    };

    fetchData()
  },[]); //[] ensure that the useeffect only run once


  const DeleteData = async(userId) =>{

      await axios
        .delete(`http://localhost:8000/api/user/delete/${userId}`)
        .then((response) => {
          setUsers((preVuser)=>preVuser.filter((users)=>users._id!==userId));
          toast.success(response.data.message,{position:"top-right"});
      
      })
        .catch((error)=> {
             console.log(error);
      });
  };

  return (
    <>
    <div className='userTable'>
        <Link to="/add" type="button" className='btn btn-primary '>Add user <i class="fa-solid fa-user-plus"></i></Link>
        
        {users.length===0?(
          <div className='no-data'>
            <h3>No data to display</h3>
            <p>Please add New User</p>
          </div>
        ):(
  <table class="table table-boardered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">NAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => {
            return(   
              <tr>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td className='action-btn'> 

                <Link to={`/update/`+user._id} type='button' className='btn btn-info' >  
                    <i class="fa-solid fa-pen-to-square"></i>
                </Link> 
                  
                  <button onClick={()=>DeleteData(user._id)} type="button" className='btn btn-danger'>
                      <i class="fa-solid fa-trash"></i>
                    </button>
              </td>
            </tr>
            )
          })}
       
        </tbody>
      </table>

        )}
    </div>
    </>
    
  )
}

export default User
