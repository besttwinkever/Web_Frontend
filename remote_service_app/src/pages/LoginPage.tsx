import { FC, useState } from 'react'

import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import {api} from '../api'
import BasePage from './BasePage'
import { useDispatch } from 'react-redux'
import { setLoaderStatusAction, setErrorBoxStatusAction, setErrorBoxTextAction, setUserAction } from '../slices/dataSlice'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../modules/Routes'

const LoginPage: FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = async () => {
        dispatch(setLoaderStatusAction(true))
        
        await api.user.userLoginCreate({
            username: login,
            password: password
        }).then((response) => {
            dispatch(setUserAction(response.data))
            navigate(ROUTES.HOME)
        }).catch((error) => {
            console.log(error)
            dispatch(setErrorBoxTextAction(error.response.data.error))
            dispatch(setErrorBoxStatusAction(true))
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })        
    }

    return (
        <BasePage>
            <div className='container d-flex flex-column justify-content-center mt-5 border shadow shadow-bg p-3 w-25'>
                <h3 className='text-uppercase text-center'>Аутентификация</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Логин</Form.Label>
                        <Form.Control value={login} onChange={(event) => {setLogin(event.target.value)}} type='text' placeholder='Введите логин'></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-3'>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control value={password} onChange={(event) => {setPassword(event.target.value)}} type='password' placeholder='Введите пароль'></Form.Control>
                    </Form.Group>
                    <Button className='w-100' variant='outline-danger' onClick={handleLogin}>Войти</Button>
                </Form>
            </div>
        </BasePage>
    )
}

export default LoginPage