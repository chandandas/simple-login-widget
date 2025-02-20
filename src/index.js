
export default function SimpleLoginWidget(props) {

        return (
          
          <div className='login-form-bg container'>
          <form className="form-signin">
              <h2 className="text-center">ST CE Monitor</h2>
              <label for="inputUserID" className="sr-only">User ID</label>
              <input type="text" id="inputUserID" className="form-control" placeholder="User ID" required autofocus/>
              <label for="inputPassword" className="sr-only">Password</label>
              <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
              <button className="btn btn-lg btn-primary btn-block" type="button">Sign in</button>
          </form>
          </div>
    
       ) 
}
