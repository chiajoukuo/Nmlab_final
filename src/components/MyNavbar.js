import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
} from 'reactstrap';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { IoLogoGithub } from "react-icons/io";
import UploadButton from './UploadButton';
import '../css/style.css'

class MyNavbar extends Component {
    state = {
      isOpen: false
    }
  
    toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  
    render() {
      //const { isAuthenticated, user } = this.props.auth;
  
    //   const authLinks = (
    //     <Fragment>
    //       <NavItem>
    //         <span className="navbar-text mr-3">
    //           <strong>{user ? `Welcome ${user.name}` : ''}</strong>
    //         </span>
    //       </NavItem>
    //       <NavItem>
    //         <Logout history={this.props.history} />
    //       </NavItem>
    //     </Fragment>
    //   )
  
      return (
        <div className='navbar_div'>
          <Navbar color="dark" dark expand="sm"  >
            <Container>
              <NavbarBrand href='/home'>Home</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  
                    {/* <Fragment>
                      <NavItem>
                        <NavLink href="/" style={{ fontSize: "1.2rem" }}>Upload</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/app" style={{ fontSize: "1.2rem" }}>Calendar</NavLink>
                      </NavItem>
                    </Fragment>
                     */}
                  
                </Nav>
                <Nav className='ml-auto' navbar>
                  {/* {isAuthenticated ? authLinks : null} */}
                  <NavItem>
                    <NavLink href="/new_post" style={{ fontSize: "1.2rem" }}>Post</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/upload" style={{ fontSize: "1.2rem" }}>Upload</NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink href="/login" style={{ fontSize: "1.2rem" }}>Logout</NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink href="/profile">
                      <IoLogoGithub size={25} />
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader onClick={this.toggle}>Upload Image</ModalHeader>
              <ModalBody>
                  upload information.
              </ModalBody>
          </Modal>
        </div>
      );
    }
  }
  

  
  export default MyNavbar;