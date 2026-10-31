import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Navbar expand="md" className="bg-white shadow-sm header py-3 sticky-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
                    Smart Learning
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <Nav.Link as={Link} to="/home" className='fw-semibold'>Home</Nav.Link>
                        <Nav.Link as={Link} to="/courses" className='fw-semibold'>All Courses</Nav.Link>
                    </Nav>
                    <div className="d-flex align-items-center gap-2">
                        {user ? (
                            <>
                                <Link to="/account/dashboard" className="btn btn-outline-primary btn-sm px-3">
                                    Dashboard
                                </Link>
                                <Link to="/account/my-courses" className="btn btn-primary btn-sm px-3">
                                    My Courses
                                </Link>
                                <button 
                                    onClick={() => {
                                        logout();
                                        navigate('/account/login');
                                    }} 
                                    className="btn btn-light btn-sm text-danger border"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/account/login" className="btn btn-outline-primary btn-sm px-3">
                                    Login
                                </Link>
                                <Link to="/account/register" className="btn btn-primary btn-sm px-3">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
