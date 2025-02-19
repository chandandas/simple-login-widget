
export default function SimpleLoginWidget(props) {

        return (
          
              <form className="slp-form-signin">
                <h2 className="slp-text-center">ST CE Monitor</h2>
                <label for="inputUserID" className="slp-sr-only">User ID</label>
                <input type="text" id="inputUserID" className="slp-form-control" placeholder="User ID" required autofocus/>
                <label for="inputPassword" clclassNamess="slp-sr-only">Password</label>
                <input type="password" id="inputPassword" className="slp-form-control" placeholder="Password" required/>
                <button className="slp-btn slp-btn-lg slp-tn-primary slp-btn-block" type="button">Sign in</button>
                </form>
         
    
       ) 
}
