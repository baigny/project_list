import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import CreateProject from './components/CreateProject.jsx';
import AddCustomerToProject from './components/AddCustomerToProject.jsx';
import PrimaryNavbar from './components/PrimaryNavbar.jsx';
import Projects from './components/Projects.jsx';
import './App.css'


export default class App extends Component {
  constructor(props){
        super(props)
        this.state = {
            loggedIn: sessionStorage.getItem('userLoggedIn') ? true : false,
            mode: sessionStorage.getItem('userLoggedIn') ? 'other' : 'signin'
           
        }
    }

  logIn = () => {
     sessionStorage.setItem('userLoggedIn', true);

    this.setState({
      loggedIn: true,
      mode: 'other'
    })
  }

  logOut = () => {
    
    sessionStorage.clear();
    this.setState({
      loggedIn: false,
      mode: 'signin'
    })
  }

  updateMode = (mode) => {
    this.setState({
      mode: mode
    })
  }


  render() {

      return (
        <Router>
            <div className="">
            {this.state.loggedIn ?
                          <div>
                            <PrimaryNavbar logOut={this.logOut}/>
                            <Route exact path='/project' component={Projects}/>
                            <Route path='/addproject' component={CreateProject}/>
                            <Route path='/addcustomer' component={AddCustomerToProject}/>
                            
                          </div>
                          :
                          <div>
                            <div className={"custom-padding-10 label-span "+(this.state.mode === "signin" ? 'active-label' : '')} onClick={() => this.updateMode('signin')}>Sign In</div>
                            <div className={"custom-padding-10 label-span "+(this.state.mode === "signup" ? 'active-label' : '')} onClick={() => this.updateMode('signup')}>Sign Up</div>
                            
                            {
                                (this.state.mode === 'signin') ?
                                <SignIn logIn={this.logIn}/>
                                :
                                (this.state.mode === 'signup') ?
                                  <SignUp logIn={this.logIn}/>
                                  :
                                  null
                                  
                              }
                                
                          </div>}
            </div>
        </Router>
      );
    
  }
}

