import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/user";

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    }
);

// Immer is inside redux toolkit
// Immer allow you to change things directly because it will make copy of it behind the scenes
// in the create reducer and create slice functions