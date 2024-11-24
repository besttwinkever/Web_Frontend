import { FC, useEffect, useState } from 'react'

import BasePage from './BasePage'
import { Button, Form, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setActiveAppealAction, setErrorBoxStatusAction, setErrorBoxTextAction, setLoaderStatusAction, useActiveAppeal } from '../slices/dataSlice'
import { api } from '../api'
import { Appeal } from '../api/Api'
import { useNavigate, useParams } from 'react-router-dom'
import AppealIssueCard from '../components/AppealIssueCard'
import { ROUTE_LABELS, ROUTES } from '../modules/Routes'
import { BreadCrumbs } from '../components/BreadCrumbs'

const AppealPage: FC = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    const [appeal, setAppeal] = useState<Appeal>()
    const [connectionCode, setConnectionCode] = useState('')
    const activeAppeal = useActiveAppeal()
    const navigate = useNavigate()

    const getData = async () => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return

        dispatch(setLoaderStatusAction(true))
        await api.appeals.appealsRead(id).then((response) => {
            setAppeal(response.data)
            setConnectionCode(response.data.connection_code)
        }).catch(() => {
            dispatch(setErrorBoxTextAction('Не смогли получить информацию об обращении'))
            dispatch(setErrorBoxStatusAction(true))
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const getStatusById = (id: number) => {
        switch (id) {
            case 1: return 'Черновое'
            case 2: return 'Отменено'
            case 3: return 'Создано'
            case 4: return 'Отклонено'
            case 5: return 'Выполнено'
            default: return 'Неизвестный статус'
        }
    }

    const onDelete = () => {
        getData()
    }

    const handleSaveConnectionCode = async () => {
        if (!id) return

        dispatch(setLoaderStatusAction(true))
        await api.appeals.appealsUpdate(id, {
            connection_code: connectionCode
        }).then(() => {
            // all is ok
        }).catch(() => {
            dispatch(setErrorBoxTextAction('Не смогли обновить код подключения'))
            dispatch(setErrorBoxStatusAction(true))
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })
    }

    const confirmHandler = async () => {
        if (!id) return

        dispatch(setLoaderStatusAction(true))
        await api.appeals.appealsConfirmUpdate(id).then(() => {
            dispatch(setActiveAppealAction({id: null, count: 0}))
            navigate(ROUTES.HOME)
        }).catch((error) => {
            dispatch(setErrorBoxTextAction(error.response.data.error))
            dispatch(setErrorBoxStatusAction(true))
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })
    }

    const cancelHandler = async () => {
        if (!id) return

        dispatch(setLoaderStatusAction(true))
        await api.appeals.appealsDelete(id).then(() => {
            navigate(ROUTES.HOME)
        }).catch(() => {
            dispatch(setErrorBoxTextAction('Не смогли оформить обращение'))
            dispatch(setErrorBoxStatusAction(true))
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })
    }

    return (
        <BasePage>
            <BreadCrumbs crumbs={[
                    {
                        label: ROUTE_LABELS.APPEALS,
                        path: ROUTES.APPEALS
                    },
                    {
                        label: `Обращение №${appeal?.id}`
                    }
            ]}></BreadCrumbs>
            <div className='container-fluid d-flex flex-column justify-content-center mt-5 border shadow shadow-bg p-4 w-75 gap-3'>
                <h1>Обращение №{appeal?.id}</h1>
                <div className='d-flex gap-5'>
                    <div className='d-flex flex-column gap-3 w-75'>
                        <h3>Происшествия</h3>
                        {appeal?.issues?.map((issue) => {
                            if (issue.issue.id != null && issue.issue.image != null)
                                return <AppealIssueCard id={issue.issue.id} count={issue.count} title={issue.issue.name} imageUrl={issue.issue.image} appealId={appeal != null && appeal.id != null ? appeal?.id : -1} onDelete={onDelete}></AppealIssueCard>
                        })}
                    </div>
                    <div className='w-25' hidden={activeAppeal.id != appeal?.id}>
                        <div className='d-flex flex-column gap-2' >
                            <h3>Действия</h3>
                            <Form className='shadow-bg'>
                                <Form.Group>
                                    <Form.Label>Код подключения</Form.Label>
                                    <div className='d-flex gap-3'>
                                        <Form.Control value={connectionCode} onChange={(event) => {setConnectionCode(event.target.value)}} type='text' placeholder='Введите код подключения'></Form.Control>
                                        <Button variant='outline-danger' onClick={handleSaveConnectionCode}>Сохранить</Button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <div className='d-flex gap-2 w-100'>
                                <Button variant='outline-danger' className='w-100' onClick={confirmHandler}>Оформить</Button>
                                <Button variant='outline-danger' className='w-100' onClick={cancelHandler}>Отменить</Button>
                            </div>
                        </div>
                    </div>
                    <div hidden={activeAppeal.id == appeal?.id}>
                        <div className='d-flex flex-column' >
                            <h3>Дополнительная информация</h3>
                            <Table className='shadow shadow-bg border'>
                                <tbody style={{fontFamily: 'circeregular'}}>
                                    <tr>
                                        <td>Код подключения</td>
                                        <td>{appeal?.connection_code}</td>
                                    </tr>
                                    <tr>
                                        <td>Сотрудник поддержки</td>
                                        <td>{appeal?.helper}</td>
                                    </tr>
                                    <tr>
                                        <td>Статус</td>
                                        <td>{appeal != null && appeal.status_id != null ? getStatusById(appeal.status_id) : 0}</td>
                                    </tr>
                                    <tr>
                                        <td>Время создания</td>
                                        <td>{appeal?.time_created}</td>
                                    </tr>
                                    <tr>
                                        <td>Время оформления</td>
                                        <td>{appeal?.time_applied}</td>
                                    </tr>
                                    <tr>
                                        <td>Время завершения</td>
                                        <td>{appeal?.time_ended}</td>
                                    </tr>
                                    <tr>
                                        <td>Среднее время работы</td>
                                        <td>{appeal?.average_work_time == 0 ? '-' : appeal?.average_work_time}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </BasePage>
    )
}

export default AppealPage