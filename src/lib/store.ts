import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
  displayName: null,
  photoURL: null,
  email: null,
  uid: null


}as {
  displayName: null | string;
  photoURL: null | string;
  email:null | string;
  uid:null | string
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin(state, action) {
      state.displayName = action.payload.displayName
      state.photoURL = action.payload.photoURL
      state.email = action.payload.email
      state.uid = action.payload.uid

    },
    setLogout(state) {
      state.displayName = null
      state.photoURL = null
      state.email = null
      state.uid = null
    },

  },
})

const persistConfig = {
  key: 'persist',
  storage,
}

const rootReducer = combineReducers({
  user: userSlice.reducer,
})

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  })

export const makeStore = () => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return makeConfiguredStore()
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    let store: any = configureStore({
      reducer: persistedReducer,
    })
    store.__persistor = persistStore(store)
    return store
  }
}

export const { setLogin, setLogout } = userSlice.actions
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
