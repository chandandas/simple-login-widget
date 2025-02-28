"use client";

import React, { useEffect, useState } from "react";
import { JSEncrypt } from "jsencrypt";

export default  function LoginPage({title,bgImageUrl,flogin}){

  const [title,setTitle] = useState(title);
  const [bgImageUrl,setBgImageUrl] = useState(bgImageUrl);
  const [uid,setUid] = useState('');
  const [pwd,setPwd] = useState('');

  useEffect(() => {
   
  }, [title, bgImageUrl]);

  function submit(){
    const { login } = this.props;
    login(uid,pwd);
  }
  function  handleUidChange(event) {
   const newValue = event.target.value;
   setUid(newValue)
}

function handlePwdChange(event){
    const newValue = event.target.value;
    setPwd(newValue)
  }

  
  return (
    <div className='slw-login-form-bg container' style={{ backgroundImage: `url(${bgImageUrl})` }} >
        <form className="slw-form-signin">
            <h2 className="slw-text-center">{title}</h2>
            <input type="text" className="slw-form-control" placeholder="User ID" 
                onChange={handleUidChange} value={uid} />
            <input type="password" className="slw-form-control" placeholder="Password"  
            onChange={handlePwdChange} value={pwd}  required/>
            <button className="slw-btn slw-btn-lg slw-btn-primary slw-btn-block" type="button" onClick={submit}>Sign in</button>
        </form>
    </div>

);

}
