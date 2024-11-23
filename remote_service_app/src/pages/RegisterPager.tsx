import { FC, useState } from 'react'

import ServiceNavbar from '../components/ServiceNavbar'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import Loader from '../components/Loader'

const LoginPage: FC = () => {

    const [loaderStatus, setLoaderStatus] = useState(false)

    return (
        <>
            <Loader visible={loaderStatus}></Loader>
            <ServiceNavbar></ServiceNavbar>
            <div className='container d-flex flex-column justify-content-center mt-5 border shadow shadow-bg p-3 w-25 bg-white'>
                <h3 className='text-uppercase text-center'>Регистрация</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Почта</Form.Label>
                        <Form.Control type='text' placeholder='Введите почту'></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='my-3'>Логин</Form.Label>
                        <Form.Control type='text' placeholder='Введите логин'></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-3'>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type='password' placeholder='Введите пароль'></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-3'>
                        <Form.Label>Повторите пароль</Form.Label>
                        <Form.Control type='password' placeholder='Введите пароль повторно'></Form.Control>
                    </Form.Group>
                    <Button className='w-100' variant='outline-danger' onClick={() => {setLoaderStatus(!loaderStatus)}}>Зарегистрироваться</Button>
                </Form>
            </div>
        </>
    )
}

export default LoginPage