import { useEffect, useState } from "react"
import {useNavigate, Link} from "react-router-dom"






const ShowPosts = ()=>{
    const [postsData, setPostsData] = useState()
    const [response, setResponse] = useState();
    const [loader, setLoader] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        setLoader(true)
        fetch(process.env.REACT_APP_API_BASE_URL+"/v1/api/posts",{
            methos:"GET",
            headers:{Authorization:window.localStorage.getItem('token')}
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.status=="Success"){
                console.log(data)
                setResponse(data)
            }else{
                setResponse(data)
            }
        })
        .catch(()=>{setLoader(false)})
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        
    }
    console.log(response)
    return(
        <div className="showposts-main-container">
        <header>
        <h2>Blog App</h2>
        <ul>
            <li><Link to="/posts/view">Home</Link></li>
            <li><Link to="/posts/create">Create</Link></li>
            <li onClick={()=>{window.localStorage.clear()}}><Link to="/login">LogOut</Link></li>
        </ul>
    </header>
             {response?.result?.map((e,i)=>{
                return (
                <div className="post-card-container" key={e._id}>
                    <div>
                        <img src={e?.postImage}/>
                        <h3>{e?.title}</h3>
                        <p>{e?.content}</p>
                        <p>{e?.userID?.email}</p>
                        <p>{e?.postCreatedAt?.toString()}</p>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default ShowPosts