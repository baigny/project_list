import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../styles/primaryNavbar.css'




export default class PrimaryNavbar extends Component {
 
  render() {
    return (
      <div> 
          <Navbar bg="light" expand="lg">
          
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Item className="custom-padding-20">
                  <Link to="/project">Projects
                  </Link>
                </Nav.Item>
              
                <Nav.Item className="custom-padding-20">
                  <Link to="/" className="custom-padding-10" onClick={() => this.props.logOut()}>Log Out</Link>  
                </Nav.Item> 

                            
              </Nav>
             
            </Navbar.Collapse>
          </Navbar>         
      </div>
    );
  }
}


