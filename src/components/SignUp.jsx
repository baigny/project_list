import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';

export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInput:{
                username: '',
                password: '',
                confirmedPassword: ''
            },
        }
    }  



      handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ validated: true });
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          return
        }
               
        this.postNewUser()
      }

      handleInputChange = (e) => {
        let name = e.currentTarget.name
        let val = e.currentTarget.value
        let isSubmitDisabled = false
        if(name === 'confirmedPassword'){
            if(this.state.userInput.password !== val){
                isSubmitDisabled = true
            }
         }
        else if(name === 'password'){
            if(this.state.userInput.confirmedPassword !== val){
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

    
    postNewUser = () => {
        const body ={
                      "username": this.state.userInput.username,
                      "password": this.state.userInput.password
                    }
        fetch('http://localhost:3001/users',{
            headers: { 'content-type': 'application/json' },
            method: "POST",
            body: JSON.stringify(body),
        })
        .then(() => {
             this.props.logIn()
            }
        )
    }

    
  render() {
    const { isSubmitDisabled, validated } = this.state;
   
    return (
        <div>

                <Form 
                    noValidate
                    validated={validated}
                    onSubmit={e => this.handleSubmit(e)}
                    className="custom-padding-20 width-50">
                  <Form.Group>
                    <Form.Label>New User Name</Form.Label>
                    <Form.Control required type="text" 
                        placeholder = "Enter new user name" 
                        name="username" value={this.state.userInput.username || ''} 
                        onChange={e => this.handleInputChange(e)} autoFocus/>
                    <Form.Control.Feedback type="invalid">
                      Please provide a username.
                    </Form.Control.Feedback>               
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" 
                        placeholder = "Enter Password" 
                        name="password" value={this.state.userInput.password || ''} 
                        onChange={e => this.handleInputChange(e)}/>
                    <Form.Control.Feedback type="invalid">
                      Please provide a password.
                    </Form.Control.Feedback>
                  </Form.Group>
                   <Form.Group>
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control required type="password" 
                        placeholder = "Retype Password" 
                        name="confirmedPassword" value={this.state.userInput.confirmedPassword || ''} 
                        onChange={e => this.handleInputChange(e)}/>
                    <Form.Control.Feedback type="invalid">
                      Please confirm password.
                    </Form.Control.Feedback>
                    {isSubmitDisabled && this.state.userInput.confirmedPassword.length > 0?
                        <span>Password not matching</span>
                        :
                        null
                    }
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
                    Submit
                  </Button>
                    
                </Form>
             </div>
    );
  }
}
