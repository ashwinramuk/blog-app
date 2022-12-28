import { useEffect, useState } from "react"
import {useNavigate, Link} from "react-router-dom"






const CreatePost = ()=>{
    const [postsFormData, setPostsFormData] = useState({title:"",content:""})
    const [response, setResponse] = useState();
    const [loader, setLoader] = useState();
    const navigate = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("title",postsFormData.title)
        formData.append("content",postsFormData.content)
        formData.append("postImage",postsFormData.image)

        fetch(process.env.REACT_APP_API_BASE_URL+"/v1/api/posts",{
            method:'POST',
            headers:{Authorization : window.localStorage.getItem("token")},
            body: formData
        } ).then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.status=="Success"){
                setResponse(data.message)
                setPostsFormData({title:"",content:""})
            }else{
                setResponse(data.message)
            }
        })
        .catch((e)=>{console.log(e)})
        .finally(()=>{setLoader(false)})
    }
    return(
        <div className="createposts-main-container">
            <header>
        <h2>Blog App</h2>
        <ul>
            <li><Link to="/posts/view">Home</Link></li>
            <li><Link to="/posts/create">Create</Link></li>
            <li onClick={()=>{window.localStorage.clear()}}><Link to="/login">LogOut</Link></li>
        </ul>
        </header>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                    <input type="text" onChange={(e)=>{setPostsFormData({...postsFormData,title:e.target.value})}} value={postsFormData.title} placeholder="title"/>
                </div>
                <div>
                    <input type="file" onChange={(e)=>{setPostsFormData({...postsFormData,image:e.target.files[0]})}} accept="image/*"/>
                </div>
                <div>
                    <input type="text" onChange={(e)=>{setPostsFormData({...postsFormData,content:e.target.value})}} value={postsFormData.content} placeholder="Type your post here"/>
                </div>
                
                <div>
                    <input type="submit" value="Save Post"/>
                </div>
            </form>
            response
            
        </div>
    )
}

export default CreatePost