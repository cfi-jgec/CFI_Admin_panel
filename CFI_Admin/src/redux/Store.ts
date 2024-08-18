import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// @ts-ignore
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
// @ts-ignore
import persistReducer from 'redux-persist/es/persistReducer';
// @ts-ignore
import persistStore from 'redux-persist/es/persistStore';

import User from "./slices/User"
import AdminSlice from './slices/AdminSlice';

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};


const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const basePersistConfig = {
    storage,
};


const userPersistConfig = {
    ...basePersistConfig,
    key: 'user',
};

const adminPersistConfig = {
    ...basePersistConfig,
    key: 'admin',
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, User),
    admin: persistReducer(adminPersistConfig, AdminSlice)
})


export const Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})

export const persistedStore = persistStore(Store);

type RootState = ReturnType<typeof Store.getState>;
type AppDispatch = typeof Store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector