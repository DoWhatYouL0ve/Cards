import {
  applyMiddleware,
  compose,
  combineReducers,
  legacy_createStore as createStore,
  Store,
} from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppReducer, AppReducerActionsType } from './app-reducer'
import { UserReducer, UserReducerActionsType } from './user-reducer'

let rootReducer = combineReducers({ app: AppReducer, user: UserReducer })

// for extension Redux dev tools
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store: Store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)
// end of using the extension

// store for the production
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// all action types must be here
export type AppActionsType = AppReducerActionsType | UserReducerActionsType

export type RootStateType = ReturnType<typeof rootReducer>
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  AppActionsType
>
// @ts-ignore
window.store = store
