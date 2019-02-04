import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import AddCustomerToProject from './AddCustomerToProject.jsx';
import ReactPaginate from 'react-paginate';
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
            rangeStart: 1,
            rangeEnd: 8
        }
    }  


      onOpenModal = () => {
        this.setState({ open: true });
      };

      onCloseModal = () => {
        this.setState({ open: false });
      };

      setRange = (e) => {
        const itemsPerPage = 8
        this.setState({
          rangeStart: (e.selected*itemsPerPage)+1,
          rangeEnd: (e.selected*itemsPerPage)+itemsPerPage
        })
      }

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
        const itemsPerPage = 8;

        var paginateItems = <ReactPaginate pageCount={Math.ceil(this.state.projectDetails.customers.length/itemsPerPage)}
                              pageRangeDisplayed={5}
                              marginPagesDisplayed={1} 
                              onPageChange={this.setRange}
                              disabledClassName="disabledPagination"
                              containerClassName="custom-container-pagination"
                              pageClassName="custom-li-pagination"
                              previousClassName="custom-li-pagination"
                              nextClassName="custom-li-pagination"
                              breakClassName="custom-break-pagination"
                              activeClassName="custom-active-pagination"
                              activeLinkClassName="custom-active-link-pagination"
                              pageLinkClassName=""/>
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
                    {paginateItems}
                         {this.state.projectDetails.customers.filter(item => (item.id>=this.state.rangeStart && item.id<=this.state.rangeEnd)).map((item, i) => {
                          return (<div className="customer-line" key={i}>
                              <div>
                                Customer ID: {item.id}
                                <br/>
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

                  {paginateItems}


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
