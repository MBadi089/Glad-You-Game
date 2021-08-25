import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import LoginForm from '../Login';
import SignUpForm from '../Signup';
import Auth from '../../utils/auth';
import "./nav.css";
import logo from './logo.png';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    // <div style={{display: 'flex', justifyContent: 'space-between'}}>
    //   <div>
    //     App Name
    //   </div>
    //   <LoginForm/>
    //   {/* <div>
    //     Login
    //   </div> */}
    // </div>
    <>

    <Navbar bg='primary' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            {/* <img class="logo" src={logo} alt="logo"></img> */}
            <img src={logo} alt="logo"></img>Glad You Game 
          </Navbar.Brand>
          
          
          {/* <Navbar.Toggle aria-controls='navbar' /> */}
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              {/* <Nav.Link as={Link} to='/'>
                Search
              </Nav.Link> */}
              {/* if user is logged in show saved games and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved' className="nav-link">
                    Saved Games
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout} className="nav-link">Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link className="nav-link" onClick={() => setShowModal(true)}>Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* set modal data up */}
      <Modal
        className="modal"
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>

    </>
  );
};

export default AppNavbar;