import { FC, useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';
import { setActiveAppealAction, setAppealIssuesAction, setErrorBoxStatusAction, setErrorBoxTextAction, setLoaderStatusAction, useAppealIssues, useUser } from '../slices/dataSlice';
import { useDispatch } from 'react-redux';
import { api } from '../api';
import { AppealIssues } from '../api/Api';

interface IIssueCardProps {
    id: number
    title: string
    imageUrl: string
}

const IssueCard: FC<IIssueCardProps> = (
    { id, title, imageUrl }
) => {

    const user = useUser()
    const dispatch = useDispatch()
    const appealIssues = useAppealIssues()

    const [isAdded, setIsAdded] = useState(false)

    const handleAdd = async () => {
        dispatch(setLoaderStatusAction(true))
        await api.appealIssues.appealIssuesCreate(id.toString()).then((response) => {
            dispatch(setActiveAppealAction(response.data.active_appeal))
            dispatch(setAppealIssuesAction(response.data.appeal_issues))
        }).catch(() => {
            dispatch(setErrorBoxTextAction('Ошибка при добавлении обращения'))
            dispatch(setErrorBoxStatusAction(true))
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })
    }

    useEffect(() => {
        let found = false;
        appealIssues.forEach((appealIssue) => {
            if ((appealIssue as AppealIssues).issue.id === id) {
                found = true
            }
        })
        setIsAdded(found)
    }, [appealIssues])

    return (
        <Card className='shadow shadow-bg'>
            <Card.Img variant="top" src={imageUrl || '/src/assets/img/unknown.jpg'} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title>{title}</Card.Title>
                <div className='d-flex flex-column gap-1 w-100 h-100 flex-grow justify-content-end'>
                    <Link className='w-100' to={`${ROUTES.ISSUES}/${id}`}>
                        <Button variant="outline-danger" className='details-button w-100'>Подробнее</Button>
                    </Link>
                    <Button variant="outline-danger" className='add-button w-100' hidden={user == null} disabled={isAdded} onClick={handleAdd}>Добавить</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default IssueCard