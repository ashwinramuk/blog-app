import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";




const Login = ()=>{
    const [loginData, setLoginData] = useState({email:"",password:""})
    const [response, setResponse] = useState();
    const [loader, setLoader] = useState()
    const navigate = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch(process.env.REACT_APP_API_BASE_URL+"/v1/api/users/login",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        } ).then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.status=="Success"){
                setResponse(data.message)
                window.localStorage.setItem("token",data.token)
                navigate("/posts/view")
            }else{
                setResponse(data.message)
            }
        })
        .catch((e)=>{console.log(e)})
        .finally(()=>{setLoader(false)})
    }
  
    return(
        <div className="form-main-container">
            <div className="form-sub-container">
            <form onSubmit={handleSubmit} method="POST">
                <label>
                    <input type="email" onChange={(e)=>{setLoginData({...loginData,email:e.target.value})}} value={loginData.email}/>
                </label>
                <label>
                    <input type="password" onChange={(e)=>{setLoginData({...loginData,password:e.target.value})}} value={loginData.password}/>
                </label>
                <label>
                    <input type="submit" value="LOGIN"/>
                </label>
                <p>Forgot Password?</p>
            </form>
            <div>
                Need an Account?<Link to="/register">SIGNUP</Link>
            </div>
            </div>
        </div>
    )
}

export default Login