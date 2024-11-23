import { FC, useEffect, useState } from 'react'

import { ISSUES_MOCK } from '../modules/mock'

import IssueCard from '../components/IssueCard'

import '../assets/css/issuesPage.css'
import InputField from '../components/InputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTE_LABELS, ROUTES } from '../modules/Routes'

import { useDispatch } from 'react-redux'
import { setActiveAppealAction, setAppealIssuesAction, setLoaderStatusAction, setSearchValueAction, useActiveAppeal, useAppealIssues, useLoaderStatus, useSearchValue } from '../slices/dataSlice'
import BasePage from './BasePage'
import { api } from '../api'
import { IssuesResponse } from '../api/Api'
import { Link } from 'react-router-dom'

const IssuesPage: FC = () => {

    const [issues, setIssues] = useState<IssuesResponse[]>([])
    const [searchValue, setSearchValue] = useState('')

    const dispatch = useDispatch()
    const reactSearchValue = useSearchValue()
    const loading = useLoaderStatus()
    const appealIssues = useAppealIssues()
    const activeAppeal = useActiveAppeal()

    const updateIssues = async (_searchValue='', force = false) => {
        if (_searchValue.length == 0 && !force)
            _searchValue = searchValue

        dispatch(setSearchValueAction(_searchValue))
        dispatch(setLoaderStatusAction(true))

        await api.issues.issuesList({
            issue_name: _searchValue
        }).then((response) => {
            setIssues(response.data.issues)
            dispatch(setActiveAppealAction(response.data.active_appeal))
            dispatch(setAppealIssuesAction(response.data.appeal_issues))
        }).catch(() => {
            let issues: IssuesResponse[] = []
            ISSUES_MOCK.issues.forEach((issue) => {
                if (issue.name.includes(_searchValue))
                    issues.push(issue)
            })
            setIssues(issues)
        }).finally(() => {
            dispatch(setLoaderStatusAction(false))
        })
    }

    useEffect(() => {
        setSearchValue(reactSearchValue)
        updateIssues(reactSearchValue)
    }, [])

    const handleSearch = () => {
        updateIssues()
    }

    const handleClear = () => {
        setSearchValue('')
        updateIssues('', true)
    }

    return (
        <BasePage>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ISSUES}]}></BreadCrumbs>
            <div className='d-flex flex-column content-fluid'>
                <div className='d-flex w-100'>
                    <div className='d-flex justify-content-center w-100'>
                        <InputField
                            value={searchValue} 
                            setValue={setSearchValue} 
                            onSubmit={handleSearch} 
                            onClear={handleClear}
                            loading={loading} 
                            placeholder='Введите название происшествия'>
                        </InputField>
                    </div>
                    <div className='d-flex flex-grow-1 appeal-content'>
                        <div hidden={appealIssues.length != 0}>
                            <img src='/Web_Frontend/img/appeal-empty.svg' className='appeal-img-sm' alt='appeal'></img>
                        </div>
                        <Link hidden={appealIssues.length == 0} to={`${ROUTES.APPEAL}/${activeAppeal.id}`}>
                            <div className='position-relative'>
                                <img src='/Web_Frontend/img/appeal.svg' className='appeal-img-sm' alt='appeal'></img>
                                <div className='appeal-count'>{activeAppeal.count}</div>
                            </div>
                        </Link>
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
        </BasePage>
    )
}

export default IssuesPage