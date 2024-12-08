import { FC } from 'react'

import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';

interface IAppealCardProps {
    id: number
    status: string
    time_created: string
    time_applied: string
    time_ended: string
    average_work_time: number
}

const AppealCard: FC<IAppealCardProps> = (
    { id, status, time_created, time_applied, time_ended, average_work_time }
) => {

    return (
        <Link to={`${ROUTES.APPEAL}/${id}`}>
            <Card className='shadow shadow-bg w-100' >
                <Card.Body className='d-flex flex-column'>
                    <Card.Title style={{fontSize: '2em'}}>{`Обращение №${id}`}</Card.Title>
                    <div className='d-flex flex-column w-100 h-100 flex-grow justify-content-end'>
                        <Card.Text className='appeal-text'>{`Статус: ${status}`}</Card.Text>
                        <Card.Text className='appeal-text'>{`Время создания: ${time_created != null ? time_created : '-'}`}</Card.Text>
                        <Card.Text className='appeal-text'>{`Время оформления: ${time_applied != null ? time_applied : '-'}`}</Card.Text>
                        <Card.Text className='appeal-text'>{`Время завершения: ${time_ended != null ? time_ended : '-'}`}</Card.Text>
                        <Card.Text className='appeal-text'>{`Среднее время работы: ${average_work_time}`}</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default AppealCard