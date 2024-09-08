import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PaginationStore {
    pageSize: number;
    currentPage: number;
    count: number;
}

const initialState: PaginationStore = {
    pageSize: 10,
    currentPage: 1,
    count: 0,
};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPageSize: (state, action: PayloadAction<{ pageSize: number }>) => {
            state.pageSize = action.payload.pageSize;
        },
        setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
            state.currentPage = action.payload.currentPage;
        },
        setCount: (state, action: PayloadAction<{ count: number }>) => {
            state.count = action.payload.count;
        },
    },
});

const { actions, reducer: paginationReduser } = paginationSlice;
export const { setPageSize, setCurrentPage, setCount } = actions;

export default paginationReduser;
