import React ,{useState} from "react";
import {Link, NavLink} from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [email,setEmail] = useState("");
  return (
    <div className="main_div">
     <main className="form-signin w-100 m-auto text-center container">
      <form>
        <img className="mb-4" src="https://jwt.io/img/pic_logo.svg" alt="" width="72" height="57"/>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <div className="form-floating mb-3">
          <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" id="floatingInput" placeholder="name@example.com"/>
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3 mt-3">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
          <label for="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <p className="mt-3 mb-3 text-muted">Already Exist <Link as={NavLink} to={"/login"}>Login</Link></p>
      </form>
    </main>
    </div>
  );
}
export default Signup;