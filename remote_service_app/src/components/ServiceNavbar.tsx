import { FC } from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../modules/Routes'

import '../assets/css/ServiceNavbar.css'

import { setErrorBoxStatusAction, setErrorBoxTextAction, setLoaderStatusAction, setUserAction, useUser } from '../slices/dataSlice'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { api } from '../api';

const ServiceNavbar: FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useUser()

    const handleLogout = async () => {
        dispatch(setLoaderStatusAction(true))
        await api.user.userLogoutCreate().then(() => {
            dispatch(setUserAction(null))
            navigate(ROUTES.HOME)
        }).catch(() => {
            dispatch(setErrorBoxStatusAction(true))
            dispatch(setErrorBoxTextAction('Ошибка при выходе из системы'))
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow shadow-bg nav">
            <Navbar.Brand as={Link} to={ROUTES.HOME} className='text-uppercase'>Главная</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to={ROUTES.ISSUES}>Виды происшествий</Nav.Link>
                <div style={user == null ? {display: 'none'} : {}}>
                    <Nav.Link as={Link} to={ROUTES.APPEALS}>Мои обращения</Nav.Link>
                </div>
            </Nav>
            <div style={user != null ? {display: 'none'} : {}}>
                <div className='d-flex gap-2 me-3'>
                    <Link to={ROUTES.LOGIN}>
                        <Button variant='outline-danger' className='text-uppercase'>Войти</Button>
                    </Link>
                    <Link to={ROUTES.REGISTER}>
                        <Button variant='outline-danger' className='text-uppercase'>Регистрация</Button>
                    </Link>
                </div>
            </div>
            <div style={user == null ? {display: 'none'} : {}}>
                <div className='d-flex gap-4 me-3'>
                    <Link style={{color: 'black'}} to={ROUTES.PROFILE} className='mt-2'>{user != null ? user?.username : ''}</Link>
                    <Button variant='outline-danger' className='text-uppercase' onClick={handleLogout}>Выйти</Button>
                </div>
            </div>
            
            </Navbar.Collapse>
        </Navbar>
    )
}

export default ServiceNavbar