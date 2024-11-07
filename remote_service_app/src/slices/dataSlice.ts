import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        SearchValue: '',
    },
    reducers: {
        setSearchValue(state, {payload}) {
            state.SearchValue = payload
        }
    }
})

export const useSearchValue = () => useSelector(state => state.ourData.SearchValue)

export const {
    setSearchValue: setSearchValueAction
} = dataSlice.actions

export default dataSlice.reducer