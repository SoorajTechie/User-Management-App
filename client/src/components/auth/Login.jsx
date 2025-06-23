import { Link } from "react-router-dom";
import "./Auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login()
{

    const users = {
        username:"",
        password:"",
    };


    const [user,setUser] = useState(users)
    const navigate = useNavigate();

    const inputHandle = (e) =>{
        
        const {name,value} = e.target;

        setUser({...user,[name]:value}); //or setUser({...user,[e.target.name]:e.target.value})

        console.log({name,value});

    };

    const HandleLogin = async(e)=>{
        
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/user/login",user);

            localStorage.setItem("token",response.data.token);
            toast.success("Login success",{position:"top-right"});
            navigate("/user");
           
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");

        }
    };



return(<>
<form onSubmit={HandleLogin}>
    <div className="login">

         <div >Sign In</div>
         <div>Username </div>
         <input type="username" id="username" name="username" onChange={inputHandle}/>
         <div>Password</div>
         <input type="password" id="password" name="password" onChange={inputHandle}/>
         <button type="Submit"> Login</button>
    
            <div className="No-acc">
                <div>don't have a account ?</div><Link to="/register">register</Link>
            </div>    
    </div>
</form>
    
                
    
</>)




}
export default Login