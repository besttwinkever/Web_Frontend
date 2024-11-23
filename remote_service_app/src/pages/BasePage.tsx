import { FC, useState } from 'react'

import ServiceNavbar from '../components/ServiceNavbar'
import ErrorBox from '../components/ErrorBox'
import Loader from '../components/Loader'

import { useDispatch } from 'react-redux'
import { setErrorBoxStatusAction, useErrorBoxStatus, useErrorBoxText, useLoaderStatus } from '../slices/dataSlice'

interface Props {
    children: React.ReactNode
}

const BasePage: FC<Props> = ({ children }) => {

    const dispatch = useDispatch()

    const loaderStatus = useLoaderStatus()
    const errorBoxStatus = useErrorBoxStatus()
    const errorBoxText = useErrorBoxText()

    return (
        <>
            <ErrorBox visible={errorBoxStatus} onClose={() => dispatch(setErrorBoxStatusAction(false))} message={errorBoxText}></ErrorBox>
            <Loader visible={loaderStatus}></Loader>
            <ServiceNavbar></ServiceNavbar>
            {children}
        </>
    )
}

export default BasePage