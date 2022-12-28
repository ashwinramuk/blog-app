import { useState } from "react"
import {useNavigate, Link} from "react-router-dom"




const Register = ()=>{
    const [registerData, setRegisterData] = useState({email:"",password:"",confirmPassword:""})
    const [response, setResponse] = useState();
    const [loader, setLoader] = useState()
    const navigate = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoader(true)
        fetch(process.env.REACT_APP_API_BASE_URL+"/v1/api/users/register",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        } ).then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.status=="Success"){
                setResponse(data.message)
                navigate("/login")
            }else{
                setResponse(data.message)
            }
        })
        .catch(()=>{setLoader(false)})

    }
    return(
        <div className="form-main-container">
            <div className="form-sub-container">
            <form onSubmit={handleSubmit} method="POST">
                <label>Email
                    <input type="email" onChange={(e)=>{setRegisterData({...registerData,email:e.target.value})}} value={registerData.email}/>
                </label>
                <label>Password
                    <input type="password" onChange={(e)=>{setRegisterData({...registerData,password:e.target.value})}} value={registerData.password}/>
                </label>
                <label>Confirm Password
                    <input type="password" onChange={(e)=>{setRegisterData({...registerData,confirmPassword:e.target.value})}} value={registerData.confirmPassword}/>
                </label>
                <label>
                    <input type="submit" value="SIGNUP"/>
                </label>
            </form>
            <div>
                Already SignedUp?<Link to="/login">LOGIN</Link>
            </div>
            </div>
        </div>
    )
}
export default Register;