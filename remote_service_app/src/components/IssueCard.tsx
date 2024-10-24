import { FC } from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface IIssueCardProps {
    title: string
    imageUrl: string
}

const IssueCard: FC<IIssueCardProps> = (
    { title, imageUrl }
) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title>{title}</Card.Title>
                <div className='d-flex flex-grow-1'>
                    <Button className='align-self-end' variant="outline-danger">Подробнее</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default IssueCard