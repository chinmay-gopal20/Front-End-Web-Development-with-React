import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron, Nav, NavbarToggler, Collapse, NavItem, 
  Modal, ModalHeader, ModalBody, FormGroup, Form, Button, Label, Input } from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    }
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav(){
    this.setState({
        isNavOpen: !this.state.isNavOpen
      })
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleLogin(event){
    this.toggleModal()
    alert("Username - " + this.username.value + ", Password - " + this.password.value + ", Remember me - " + this.remember.checked);
    event.preventDefault()  
  }

  render() {
    return(
    <React.Fragment>
      <Navbar dark expand="md">
        <div className="container">
            <NavbarBrand className="ms-auto" href="/">
              <img src="/assets/images/logo.png" width="40" height="30" alt="Restaurant ConFusion" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg">Home</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg">About US</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg">menu</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-book fa-lg">Contact Us</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg"></span>Login
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
        </div>
      </Navbar>
      <Jumbotron>
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-6">
                       <h1>Ristorante con Fusion</h1>
                       <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                   </div>
               </div>
           </div>
      </Jumbotron>
      <Modal toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleLogin}>
            <FormGroup>
              <Label htmlFor="username">User Name</Label>
              <Input type="text" id="username" name="username" innerRef={(input) => this.username = input}></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" innerRef={(input) => this.password = input}></Input>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="remember" innerRef={(input) => this.remember = input}></Input>Remember me
              </Label>
            </FormGroup>
            <Button type="submit"  value="submit" color="primary">Login in</Button>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
    );
  }
}

export default Header;