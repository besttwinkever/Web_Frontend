import { FC, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';
import { fetchAppealIssuesCreate, useAppealIssues, useUser } from '../slices/dataSlice';
import { useDispatch } from 'react-redux';
import { AppealIssues } from '../api/Api';
import { AppDispatch } from '../store';

interface IIssueCardProps {
    id: number
    title: string
    imageUrl: string
}

const IssueCard: FC<IIssueCardProps> = (
    { id, title, imageUrl }
) => {

    const user = useUser()
    const dispatch: AppDispatch = useDispatch()
    const appealIssues = useAppealIssues()

    const handleAdd = async () => {
        dispatch(fetchAppealIssuesCreate(id))
    }

    useEffect(() => {
        let found = false;
        appealIssues.forEach((appealIssue) => {
            if ((appealIssue as AppealIssues).issue.id === id) {
                found = true
            }
        })
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
                    <Button variant="outline-danger" className='add-button w-100' hidden={user == null} onClick={handleAdd}>Добавить</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default IssueCard