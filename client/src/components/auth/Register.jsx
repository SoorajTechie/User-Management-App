import { useState } from "react";
import "./Auth.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register()
{

    const users = {
        name:"",
        email:"",
        mobile:"",
        username:"",
        password:"",
    };

    const [user,setUser] = useState(users);

    const navigate = useNavigate();


    const InputHandler = (e) =>{
        
        const { name,value } = e.target;


        console.log(name,value);

        setUser({...user,[name]:value});
    };

    //register the data

    const Register = async(e) => {
        e.preventDefault();


        await axios.post("http://localhost:8000/api/user/register",user)
        .then((response)=>{
            toast.success(response.data.message,{position:"top-right"});
            navigate("/");
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    return(<>
    <form onSubmit={Register}>
        <div className="login">
        
            <div >Sign In</div>
                    <div>Name </div>
                    <input type="text" name="name" id="name" onChange={InputHandler}/>
                    <div>Email</div>
                    <input type="email" name="email" id="email" onChange={InputHandler}/>
                    <div>Mobile Number</div>
                    <input type="text" name="mobile" id="mobile" onChange={InputHandler}/>
                    <div>UserName </div>
                    <input type="text" name="username" id="uname" onChange={InputHandler}/>
                    <div>Password</div>
                    <input type="password" name="password" id="pword" onChange={InputHandler}/>
                    <button type="Submit">Register</button>  
                
        </div>
    </form>

       
    </>)

}

export default Register