import { FC, useEffect, useState } from 'react'

import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import BasePage from './BasePage'
import { useDispatch } from 'react-redux'
import { setErrorBoxStatusAction, setErrorBoxTextAction, setLoaderStatusAction, setUserAction, useUser } from '../slices/dataSlice'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'
import { ROUTE_LABELS, ROUTES } from '../modules/Routes'
import { BreadCrumbs } from '../components/BreadCrumbs'


const ProfilePage: FC = () => {

    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    
    const user = useUser()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdate = async () => {
        dispatch(setLoaderStatusAction(true))
        await api.user.userUpdate({
            email: email,
            username: login,
        }).then((response) => {
            dispatch(setUserAction(response.data))
            navigate(ROUTES.HOME)
        }).catch(() => {
            dispatch(setErrorBoxTextAction('Ошибка при редактировании профиля'))
            dispatch(setErrorBoxStatusAction(true))
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })
    }

    useEffect(() => {
        if (user == null) return
        setEmail(user.email)
        setLogin(user.username)
    }, [])

    return (
        <BasePage>
            <BreadCrumbs crumbs={[
                {
                    label: ROUTE_LABELS.PROFILE
                }
            ]}></BreadCrumbs>
            <div className='container d-flex flex-column justify-content-center mt-5 border shadow shadow-bg p-3 w-25 bg-white'>
                <h3 className='text-uppercase text-center'>Редактирование профиля</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Почта</Form.Label>
                        <Form.Control type='text' placeholder='Введите почту' value={email} onChange={(event) => {setEmail(event.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='my-3'>Логин</Form.Label>
                        <Form.Control type='text' placeholder='Введите логин' value={login} onChange={(event) => {setLogin(event.target.value)}}></Form.Control>
                    </Form.Group>
                    <Button className='w-100 mt-3' variant='outline-danger' onClick={handleUpdate}>Изменить</Button>
                </Form>
            </div>
        </BasePage>
    )
}

export default ProfilePage