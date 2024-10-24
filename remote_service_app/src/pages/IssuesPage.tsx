import { FC, useEffect, useState } from 'react'

import { IIssue, getIssuesByName } from '../modules/serviceApi'

import ServiceNavbar from '../components/ServiceNavbar'
import IssueCard from '../components/IssueCard'

import '../assets/styles/IssuesPage.css'

const IssuesPage: FC = () => {

    const [issues, setIssues] = useState<IIssue[]>([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        getIssuesByName('').then((response) => {
            setIssues(response.issues)
        })
    }, [])

    const handleSearch = () => {

    }

    return (
        <>
            <ServiceNavbar></ServiceNavbar>
            <div className='d-flex flex-column mt-5 content-fluid'>
                <div className='d-flex w-100'>
                    <div className='d-flex justify-content-center w-100'>
                        {/* <InputField */}
                        <input type='text' className='search' placeholder='Введите название происшествия'></input>
                        {/* <button className='btn btn-outline-danger ms-3'>Поиск</button> */}
                    </div>
                    <div className='d-flex flex-grow-1 appeal-content'>
                        <img src='/src/assets/img/appeal-empty.svg' className='appeal-img' alt='appeal'></img>
                    </div>
                </div>
                <div className='d-flex gap-5 mx-4 mt-5'>
                    {issues.map((issue) => {
                        return (
                            <IssueCard
                                key={issue.id}
                                title={issue.name}
                                imageUrl={issue.image}
                            ></IssueCard>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default IssuesPage