import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import AddCustomerToProject from './AddCustomerToProject.jsx';
import '../styles/customer.css';


export default class ProjectDetail extends Component {
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
             open: false,
        }
    }  


      onOpenModal = () => {
        this.setState({ open: true });
      };

      onCloseModal = () => {
        this.setState({ open: false });
      };

      componentDidMount(){
        var id = this.props.id
        if(id){
          this.getProjectDetailbyId(id)
         
        }
      }

      getProjectDetailbyId = (id) => {
      let url ="http://localhost:3001/projects?id="+id
      fetch(url)
      .then(resp => resp.json())
      .then(data => {
         
          let projects = data
          this.setState({
              projectDetails: projects[0]
          })
      })
    }
      
      render() {
        const { open } = this.state;
        return (
          <div>
            <div className="custom-padding-10 custom-right">
              <Button type="button" onClick={this.props.goToList}>Go Back to List</Button>
            </div>
            <div className="custom-padding-10 custom-right">
              <Button type="button" onClick={this.onOpenModal}>Add Customer</Button>
            </div>
            <div className="custom-padding-20">
                  
                  Name : <span>{this.state.projectDetails.name}</span>
                  <br/>
                  Date : <span>{this.state.projectDetails.date}</span>
                  <br/>
                  Description : <span>{this.state.projectDetails.description}</span>
                  <br/>
                  Customers Count: <span>{this.state.projectDetails.customers.length}</span>
                  {this.state.projectDetails.customers.length ? 
                    <div>
                    List of Customers:
                         {this.state.projectDetails.customers.map((item, i) => {
                          return (<div className="customer-line" key={i}>
                              <div>
                                Name: {item.name}
                                <br/>
                                Number: {item.number}
                                <br/>
                                Email: {item.email}
                                <br/>
                                
                              </div>
                              <hr/>
                            </div>)
                            })
                          }
                    </div>
                    :
                    null
                  }


                  <br/>
                  <Modal open={open} onClose={this.onCloseModal} 
                    classNames={{
                      modal: "customModal",
                    }}>
                    <AddCustomerToProject projectDetails={this.state.projectDetails} closeModal={this.onCloseModal} />
                  </Modal>

            </div>
          </div>
        );
      }
}
