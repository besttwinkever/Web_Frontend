import { FC, useEffect, useState } from 'react'

import { IIssue, getIssuesByName } from '../modules/serviceApi'
import { ISSUES_MOCK } from '../modules/mock'

import ServiceNavbar from '../components/ServiceNavbar'
import IssueCard from '../components/IssueCard'

import '../assets/css/issuesPage.css'
import InputField from '../components/InputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTE_LABELS } from '../modules/Routes'

import { useDispatch } from 'react-redux'
import { setSearchValueAction, useSearchValue } from '../slices/dataSlice'

const IssuesPage: FC = () => {

    const [loading, setLoading] = useState(false)
    const [issues, setIssues] = useState<IIssue[]>([])
    const [searchValue, setSearchValue] = useState('')

    const dispatch = useDispatch()
    const reactSearchValue = useSearchValue()

    const updateIssues = (_searchValue='') => {
        if (_searchValue.length == 0)
            _searchValue = searchValue
        setLoading(true)
        dispatch(setSearchValueAction(_searchValue))
        getIssuesByName(_searchValue).then((response) => {
            setIssues(response.issues)
            setLoading(false)
        }).catch(() => {
            let issues: IIssue[] = []
            ISSUES_MOCK.issues.forEach((issue) => {
                if (issue.name.includes(_searchValue))
                    issues.push(issue)
            })
            setIssues(issues)
            setLoading(false)
        })
    }

    useEffect(() => {
        setSearchValue(reactSearchValue)
        updateIssues(reactSearchValue)
    }, [])

    const handleSearch = () => {
        updateIssues()
    }

    return (
        <>
            <ServiceNavbar></ServiceNavbar>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ISSUES}]}></BreadCrumbs>
            <div className='d-flex flex-column content-fluid'>
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
                        <img src='/src/assets/img/appeal-empty.svg' className='appeal-img-sm' alt='appeal'></img>
                    </div>
                </div>
                <div className='issues-list d-flex flex-wrap gap-5 mt-5 w-100'>
                    {issues.map((issue) => {
                        return (
                            <IssueCard
                                id={issue.id}
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