import { FC, useEffect } from 'react'

import IssueCard from '../components/IssueCard'

import '../assets/css/issuesPage.css'
import InputField from '../components/InputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTE_LABELS, ROUTES } from '../modules/Routes'

import { useDispatch } from 'react-redux'
import { clearSearchValueAction, fetchIssuesList, setSearchValueAction, useActiveAppeal, useAppealIssues, useIssues, useLoaderStatus, useSearchValue } from '../slices/dataSlice'
import BasePage from './BasePage'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../store'

const IssuesPage: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const reactSearchValue = useSearchValue()
    const loading = useLoaderStatus()
    const appealIssues = useAppealIssues()
    const activeAppeal = useActiveAppeal()
    const issues = useIssues()

    const updateIssues = async () => {
        dispatch(fetchIssuesList(reactSearchValue))
    }

    const handleSearch = () => {
        updateIssues()
    }

    useEffect(() => {
        updateIssues()
    }, [])

    useEffect(() => {
        if (reactSearchValue == '') {
            updateIssues();
        }
    }, [reactSearchValue]);

    const handleClear = () => {
        dispatch(clearSearchValueAction())
    }

    const setSearchValue = (val:string) => {
        dispatch(setSearchValueAction(val))
    }

    return (
        <BasePage>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ISSUES}]}></BreadCrumbs>
            <div className='d-flex flex-column content-fluid'>
                <div className='d-flex w-100'>
                    <div className='d-flex justify-content-center w-100'>
                        <InputField
                            value={reactSearchValue} 
                            setValue={setSearchValue} 
                            onSubmit={handleSearch} 
                            onClear={handleClear}
                            loading={loading} 
                            placeholder='Введите название неисправности'>
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
                                id={issue.id as number}
                                title={issue.name}
                                imageUrl={issue.image as string}
                            ></IssueCard>
                        )
                    })}
                </div>
            </div>
        </BasePage>
    )
}

export default IssuesPage