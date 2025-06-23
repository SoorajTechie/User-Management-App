import React, { useEffect, useState } from 'react'
import "./update.css"
import axios from 'axios';
import toast from "react-hot-toast";

import{Link, useNavigate ,useParams} from "react-router-dom";

const Update = () => {

          const users = {
            name:"",
            email:"",
            address:"",
          };

          const [user,setUser] = useState(users);
          const navigate = useNavigate();
          const {id} = useParams();

          const inputHandler = (e) => {
          const { name, value } = e.target;

          console.log(name,value);

          setUser({...user,[name]:value});
        };

        useEffect(()=>{
            axios.get(`http://localhost:8000/api/user/${id}`)
            .then((response)=>{
                setUser(response.data);

            })
            .catch((error)=>{
                console.log(error);

            });

        },[id]);


          const submitData = async(e) =>{
           
            e.preventDefault();

            await axios.put(`http://localhost:8000/api/user/update/${id}`,user)
            .then((response)=>{
              toast.success(response.data.message,{position:"top-right"});
              navigate("/user"); //navigate to homepage

            })
            .catch((error)=>{
              console.log(error);

            })
          };


  return (
    <div className='add-user'>
      <Link to="/" type='button' className='btn btn-secondary'>  <i class="fa-solid fa-backward"></i> Back</Link>
        <h1>Update User</h1>
        <form className="addUserForm" onSubmit={submitData}>
            <div className="inputGroup">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
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
                    value={user.email}
                    name="email"
                    onChange={inputHandler}
                    autocomplete="off"
                    placeholder="Enter your Email"
                />
                  <div className="inputGroup">
                <label htmlFor="address">Address:</label>
                <textarea  id="address"
                    name="address"
                    value={user.address}
                    onChange={inputHandler}
                    autocomplete="off"
                    placeholder="Enter your address"></textarea>

            </div> 
            <button type='submit' className='btn btn-primary'>Update</button>
            </div> 
        </form>
      
    </div>
  )
}

export default Update
