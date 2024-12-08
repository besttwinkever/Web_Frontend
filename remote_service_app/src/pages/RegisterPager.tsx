import { FC, useState } from 'react'

import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import BasePage from './BasePage'
import { useDispatch } from 'react-redux'
import { fetchRegister, setErrorBoxStatusAction, setErrorBoxTextAction } from '../slices/dataSlice'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../modules/Routes'
import { AppDispatch } from '../store'


const LoginPage: FC = () => {

    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = async () => {
        if (password != repeatPassword || password == '') {
            dispatch(setErrorBoxTextAction('Пароли не совпадают'))
            return dispatch(setErrorBoxStatusAction(true))
        }
        dispatch(fetchRegister({email: email, login: login, password: password})).then((unwrapResult) => {
            if (unwrapResult.type.endsWith('fulfilled'))
                navigate(ROUTES.LOGIN)
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