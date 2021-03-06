import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import LoginForm from '../Login';
import SignUpForm from '../Signup';
import Auth from '../../utils/auth';
import "./nav.css";
import logo from './logo.png';
import SignupForm from '../Signup';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);

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
            {/* <img className="logo" src={logo} alt="logo"></img> */}
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
                  <Nav.Link as={Link} to='/saved'>
                    Saved Games
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                <Nav.Link onClick={() => setShowModal(true)}>Login </Nav.Link>
                <Nav.Link onClick={() => setShowModals(true)}> Signup</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}

    

        <Tab.Container defaultActiveKey='login'>
          <Row>
          <Col sm={3}>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              {/* <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav> */}
              
            </Modal.Title>
          </Modal.Header>
          </Col>
          <Col sm={9}>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              {/* <Nav.Link onClick={() => setShowModal(true)}>Login</Nav.Link>
              <Nav.Link onClick={() => setShowModal(true)}>Signup</Nav.Link> */}
              {/* <Link to="/signup"> */}
              {/* <Button onClick={() => setShowModal(true)} variant="primary">Signup</Button>{' '} */}
              {/* </Link> */}
              {/* <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane> */}
            </Tab.Content>
          </Modal.Body>
          </Col>
          </Row>
          
        </Tab.Container>
      </Modal>

      <Modal
        size='lg'
        show={showModals}
        onHide={() => setShowModals(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}

    

        <Tab.Container defaultActiveKey='login'>
          <Row>
          <Col sm={3}>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              {/* <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav> */}
              
            </Modal.Title>
          </Modal.Header>
          </Col>
          <Col sm={9}>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <SignupForm handleModalClose={() => setShowModals(false)} />
              </Tab.Pane>
              {/* <Nav.Link onClick={() => setShowModal(true)}>Login</Nav.Link>
              <Nav.Link onClick={() => setShowModal(true)}>Signup</Nav.Link> */}
              {/* <Link to="/signup"> */}
              {/* <Button onClick={() => setShowModal(true)} variant="primary">Signup</Button>{' '} */}
              {/* </Link> */}
              {/* <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane> */}
            </Tab.Content>
          </Modal.Body>
          </Col>
          </Row>
          
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;