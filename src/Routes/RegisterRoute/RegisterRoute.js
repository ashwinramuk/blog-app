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
        <div className="container-fluid" >
            <div className="row justify-content-center align-items-center bg-success w-100" style={{"height":"100vh",}}>
            <div className="col-sm-6">
 
            <div className="card p-3" >
                <div className="card-body ">
            <form onSubmit={handleSubmit} method="POST">
            <h6 className="card-title mb-3">SIGN UP</h6>
            <div className="form-group mb-3">
                    <label for="rigisterEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="registerEmail" onChange={(e)=>{setRegisterData({...registerData,email:e.target.value})}} value={registerData.email}/>
                    <div id="emailValidationText" className="form-text">Email Validation</div>
                </div>
                <div className="form-group mb-3">
                    <label for="registerPassword" className="form-label">Password</label>
                    <input type="password" id="registerPassword" className="form-control" onChange={(e)=>{setRegisterData({...registerData,password:e.target.value})}} value={registerData.password}/>
                    <div id="passwordValidationText" className="form-text">Password validation</div>
                </div>
                <div className="form-group mb-3">
                    <label for="registerPassword" className="form-label">Confirm Password</label>
                    <input type="password" id="registerPassword" className="form-control" onChange={(e)=>{setRegisterData({...registerData,confirmPassword:e.target.value})}} value={registerData.confirmPassword}/>
                    <div id="confirmPasswordValidationText" className="form-text">Password validation</div>
                </div>
                <div className="form-group mb-3">
                    <input type="submit" className="btn btn-primary btn-block w-100" value="SIGN UP"/>
                </div>
            </form>
            <div className="form-text text-center">
                Already Registered? <Link to="/register">LOGIN</Link>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
    )
}
export default Register;