import { FC, useEffect, useState } from 'react'

import { IIssue, getIssuesByName } from '../modules/serviceApi'

import ServiceNavbar from '../components/ServiceNavbar'
import IssueCard from '../components/IssueCard'

import '../assets/css/issuesPage.css'
import InputField from '../components/InputField'

const IssuesPage: FC = () => {

    const [loading, setLoading] = useState(false)
    const [issues, setIssues] = useState<IIssue[]>([])
    const [searchValue, setSearchValue] = useState('')

    const updateIssues = () => {
        setLoading(true)
        getIssuesByName(searchValue).then((response) => {
            setIssues(response.issues)
            setLoading(false)
        })
    }

    useEffect(() => {
        updateIssues()
    }, [])

    const handleSearch = () => {
        updateIssues()
    }

    return (
        <>
            <ServiceNavbar></ServiceNavbar>
            <div className='d-flex flex-column mt-5 content-fluid'>
                <div className='d-flex w-100'>
                    <div className='d-flex justify-content-center w-100'>
                        <InputField 
                            value={searchValue} 
                            setValue={setSearchValue} 
                            onSubmit={handleSearch} 
                            loading={loading} 
                            placeholder='Введите название происшествия'>
                        </InputField>
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