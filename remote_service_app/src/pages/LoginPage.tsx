import { FC, useState } from 'react'

import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import BasePage from './BasePage'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '../slices/dataSlice'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../modules/Routes'
import { AppDispatch } from '../store'

const LoginPage: FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = async () => {
        dispatch(fetchLogin({login: login, password: password})).then((unwrapResult) => {
            if (unwrapResult.type.endsWith('fulfilled')) {
                navigate(ROUTES.HOME)
            }
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