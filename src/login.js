"use client";

import React, { Component } from "react";
import { JSEncrypt } from "jsencrypt";


class LoginPage extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
        uid:  '',
        pwd: ''
    }
    this.handleUidChange = this.handleUidChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.submit = this.submit.bind(this);
  }


  submit(){
    const { login } = this.props;
    login(this.state.uid,this.state.pwd);
  }
  handleUidChange(event) {
   const newValue = event.target.value;
   this.setState({ uid: newValue })
}

handlePwdChange(event){
    const newValue = event.target.value;
   
    this.setState({ pwd: newValue })
  }
  render() {

    const { title,bgImageUrl } = this.props;
 

    return (
        <div className='slw-login-form-bg container' style={{ backgroundImage: `url(${bgImageUrl})` }} >
            <form className="slw-form-signin">
                <h2 className="slw-text-center">{title}</h2>
                <input type="text" className="slw-form-control" placeholder="User ID" 
                    onChange={this.handleUidChange} value={this.state.uid} />
                <input type="password" className="slw-form-control" placeholder="Password"  
                onChange={this.handlePwdChange} value={this.state.pwd}  required/>
                <button className="slw-btn slw-btn-lg slw-btn-primary slw-btn-block" type="button" onClick={this.submit}>Sign in</button>
            </form>
        </div>
  
    );
  
  }
}

export default LoginPage;