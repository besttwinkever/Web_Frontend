import { FC, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

import { IIssue, getIssueById } from '../modules/serviceApi'
import { ISSUES_MOCK } from '../modules/mock'

import ServiceNavbar from '../components/ServiceNavbar'

import '../assets/css/issuePage.css'
import { BreadCrumbs } from '../components/BreadCrumbs'

const IssuePage: FC = () => {

    const [issue, setIssue] = useState<IIssue>({
        id: 0,
        name: 'Происшествие',
        description: '',
        image: ''
    })

    const { id } = useParams()

    useEffect(() => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return

        getIssueById(id_numeric).then((response) => {
            setIssue(response)
        }).catch(() => {
            let found = false;
            ISSUES_MOCK.issues.forEach((issue) => {
                if (issue.id === id_numeric) {
                    found = true;
                    return setIssue(issue)
                }
            })
            if (!found)
                setIssue(ISSUES_MOCK.issues[0])
        })
    }, [])

    return (
        <>
            <ServiceNavbar/>
            <BreadCrumbs crumbs={[
                {
                    label: 'Виды происшествий',
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