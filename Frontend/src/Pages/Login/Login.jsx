import React,{useState} from "react";
import {Link, NavLink,useNavigate} from "react-router-dom";
import SpinnerLoader from "../../Components/SpinnerLoader/SpinnerLoader";
import {
  HTTP_SERVICE_CALL,
  gloabaltoastmessage,
} from "../../Components/ApiProvider/ApiProvider";
import "./Login.css";
import  secureLocalStorage  from  "react-secure-storage";

function Login() {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const signInHandler = async (event) => {
    setLoading(true);
    event.preventDefault();
    let params = {
      email:email,
      password:password
    };
    try {
      let response = await HTTP_SERVICE_CALL(
        "api/login",
        "POST",
        params,
        ""
      );
      if (response && (response.status === 200)) {
        setLoading(false);
        secureLocalStorage.setItem("user", {
          token: response?.data?.token
        });
        gloabaltoastmessage(response.data.message,5000,"success");
        navigate("/home")
      }
    } catch (error) {
      console.log(error);
      gloabaltoastmessage(error.message,3000,"error");
      setLoading(false);
    }
  }
  return (
    <div className="main_div">
      <main className="form-signin w-100 m-auto text-center container">
        {loading && <SpinnerLoader/>}   
        <form onSubmit={signInHandler}>
          <img className="mb-4" src="https://jwt.io/img/pic_logo.svg" alt="" width="72" height="57"/>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating mb-3">
            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3 mt-3">
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-control" id="floatingPassword" placeholder="Password"/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          <p className="mt-3 mb-3 text-muted">New User <Link as={NavLink} to={"/signup"}>Register</Link></p>
        </form>
      </main>
    </div>
    
  );
}
export default Login;