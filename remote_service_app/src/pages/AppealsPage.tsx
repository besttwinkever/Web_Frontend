import { FC, useEffect, useState } from 'react'

import BasePage from './BasePage'
import { Button, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setErrorBoxStatusAction, setErrorBoxTextAction, setLoaderStatusAction, useUser } from '../slices/dataSlice'
import { api } from '../api'
import { Appeal } from '../api/Api'
import { Link } from 'react-router-dom'
import { ROUTES } from '../modules/Routes'

const AppealsPage: FC = () => {

    const dispatch = useDispatch()

    const [appeals, setAppeals] = useState<Appeal[]>([])
    const user = useUser()

    const getData = async () => {
        dispatch(setLoaderStatusAction(true))
        api.appeals.appealsList().then((respponse) => {
            setAppeals(respponse.data)
        }).catch(() => {
            dispatch(setErrorBoxTextAction('Ошибка при загрузке данных'))
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

    return (
        <BasePage>
            <div className='container-fluid d-flex flex-column justify-content-center mt-5 border shadow shadow-bg p-3 w-75'>
                <h3>Мои обращения</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>№ обращения</th>
                            <th>Статус заявки</th>
                            <th>Сотрудник поддержки</th>
                            <th>Время создания</th>
                            <th>Время оформления</th>
                            <th>Время завершения</th>
                            <th>Среднее время работы</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody style={{fontFamily: 'circeregular', textAlign: 'center'}}>
                        {appeals.map((appeal) => {
                            if (user != null && appeal.client == user.username)
                            return (
                                <tr key={appeal.id}>
                                    <td>{appeal.id}</td>
                                    <td>{getStatusById(appeal.status_id as number)}</td>
                                    <td>{appeal.helper == null ? '-' : appeal.helper}</td>
                                    <td>{appeal.time_created == null ? '-' : appeal.time_created}</td>
                                    <td>{appeal.time_applied == null ? '-' : appeal.time_applied}</td>
                                    <td>{appeal.time_ended == null ? '-' : appeal.time_ended}</td>
                                    <td>{appeal.average_work_time == 0 ? '-' : appeal.average_work_time}</td>
                                    <td>
                                        <Link to={`${ROUTES.APPEAL}/${appeal.id}`}>
                                            <Button variant='outline-danger'>Детали</Button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </BasePage>
    )
}

export default AppealsPage