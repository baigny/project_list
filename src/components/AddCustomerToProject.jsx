import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';



export default class AddCustomerToProject extends Component {
   constructor(props){
        super(props)
        this.state = {
            projectDetails:{
                name: '',
                date: '',
                description: '',
                customers: [{
                  id: null,
                  email: '',
                  name: '',
                  number: ''
                }]
            },
            customerInputs:{
                name: '',
                number: '',
                email: ''
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
        this.postNewCustomer()
      }

      handleInputChange = (e) => {
        let name = e.currentTarget.name
        let val = e.currentTarget.value
        let isSubmitDisabled = false
        
        this.setState({
           customerInputs:{
                ...this.state.customerInputs,
                [name]: val
                },
            isSubmitDisabled: isSubmitDisabled
        })
      }

    
    
      postNewCustomer = () => {
        let body = this.state.projectDetails
        body.customers.push({
                              "name": this.state.customerInputs.name,
                              "number": this.state.customerInputs.number,
                              "email": this.state.customerInputs.email
                            })
                    
        fetch('http://localhost:3001/projects/'+this.state.projectDetails.id,{
            headers: { 'content-type': 'application/json' },
            method: "PUT",
            body: JSON.stringify(body),
        })
        .then(() => {
          this.props.closeModal()           
          }
        )
      }

      componentDidMount(){
        
        this.setState({
          projectDetails: this.props.projectDetails
        })
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
                        <Form.Label> Name </Form.Label>
                        <Form.Control required 
                                      type="text" placeholder= "Enter Customer Name" autoFocus
                                      name="name" value={this.state.customerInputs.name || ''} 
                                      onChange={e => this.handleInputChange(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Number </Form.Label>
                        <Form.Control required 
                                      type="number" placeholder="Enter Customer Number"
                                      name="number" value={this.state.customerInputs.number || ''} 
                                      onChange={e => this.handleInputChange(e)}
                       />               
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> Email ID </Form.Label>
                        <Form.Control required 
                                      type="email" placeholder="Enter Customer Email"
                                      name="email" value={this.state.customerInputs.email || ''} 
                                      onChange={e => this.handleInputChange(e)}
                       />
                       <Form.Control.Feedback type="invalid">
                          Please provide a valid email address.
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
                        Add a New Customer
                      </Button>
                </Form>
            </div>
        );
      }
}
