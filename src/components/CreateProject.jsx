import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';



export default class CreateProject extends Component {
   constructor(props){
        super(props)
        this.state = {
            projectInputs:{
                name: '',
                date: '',
                description: ''
            },
            validated: false,
            isSubmitDisabled: true,
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
        this.postNewProject()
      }

      handleInputChange = (e) => {
        let name = e.currentTarget.name
        let val = e.currentTarget.value
        let isSubmitDisabled = false
       
        this.setState({
            projectInputs:{
                ...this.state.projectInputs,
                [name]: val
                },
            isSubmitDisabled: isSubmitDisabled
        })
      }

    
    
      postNewProject = () => {
        const body ={
                      "name": this.state.projectInputs.name,
                      "date": this.state.projectInputs.date,
                      "description": this.state.projectInputs.description,
                      "customers": []
                    }
        fetch('http://localhost:3001/projects',{
            headers: { 'content-type': 'application/json' },
            method: "POST",
            body: JSON.stringify(body),
        })
        .then(() => {
          this.props.closeModal()          
          }
        )
      }

     
      render() {
        const { isSubmitDisabled, validated } = this.state;
        
        return (
            <div>
                  <Form noValidate
                        validated={validated}
                        onSubmit={e => this.handleSubmit(e)}
                        className="custom-padding-20"
                      >
                      <Form.Group>
                        <Form.Label> Project Name</Form.Label>
                        <Form.Control required 
                                      type="text" placeholder= "Enter Project Name" autoFocus
                                      name="name" value={this.state.projectInputs.name || ''} 
                                      onChange={e => this.handleInputChange(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Project Date</Form.Label>
                        <Form.Control required 
                                      type="date" placeholder="Enter Project Date"
                                      name="date" value={this.state.projectInputs.date || ''} 
                                      onChange={e => this.handleInputChange(e)}
                       />               
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control
                                      as="textarea" rows="3" placeholder="Enter Project Information"
                                      name="description" value={this.state.projectInputs.description || ''} 
                                      onChange={e => this.handleInputChange(e)}
                        />
                      </Form.Group>
                      
                      <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
                        Add a New Project
                      </Button>
                  </Form>
            </div>
        );
      }
}
