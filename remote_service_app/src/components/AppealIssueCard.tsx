import { FC, useState } from 'react'

import Button from 'react-bootstrap/Button';
import '../assets/css/appealPage.css'
import { fetchChangeIssueCount, fetchDeleteAppealIssue, useActiveAppeal } from '../slices/dataSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

interface IIssueCardProps {
    id: number
    appealId: number
    title: string
    imageUrl: string
    count: number
}

const AppealIssueCard: FC<IIssueCardProps> = (
    { id, title, imageUrl, count, appealId }
) => {

    const [_count, setCount] = useState(count)

    const activeAppeal = useActiveAppeal()
    const dispatch: AppDispatch = useDispatch()

    const editHandler = async () => {
        dispatch(fetchChangeIssueCount({id: id, count: _count}))
    }

    const deleteHandler = async () => {
        dispatch(fetchDeleteAppealIssue(id))
    }

    return (
        <div className='d-flex gap-4 shadow shadow-bg border border-light rounded-left rounded-right bg-white'>
            <div className='appeal-issue-card-image w-50'>
                <img src={imageUrl}></img>
            </div>
            <div className='d-flex w-75 justify-content-center align-items-center text-center text-uppercase'>
                <h3>{title}</h3>
            </div>
            <div className='separator'></div>
            <div className='d-flex flex-column p-2 justify-content-center align-items-center'>
                <div className='d-flex flex-column gap-2'>
                    <div className='d-flex gap-2'>
                        <input style={{width: '5em', textAlign: 'center'}} type='number' value={_count} onChange={(event) => {setCount(Number.parseInt(event.target.value))}} disabled={activeAppeal.id != appealId}></input>
                        <Button style={{width: '10.5em'}} variant="outline-danger" className='details-button' disabled={activeAppeal.id != appealId} onClick={editHandler}>Изменить</Button>
                    </div>
                    <Button style={{width: '16em'}} variant="outline-danger" className='details-button' disabled={activeAppeal.id != appealId} onClick={deleteHandler}>Удалить</Button>
                </div>
            </div>
        </div>
    )
}

export default AppealIssueCard