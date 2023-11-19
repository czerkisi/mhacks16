import { configureStore } from '@reduxjs/toolkit'
import pinsSlice from "./slices/propertiesSlice";
import filterSlice from "./slices/filterSlice";

const store = configureStore({
    reducer: {
        properties: pinsSlice,
        filter: filterSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;