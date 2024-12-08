import { FC, useEffect } from 'react'
import { useParams } from "react-router-dom"

import ServiceNavbar from '../components/ServiceNavbar'

import '../assets/css/issuePage.css'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { useDispatch } from 'react-redux'
import { fetchIssueById, useIssue } from '../slices/dataSlice'
import { ROUTE_LABELS} from '../modules/Routes'
import { AppDispatch } from '../store'

const IssuePage: FC = () => {

    const { id } = useParams()
    const dispatch: AppDispatch = useDispatch()
    const issue = useIssue()

    useEffect(() => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return

        const getDetails = async (id: number) => {
            dispatch(fetchIssueById(id))
        }

        getDetails(id_numeric)
    }, [])

    return (
        <>
            <ServiceNavbar/>
            <BreadCrumbs crumbs={[
                {
                    label: ROUTE_LABELS.ISSUES,
                    path: '/issues'
                },
                {
                    label: issue?.name
                }
            ]}></BreadCrumbs>
            <div className='d-flex flex-column ms-4 content-fluid'>
               <h2 className='text-uppercase'>{issue?.name}</h2>
               <div className='issue-details container-fluid mt-3'>
                    <div className='p-0'>
                        <div className='appeal-img-bg'>
                            <img src={issue?.image} className='appeal-img' alt='appeal'></img>
                        </div>
                    </div>
                    <div className='issue-details-description mt-2'>
                        <p>{issue?.description}</p>
                    </div>
               </div>
            </div>
        </>
    )
}

export default IssuePage