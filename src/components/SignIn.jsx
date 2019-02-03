import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import '../styles/signin.css'

export default class SignIn extends Component {
  
  constructor(props){
    super(props)
    this.state = {
        usersList: [{}],
        loginStatus: 'unknown',
        isSubmitDisabled: true,
        userInput: {
            username: '',
            password: ''
        },
        failureMsg: ''
    }
  }   


  submitLogin = () => {
    //user name exists?
    if(!this.state.usersList.find(o => o.username === this.state.userInput.username)){
        this.setState({
            failureMsg: 'user name does not exist',
            loginStatus: 'failure'
        })
    }
    //password matches?
    else if (this.state.usersList.find(o => o.username === this.state.userInput.username ).password !== this.state.userInput.password){
        this.setState({
            failureMsg: 'password incorrect',
            loginStatus: 'failure'  
        })
    }
    else {
        this.setState({
            failureMsg: '',
            loginStatus: 'success'
        })
        this.props.logIn()
    }
  }

    handleInputChange = (e) => {
        let name = e.currentTarget.name
        let val = e.currentTarget.value
        let isSubmitDisabled = false
        if(name === 'username'){
            if((val.length === 0) || (this.state.userInput.password.length === 0)){
                isSubmitDisabled = true    
            }
        }
        else if(name === 'password'){
            if((val.length === 0) || (this.state.userInput.username.length === 0)){
                isSubmitDisabled = true    
            }
        }
        this.setState({
            userInput:{
            ...this.state.userInput,
            [name]: val
            },
            isSubmitDisabled: isSubmitDisabled
        })
      }

  componentDidMount(){
    let url ="http://localhost:3001/users"
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
       
        let users = data
        this.setState({
            usersList: users
        })
    })
    }
  render() {
    const { isSubmitDisabled } = this.state;
   
    return (
        <div>

            <Form className="custom-padding-20 width-50">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter username"
                    required
                    name="username" value={this.state.userInput.username || ''}
                    onChange={e => this.handleInputChange(e)}/>               
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                    required
                    name="password" value={this.state.userInput.password || ''}
                    onChange={e => this.handleInputChange(e)}/>
              </Form.Group>
              <Button variant="primary" type="button" onClick={this.submitLogin} disabled={isSubmitDisabled}>
                Submit
              </Button>
              {this.state.loginStatus === 'failure'?
                <div>
                <p className="failed-text">LOGIN FAILED for user "{this.state.userInput.username}"</p>
                <p>Reason: {this.state.failureMsg}</p>
                <br/>
                <p>Note: You can also check conncetion to DB</p>
                </div>
                :
                null
                }
            </Form>
      
        </div>
    );
  }
}
