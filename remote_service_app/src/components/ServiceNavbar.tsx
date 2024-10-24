import { FC } from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const ServiceNavbar: FC = () => {

    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow shadow-bg nav">
            <Navbar.Brand href="/" className='text-uppercase'>Главная</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/issues">Виды происшествий</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default ServiceNavbar