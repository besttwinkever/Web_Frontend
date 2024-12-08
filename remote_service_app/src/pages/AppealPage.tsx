import { FC, useEffect, useState } from 'react'

import '../assets/css/appealPage.css'

import BasePage from './BasePage'
import { Button, Form, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { fetchAppealById, fetchCancelAppeal, fetchConfirmAppeal, fetchSaveConnectionCode, useActiveAppeal, useAppeal } from '../slices/dataSlice'
import { useNavigate, useParams } from 'react-router-dom'
import AppealIssueCard from '../components/AppealIssueCard'
import { ROUTE_LABELS, ROUTES } from '../modules/Routes'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { AppDispatch } from '../store'

const AppealPage: FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const { id } = useParams()

    const [connectionCode, setConnectionCode] = useState('')
    const navigate = useNavigate()
    const appeal = useAppeal()
    const activeAppeal = useActiveAppeal()

    const getData = async () => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return
        dispatch(fetchAppealById(id_numeric))
    }

    useEffect(() => {
        getData()
    }, [])

    const getStatusById = (id: number) => {
        switch (id) {
            case 1: return 'Черновая'
            case 2: return 'Отменена'
            case 3: return 'Оформлена'
            case 4: return 'Отклонена'
            case 5: return 'Выполнена'
            default: return 'Неизвестный статус'
        }
    }

    const handleSaveConnectionCode = async () => {
        if (!id) return
        dispatch(fetchSaveConnectionCode({id: parseInt(id), connectionCode: connectionCode}))
    }

    const confirmHandler = async () => {
        if (!id) return
        dispatch(fetchConfirmAppeal(parseInt(id))).then((unwrapResult) => {
            if (unwrapResult.type.endsWith('fulfilled')) {
                navigate(ROUTES.APPEALS)
            }
        })
    }

    const cancelHandler = async () => {
        if (!id) return
        dispatch(fetchCancelAppeal(parseInt(id))).then((unwrapResult) => {
            if (unwrapResult.type.endsWith('fulfilled')) {
                navigate(ROUTES.APPEALS)
            }
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
                        label: `Жалоба №${appeal?.id}`
                    }
            ]}></BreadCrumbs>
            <div className='container-fluid d-flex flex-column justify-content-center shadow-bg p-4 w-100 gap-3'>
                <h1 className='text-uppercase'>Жалоба №{appeal?.id}</h1>
                <div hidden={activeAppeal.id != appeal?.id}>
                    <div className='action-container d-flex flex-column gap-2'>
                        <Form className='shadow-bg'>
                            <Form.Group>
                                <Form.Label>Код подключения</Form.Label>
                                <div className='d-flex gap-3'>
                                    <Form.Control value={connectionCode} onChange={(event) => {setConnectionCode(event.target.value)}} type='text' placeholder='Введите код подключения'></Form.Control>
                                    <Button variant='outline-danger' onClick={handleSaveConnectionCode}>Сохранить</Button>
                                </div>
                            </Form.Group>
                        </Form>
                        <Button variant='outline-danger' className='big-button' onClick={confirmHandler}>Оформить</Button>
                        <Button variant='outline-danger' className='big-button' onClick={cancelHandler}>Отменить</Button>
                    </div>
                </div>
                <div hidden={activeAppeal.id == appeal?.id}>
                    <div className='d-flex flex-column w-50' >
                        <h3>Дополнительная информация</h3>
                        <Table className='shadow shadow-bg border'>
                            <tbody style={{fontFamily: 'circeregular'}}>
                                <tr>
                                    <td>Код подключения</td>
                                    <td>{appeal?.connection_code}</td>
                                </tr>
                                <tr>
                                    <td>Агент удаленной поддержки</td>
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
                <div className='d-flex gap-5'>
                    <div className='d-flex flex-column gap-3 w-50 mt-3'>
                        <h3>Неисправности</h3>
                        {appeal?.issues?.map((issue) => {
                            if (issue.issue.id != null && issue.issue.image != null)
                                return <AppealIssueCard id={issue.issue.id} count={issue.count} title={issue.issue.name} imageUrl={issue.issue.image} appealId={appeal != null && appeal.id != null ? appeal?.id : -1}></AppealIssueCard>
                        })}
                    </div>
                </div>
            </div>
        </BasePage>
    )
}

export default AppealPage