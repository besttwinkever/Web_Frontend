import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AppealIssues } from "../api/Api";

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        SearchValue: '',
        User: null,
        LoaderStatus: false,
        ErrorBoxStatus: false,
        ErrorBoxText: '',
        ActiveAppeal: {
            id: null, count: 0
        },
        AppealIssues: []
    },
    reducers: {
        setSearchValue(state, {payload}) {
            state.SearchValue = payload
        },
        setUser(state, {payload}) {
            state.User = payload
        },
        setLoaderStatus(state, {payload}) {
            state.LoaderStatus = payload
        },
        setErrorBoxStatus(state, {payload}) {
            state.ErrorBoxStatus = payload
        },
        setErrorBoxText(state, {payload}) {
            state.ErrorBoxText = payload
        },
        setActiveAppeal(state, {payload}) {
            state.ActiveAppeal = payload
        },
        setAppealIssues(state, {payload}) {
            state.AppealIssues = payload
        }
    }
})

export const useLoaderStatus = () => useSelector((state: RootState) => state.ourData.LoaderStatus)
export const useErrorBoxStatus = () => useSelector((state: RootState) => state.ourData.ErrorBoxStatus)
export const useErrorBoxText = () => useSelector((state: RootState) => state.ourData.ErrorBoxText)
export const useSearchValue = () => useSelector((state: RootState) => state.ourData.SearchValue)
export const useUser = () => useSelector((state: RootState) => state.ourData.User)
export const useActiveAppeal = () => useSelector((state: RootState) => state.ourData.ActiveAppeal)
export const useAppealIssues = () => useSelector((state: RootState) => state.ourData.AppealIssues)
export const {
    setLoaderStatus: setLoaderStatusAction,
    setErrorBoxStatus: setErrorBoxStatusAction,
    setErrorBoxText: setErrorBoxTextAction,
    setSearchValue: setSearchValueAction,
    setUser: setUserAction,
    setActiveAppeal: setActiveAppealAction,
    setAppealIssues: setAppealIssuesAction,
} = dataSlice.actions

export default dataSlice.reducer