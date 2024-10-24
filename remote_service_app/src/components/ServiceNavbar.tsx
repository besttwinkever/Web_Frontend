import { FC } from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes'

import '../assets/css/ServiceNavbar.css'

const ServiceNavbar: FC = () => {

    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow shadow-bg nav">
            <Navbar.Brand as={Link} to={ROUTES.HOME} className='text-uppercase'>Главная</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to={ROUTES.ISSUES}>Виды происшествий</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default ServiceNavbar