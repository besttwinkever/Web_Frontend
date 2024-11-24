import { FC, useState } from 'react'

import Button from 'react-bootstrap/Button';
import '../assets/css/appealPage.css'
import { setErrorBoxStatusAction, setErrorBoxTextAction, setLoaderStatusAction, useActiveAppeal } from '../slices/dataSlice';
import { useDispatch } from 'react-redux';
import { api } from '../api';

interface IIssueCardProps {
    id: number
    appealId: number
    title: string
    imageUrl: string
    count: number
    onDelete: () => void
}

const AppealIssueCard: FC<IIssueCardProps> = (
    { id, title, imageUrl, count, appealId, onDelete }
) => {

    const [_count, setCount] = useState(count)

    const activeAppeal = useActiveAppeal()
    const dispatch = useDispatch()

    const editHandler = async () => {
        dispatch(setLoaderStatusAction(true))
        await api.appealIssues.appealIssuesUpdate(id.toString(), {
            count: _count
        }).then((response) => {
            setCount(response.data.count)
        }).catch(() => {
            dispatch(setErrorBoxTextAction('Не смогли изменить количество происшествия'))
            dispatch(setErrorBoxStatusAction(true))
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })
    }

    const deleteHandler = async () => {
        dispatch(setLoaderStatusAction(true))
        await api.appealIssues.appealIssuesDelete(id.toString()).then(() => {
            onDelete()
        }).catch(() => {
            dispatch(setErrorBoxTextAction('Не смогли удалить происшествие'))
            dispatch(setErrorBoxStatusAction(true))
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })
    }

    return (
        <div className='d-flex gap-4 shadow shadow-bg border'>
            <div className='appeal-issue-card-image'>
            <   img src={imageUrl}></img>
            </div>
            <div className='d-flex flex-column p-2 w-100 bg-white'>
                <h3>{title}</h3>
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