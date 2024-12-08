import { FC, useEffect } from 'react'

import '../assets/css/appealsPage.css'
import BasePage from './BasePage'
import { useDispatch } from 'react-redux'
import { fetchAppealsList, useAppeals, useUser } from '../slices/dataSlice'
import { ROUTE_LABELS } from '../modules/Routes'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { AppDispatch } from '../store'
import AppealCard from '../components/AppealCard'

const AppealsPage: FC = () => {

    const dispatch: AppDispatch = useDispatch()

    const user = useUser()
    const appeals = useAppeals()

    const getData = async () => {
        dispatch(fetchAppealsList())
    }

    useEffect(() => {
        getData()
    }, [])
    
    const getStatusById = (id: number | undefined) => {
        switch (id) {
            case 1: return 'Черновая'
            case 2: return 'Отменена'
            case 3: return 'Оформлена'
            case 4: return 'Отклонена'
            case 5: return 'Выполнена'
            default: return 'Неизвестный статус'
        }
    }

    return (
        <BasePage>
            <BreadCrumbs crumbs={[
                    {
                        label: ROUTE_LABELS.APPEALS
                    }
            ]}></BreadCrumbs>
            <div className='container-fluid d-flex flex-column justify-content-center mt-5 border shadow shadow-bg p-3 w-75'>
                <h3>Мои жалобы</h3>
                <div className='d-flex flex-column gap-3'>
                    {appeals?.length === 0 ? <h5>У вас нет жалоб</h5> : appeals?.map((appeal, index) => {
                        if (appeal.client != user?.username)
                            return
                        return (
                            <AppealCard id={appeal.id as number} status={getStatusById(appeal.status_id)} average_work_time={appeal.average_work_time as number} time_created={appeal.time_created as string} time_applied={appeal.time_applied as string} time_ended={appeal.time_ended as string}></AppealCard>
                        )
                    })}
                </div>
            </div>
        </BasePage>
    )
}

export default AppealsPage