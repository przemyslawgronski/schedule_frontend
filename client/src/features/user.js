// Authentication with redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: true,
    registered: false,
};

export const register = createAsyncThunk('users/register',
        async (userData, thunkAPI) => {
            // first_name, last_name, email, password,

            try{
                const res = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const data = await res.json();

                if (res.status === 201){
                    return data;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } catch(err) {
                return thunkAPI.rejectWithValue(err.response.data);
            }
        }
    );

const getUser = createAsyncThunk('users/me', async (_, thunkAPI)=>{

    try {
        // call to api/users/me on express server
        
        // Added full url because instead of:
        // http://localhost:3000/api/users/me , goes to:
        // http://localhost:3000/groups/api/users/me

        // before: const res = await fetch('api/users/me', {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await res.json();

        if(res.status === 200){
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk( 'users/login',
    async ({email, password}, thunkAPI) => {
        const body = JSON.stringify({
            email,
            password,
        });

        try{
            // Proxy to express server
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            });

            const data = await res.json();
            
            if (res.status === 200){
                const {dispatch} = thunkAPI;

                dispatch(getUser());

                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch(err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const checkAuth = createAsyncThunk('users/verify', async(_, thunkAPI)=>{

    try{
        const res = await fetch('/api/users/verify', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        const data = await res.json();

        if (res.status === 200){
            const {dispatch} = thunkAPI;
            
            dispatch(getUser());

            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

export const logout = createAsyncThunk('users/logout',
    async (_, thunkAPI) => {

        try{
            const res = await fetch('/api/users/logout', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            const data = await res.json();
            
            if (res.status === 200){
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch(err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const userSlice = createSlice(
    {
        name:'user',
        initialState,
        reducers: {
            // the only synchronous action creator
            // dispatch on the login page
            // set registered back to false 
            resetRegistered: state => {
                state.registered = false;
            }
        },
        extraReducers: builder => {
            builder.addCase(register.pending, state => {
                // because of immer there is no need to deep copy
                state.loading = true;
            }).addCase(register.fulfilled, state =>{
                state.loading = false;
                state.registered = true;
            }).addCase(register.rejected, state => {
                state.loading = false;
            }).addCase(login.pending, state=>{
                state.loading = true;
            }).addCase(login.fulfilled, state=>{
                state.loading = false;
                state.isAuthenticated = true;
            }).addCase(login.rejected, state=>{
                state.loading = false;
            }).addCase(getUser.pending, state=>{
                state.loading = true;
            }).addCase(getUser.fulfilled, (state, action)=>{
                state.loading = false;
                state.user = action.payload;
            }).addCase(getUser.rejected, state=>{
                state.loading = false;
            }).addCase(checkAuth.pending, state=>{
                state.loading = true;
            }).addCase(checkAuth.fulfilled, state=>{
                state.loading = false;
                state.isAuthenticated = true;
            }).addCase(checkAuth.rejected, state=>{
                state.loading = false;
            }).addCase(logout.pending, state=>{
                state.loading = true;
            }).addCase(logout.fulfilled, state=>{
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            }).addCase(logout.rejected, state=>{
                state.loading = false;
            });

        }
    }
)

export const {resetRegistered} = userSlice.actions;
export default userSlice.reducer;