import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ActiveAppeal, Appeal, AppealIssues, Issue, User } from "../api/Api";
import { api } from "../api";
import { ISSUES_MOCK } from '../modules/mock'

interface InitialState {
    SearchValue: string
    User: User | null
    LoaderStatus: boolean
    ErrorBoxStatus: boolean
    ErrorBoxText: string | undefined
    ActiveAppeal: ActiveAppeal
    AppealIssues: AppealIssues[],
    Issues: Issue[],
    Issue: Issue,
    Appeal: Appeal,
    Appeals: Appeal[]
}

const initialState: InitialState = {
    SearchValue: '',
    User: null,
    LoaderStatus: false,
    ErrorBoxStatus: false,
    ErrorBoxText: '',
    ActiveAppeal: {
        id: -1, count: 0
    },
    AppealIssues: [],
    Issues: [],
    Issue: {
        id: 0,
        name: '',
        description: '',
        image: ''
    },
    Appeal: {
        id: 0,
        time_created: '',
        time_applied: '',
        time_ended: '',
        connection_code: ''
    },
    Appeals: []
}

export const fetchLogin = createAsyncThunk(
    'data/fetchLogin',
    async ({login, password}: {login: string, password: string}) => {
        try {
            const response = await api.user.userLoginCreate({
                username: login,
                password: password
            })
            return response.data
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

export const fetchRegister = createAsyncThunk(
    'data/fetchRegister',
    async ({email, login, password}: {email: string, login: string, password: string}) => {
        try {
            const response = await api.user.userRegisterCreate({
                email: email,
                username: login,
                password: password
            })
            return response.data
        }
        catch (error: any) {
            throw new Error(error.response.data.status)
        }
    }
)

export const fetchLogout = createAsyncThunk(
    'data/fetchLogout',
    async () => {
        try {
            const response = await api.user.userLogoutCreate()
            return response.data
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

export const fetchIssuesList = createAsyncThunk(
    'data/fetchIssuesList',
    async (issueName: string) => {
        const response =  await api.issues.issuesList({
            issue_name: issueName
        })
        return response.data;
    }
)

export const fetchChangeIssueCount = createAsyncThunk(
    'data/fetchChangeIssueCount',
    async ({id, count}: {id: number, count: number}) => {
        try {
            const response = await api.appealIssues.appealIssuesUpdate(id.toString(), {
                count: count
            })
            return response.data
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

export const fetchUserUpdate = createAsyncThunk(
    'data/fetchUserUpdate',
    async ({email, login}: {email: string, login: string}) => {
        try {
            const response = await api.user.userUpdate({
                email: email,
                username: login
            })
            return response.data
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

export const fetchDeleteAppealIssue = createAsyncThunk(
    'data/fetchDeleteAppealIssue',
    async (id: number) => {
        try {
            await api.appealIssues.appealIssuesDelete(id.toString())
            return id;
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

export const fetchAppealIssuesCreate = createAsyncThunk(
    'data/fetchAppealIssuesCreate',
    async (id: number) => {
        try {
            const response = await api.appealIssues.appealIssuesCreate(id.toString())
            return response.data
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

export const fetchAppealById = createAsyncThunk(
    'data/fetchAppealById',
    async (id: number) => {
        try {
            const response = await api.appeals.appealsRead(id.toString())
            return response.data
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

export const fetchSaveConnectionCode = createAsyncThunk(
    'data/fetchSaveConnectionCode',
    async ({id, connectionCode}: {id: number, connectionCode: string}) => {
        try {
            await api.appeals.appealsUpdate(id.toString(), {
                connection_code: connectionCode
            })
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

export const fetchConfirmAppeal = createAsyncThunk(
    'data/fetchConfirmAppeal',
    async (id: number) => {
        try {
            await api.appeals.appealsConfirmUpdate(id.toString())
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

export const fetchCancelAppeal = createAsyncThunk(
    'data/fetchCancelAppeal',
    async (id: number) => {
        try {
            await api.appeals.appealsDelete(id.toString())
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

export const fetchAppealsList = createAsyncThunk(
    'data/fetchAppealsList',
    async () => {
        try {
            const response = await api.appeals.appealsList()
            return response.data
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

export const fetchIssueById = createAsyncThunk(
    'data/fetchIssueById',
    async (id: number) => {
        try {
            const response = await api.issues.issuesRead(id.toString())
            return response.data
        }
        catch (error: any) {
            throw new Error(error.response.data.error)
        }
    }
)

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSearchValue(state, {payload}) {
            state.SearchValue = payload
        },
        clearSearchValue(state) {
            state.SearchValue = ''
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
    },
    extraReducers: (builder) => {
        // login
        builder.addCase(fetchLogin.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.User = action.payload
            state.LoaderStatus = false
        })
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = action.error.message
        })

        // register
        builder.addCase(fetchRegister.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchRegister.fulfilled, (state) => {
            state.LoaderStatus = false
        })
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = action.error.message
        })

        // logout
        builder.addCase(fetchLogout.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchLogout.fulfilled, (state) => {
            state.User = null
            state.ActiveAppeal = {
                id: -1, count: 0
            }
            state.AppealIssues = []
            state.LoaderStatus = false
        })
        builder.addCase(fetchLogout.rejected, (state) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = 'Ошибка при выходе из системы'
        })

        // issues list
        builder.addCase(fetchIssuesList.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchIssuesList.fulfilled, (state, action) => {
            state.AppealIssues = action.payload.appeal_issues,
            state.ActiveAppeal = action.payload.active_appeal
            state.Issues = action.payload.issues
            state.LoaderStatus = false
        })
        builder.addCase(fetchIssuesList.rejected, (state) => {
            state.LoaderStatus = false
            state.Issues = []
            for (let i = 0; i < ISSUES_MOCK.issues.length; i++) {
                if (ISSUES_MOCK.issues[i].name.includes(state.SearchValue)) {
                    state.Issues.push(ISSUES_MOCK.issues[i])
                }
            }
        })

        // change issue count
        builder.addCase(fetchChangeIssueCount.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchChangeIssueCount.fulfilled, (state) => {
            state.LoaderStatus = false
        })
        builder.addCase(fetchChangeIssueCount.rejected, (state) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = 'Не смогли изменить количество происшествий'
        })

        // user update
        builder.addCase(fetchUserUpdate.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchUserUpdate.fulfilled, (state, action) => {
            state.User = action.payload
            state.LoaderStatus = false
        })
        builder.addCase(fetchUserUpdate.rejected, (state, action) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = action.error.message
        })

        // delete appeal issue
        builder.addCase(fetchDeleteAppealIssue.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchDeleteAppealIssue.fulfilled, (state, action) => {
            state.LoaderStatus = false
            let id = action.payload
            state.AppealIssues = state.AppealIssues.filter((appealIssue) => {
                return appealIssue.issue.id !== id
            })
            state.Appeal.issues = state.Appeal.issues?.filter((issue) => {
                return issue.issue.id !== id
            })
        })
        builder.addCase(fetchDeleteAppealIssue.rejected, (state) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = 'Не смогли удалить происшествие'
        })

        // appeal issues create
        builder.addCase(fetchAppealIssuesCreate.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchAppealIssuesCreate.fulfilled, (state, action) => {
            state.ActiveAppeal = action.payload.active_appeal
            state.AppealIssues = action.payload.appeal_issues
            state.LoaderStatus = false
        })
        builder.addCase(fetchAppealIssuesCreate.rejected, (state) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = 'Не смогли добавить происшествие'
        })

        // appeal by id
        builder.addCase(fetchAppealById.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchAppealById.fulfilled, (state, action) => {
            state.Appeal = action.payload

            if (state.Appeal.time_created != null && state.Appeal.time_created.search('T') != -1) {
                let d = new Date(Date.parse(state.Appeal.time_created))
                state.Appeal.time_created = `${d.getUTCDate().toString().padStart(2, '0')}.${(d.getUTCMonth() + 1).toString().padStart(2, '0')}.${d.getUTCFullYear()} ${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`
            }
            if (state.Appeal.time_applied != null && state.Appeal.time_applied.search('T') != -1) {
                let d = new Date(Date.parse(state.Appeal.time_applied))
                state.Appeal.time_applied = `${d.getUTCDate().toString().padStart(2, '0')}.${(d.getUTCMonth() + 1).toString().padStart(2, '0')}.${d.getUTCFullYear()} ${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`
            }
            if (state.Appeal.time_ended != null && state.Appeal.time_ended.search('T') != -1) {
                let d = new Date(Date.parse(state.Appeal.time_ended))
                state.Appeal.time_ended = `${d.getUTCDate().toString().padStart(2, '0')}.${(d.getUTCMonth() + 1).toString().padStart(2, '0')}.${d.getUTCFullYear()} ${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`
            }

            state.LoaderStatus = false
        })
        builder.addCase(fetchAppealById.rejected, (state) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = 'Не смогли получить информацию об обращении'
        })

        // save connection code
        builder.addCase(fetchSaveConnectionCode.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchSaveConnectionCode.fulfilled, (state) => {
            state.LoaderStatus = false
        })
        builder.addCase(fetchSaveConnectionCode.rejected, (state) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = 'Не смогли обновить код подключения'
        })

        // confirm appeal
        builder.addCase(fetchConfirmAppeal.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchConfirmAppeal.fulfilled, (state) => {
            state.LoaderStatus = false
            state.ActiveAppeal = {
                id: -1, count: 0
            }
        })
        builder.addCase(fetchConfirmAppeal.rejected, (state) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = 'Не смогли подтвердить обращение'
        })

        // cancel appeal
        builder.addCase(fetchCancelAppeal.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchCancelAppeal.fulfilled, (state) => {
            state.LoaderStatus = false
        })
        builder.addCase(fetchCancelAppeal.rejected, (state) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = 'Не смогли отменить обращение'
        })

        // appeals list
        builder.addCase(fetchAppealsList.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchAppealsList.fulfilled, (state, action) => {
            state.Appeals = action.payload
            state.LoaderStatus = false
            for (let i = 0; i < state.Appeals.length; i++) {
                if (state.Appeals[i].time_created != null && state.Appeals[i].time_created.search('T') != -1) {
                    let d = new Date(Date.parse(state.Appeals[i].time_created))
                    state.Appeals[i].time_created = `${d.getUTCDate().toString().padStart(2, '0')}.${(d.getUTCMonth() + 1).toString().padStart(2, '0')}.${d.getUTCFullYear()} ${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`
                }
                if (state.Appeals[i].time_applied != null && state.Appeals[i].time_applied.search('T') != -1) {
                    let d = new Date(Date.parse(state.Appeals[i].time_applied))
                    state.Appeals[i].time_applied = `${d.getUTCDate().toString().padStart(2, '0')}.${(d.getUTCMonth() + 1).toString().padStart(2, '0')}.${d.getUTCFullYear()} ${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`
                }
                if (state.Appeals[i].time_ended != null && state.Appeals[i].time_ended.search('T') != -1) {
                    let d = new Date(Date.parse(state.Appeals[i].time_ended))
                    state.Appeals[i].time_ended = `${d.getUTCDate().toString().padStart(2, '0')}.${(d.getUTCMonth() + 1).toString().padStart(2, '0')}.${d.getUTCFullYear()} ${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`
                }
            }
        })
        builder.addCase(fetchAppealsList.rejected, (state) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            state.ErrorBoxText = 'Не смогли получить список обращений'
        })

        // issue by id
        builder.addCase(fetchIssueById.pending, (state) => {
            state.LoaderStatus = true
        })
        builder.addCase(fetchIssueById.fulfilled, (state, action) => {
            state.Issue = action.payload
            state.LoaderStatus = false
        })
        builder.addCase(fetchIssueById.rejected, (state) => {
            state.LoaderStatus = false
            state.ErrorBoxStatus = true
            for (let i = 0; i < ISSUES_MOCK.issues.length; i++) {
                if (ISSUES_MOCK.issues[i].id === state.Issue.id) {
                    state.Issue = ISSUES_MOCK.issues[i]
                    break
                }
            }
        })
    }
})

export const useLoaderStatus = () => useSelector((state: RootState) => state.ourData.LoaderStatus)
export const useErrorBoxStatus = () => useSelector((state: RootState) => state.ourData.ErrorBoxStatus)
export const useErrorBoxText = () => useSelector((state: RootState) => state.ourData.ErrorBoxText)
export const useSearchValue = () => useSelector((state: RootState) => state.ourData.SearchValue)
export const useUser = () => useSelector((state: RootState) => state.ourData.User)
export const useActiveAppeal = () => useSelector((state: RootState) => state.ourData.ActiveAppeal)
export const useAppealIssues = () => useSelector((state: RootState) => state.ourData.AppealIssues)
export const useIssues = () => useSelector((state: RootState) => state.ourData.Issues)
export const useAppeal = () => useSelector((state: RootState) => state.ourData.Appeal)
export const useAppeals = () => useSelector((state: RootState) => state.ourData.Appeals)
export const useIssue = () => useSelector((state: RootState) => state.ourData.Issue)
export const {
    setLoaderStatus: setLoaderStatusAction,
    setErrorBoxStatus: setErrorBoxStatusAction,
    setErrorBoxText: setErrorBoxTextAction,
    setSearchValue: setSearchValueAction,
    clearSearchValue: clearSearchValueAction,
    setUser: setUserAction,
    setActiveAppeal: setActiveAppealAction,
    setAppealIssues: setAppealIssuesAction,
} = dataSlice.actions

export default dataSlice.reducer