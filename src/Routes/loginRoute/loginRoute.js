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
        <div className="container-fluid" >
            <div className="row justify-content-center align-items-center bg-success w-100" style={{"height":"100vh",}}>
            <div className="col-sm-6">
 
            <div className="card p-3" >
                <div className="card-body">
            <form onSubmit={handleSubmit} method="POST">
                <h6 className="card-title mb-3">LOGIN</h6>
                <div className="form-group mb-3">
                    <label for="loginEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="loginEmail" onChange={(e)=>{setLoginData({...loginData,email:e.target.value})}} value={loginData.email}/>
                    <div id="emailValidationText" className="form-text">Email Validation</div>
                </div>
                <div className="form-group mb-3">
                    <label for="loginPassword" className="form-label">Password</label>
                    <input type="password" id="loginPassword" className="form-control" onChange={(e)=>{setLoginData({...loginData,password:e.target.value})}} value={loginData.password}/>
                    <div id="emailValidationText" className="form-text">Password validation</div>
                    <div className="form-check form-text">
                        <input type="checkbox" className="form-check-input" id="remeberMe"/>
                        <label className="form-check-label" for="rememberMe">Remember me?</label>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <input type="submit" className="btn btn-primary btn-block w-100" value="LOGIN"/>
                    <p className="form-text text-end">Forgot Password?</p>
                </div>
            </form>
            <div className="form-text text-center">
                Need an account? <Link to="/register">SIGN UP</Link>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Login