import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ProjectDetail from './ProjectDetail.jsx';
import '../styles/project.css'
import Modal from 'react-responsive-modal';
import CreateProject from './CreateProject.jsx';

export default class Projects extends Component {
   constructor(props){
        super(props)
        this.state = {
            projectsList: [{}],
            open: false,
            view: "list",
            selectedId: null

        }
    }  

  onOpenModal = () => {
      this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
    this.getProjectList()
  };


  componentDidMount(){
        this.getProjectList()
    }

    getProjectList = () => {
      let url ="http://localhost:3001/projects"
      fetch(url)
      .then(resp => resp.json())
      .then(data => {
         
          let projects = data
          this.setState({
              projectsList: projects
          })
      })
    }

    gotoProjectDetail = (id) => {
        this.setState({
        view: "detail", 
        selectedId: id
      })
    }

    goToList = () => {
     this.setState({
        view: "list", 
        selectedId: null
      }) 
    }

      render() {
          if(this.state.view === 'detail'){
          return (<ProjectDetail id={this.state.selectedId} goToList={this.goToList}/>)
        }
        const { open } = this.state;
       
        return (
            <div>
                <div className="custom-padding-10 custom-right">
                  <Button type="button" onClick={this.onOpenModal}>Add Project</Button>
                </div>
                <div>
                {this.state.projectsList.map((item, i) => {
                  return (<div className="project-line" onClick={() => { this.gotoProjectDetail(item.id) }} key={i}>
                            <div>
                              Name: {item.name}
                              <br/>
                              Date: {item.date}
                              
                            </div>
                            <hr/>
                          </div>)
                  })
                }

                <Modal open={open} onClose={this.onCloseModal} 
                  classNames={{
                    modal: "customModal",
                  }}>
                  <CreateProject closeModal={this.onCloseModal} />
                </Modal>

                </div>
            </div>
        );
      }
}
