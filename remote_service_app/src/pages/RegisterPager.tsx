import { FC, useState } from 'react'

import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import BasePage from './BasePage'
import { useDispatch } from 'react-redux'
import { setErrorBoxStatusAction, setErrorBoxTextAction, setLoaderStatusAction } from '../slices/dataSlice'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../modules/Routes'

const LoginPage: FC = () => {

    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = async () => {
        if (password != repeatPassword || password == '') {
            dispatch(setErrorBoxTextAction('Пароли не совпадают'))
            return dispatch(setErrorBoxStatusAction(true))
        }
        dispatch(setLoaderStatusAction(true))
        await api.user.userRegisterCreate({
            email: email,
            username: login,
            password: password,
        }).then(() => {
            navigate(ROUTES.LOGIN)
        }).catch((error) => {
            dispatch(setErrorBoxTextAction(error.response.data.status))
            dispatch(setErrorBoxStatusAction(true))
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })
    }

    return (
        <BasePage>
            <div className='container d-flex flex-column justify-content-center mt-5 border shadow shadow-bg p-3 w-25 bg-white'>
                <h3 className='text-uppercase text-center'>Регистрация</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Почта</Form.Label>
                        <Form.Control type='text' placeholder='Введите почту' value={email} onChange={(event) => {setEmail(event.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='my-3'>Логин</Form.Label>
                        <Form.Control type='text' placeholder='Введите логин' value={login} onChange={(event) => {setLogin(event.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-3'>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type='password' placeholder='Введите пароль' value={password} onChange={(event) => {setPassword(event.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-3'>
                        <Form.Label>Повторите пароль</Form.Label>
                        <Form.Control type='password' placeholder='Введите пароль повторно' value={repeatPassword} onChange={(event) => {setRepeatPassword(event.target.value)}}></Form.Control>
                    </Form.Group>
                    <Button className='w-100' variant='outline-danger' onClick={handleRegister}>Зарегистрироваться</Button>
                </Form>
            </div>
        </BasePage>
    )
}

export default LoginPage