import { FC } from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';

interface IIssueCardProps {
    id: number
    title: string
    imageUrl: string
}

const IssueCard: FC<IIssueCardProps> = (
    { id, title, imageUrl }
) => {
    return (
        <Card className='shadow shadow-bg' style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imageUrl || '/src/assets/img/unknown.jpg'} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title>{title}</Card.Title>
                <div className='d-flex flex-grow-1'>
                    <Link className='align-self-end' to={`${ROUTES.ISSUES}/${id}`}>
                        <Button variant="outline-danger">Подробнее</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default IssueCard