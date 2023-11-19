import { configureStore } from '@reduxjs/toolkit'
import pinsSlice from "./slices/pinsSlice";

const store = configureStore({
    reducer: {
        pins: pinsSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;