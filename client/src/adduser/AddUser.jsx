import React, { useState } from 'react'
import "./adduser.css"
import axios from 'axios';
import toast from "react-hot-toast";

import{Link, useNavigate} from "react-router-dom";

const AddUser = () => {

          const users = {
            name:"",
            email:"",
            address:"",
          };

          const [user,setUser] = useState(users);
          const navigate = useNavigate();

          const inputHandler = (e) => {
          const { name, value } = e.target;

          console.log(name,value);

          setUser({...user,[name]:value});
        };


          const submitData = async(e) =>{
            e.preventDefault();

            await axios.post("http://localhost:8000/api/user/create",user)
            .then((response)=>{
              toast.success(response.data.message,{position:"top-right"});
              navigate("/add"); //navigate to homepage

            })
            .catch((error)=>{
              console.log(error);

            })
          };


          //delete data
           


  return (
    <div className='add-user'>
      <Link to="/user" type='button' className='btn btn-secondary'>  <i class="fa-solid fa-backward"></i> Back</Link>
        <h1>Add New User</h1>
        <form className="addUserForm" onSubmit={submitData}>
            <div className="inputGroup">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={inputHandler}
                    autocomplete="off"
                    placeholder="Enter your Name"
                />
            </div> 
              <div className="inputGroup">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={inputHandler}
                    autocomplete="off"
                    placeholder="Enter your Email"
                />
                  <div className="inputGroup">
                <label htmlFor="address">Address:</label>
                <textarea  id="address"
                    name="address"
                    onChange={inputHandler}
                    autocomplete="off"
                    placeholder="Enter your address"></textarea>

            </div> 
            <button type='submit' className='btn btn-primary'>Add</button>
            </div> 
        </form>
      
    </div>
  )
}

export default AddUser
