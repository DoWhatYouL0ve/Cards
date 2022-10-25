import axios, { AxiosError } from 'axios'

import { CardType, ChangeNameResType, packsAPI, PackType } from '../api/api'

import { isLoadingAC, setAppErrorAC } from './app-reducer'
import { AppThunkType } from './store'

const initialState: PackStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0, // количество колод
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0, // выбранная страница
  pageCount: 0,
  meOrAll: 'all',
}

export const PackReducer = (state = initialState, action: PackActionsType) => {
  switch (action.type) {
    case 'PACK/SET-PACK-INFORMATION': {
      return {
        ...state,
        ...action.packData,
        cardPacks: action.packData.cardPacks.map(tl => ({ ...tl })),
      }
    }
    case 'PACK/SET-TOGGLE': {
      return {
        ...state,
        meOrAll: action.toggle,
      }
    }
    case 'PACK/SET-PAGE-COUNT': {
      return {
        ...state,
        pageCount: action.count,
      }
    }
    default:
      return state
  }
}

export const setPackAC = (packData: PackType) => {
  return { type: 'PACK/SET-PACK-INFORMATION', packData } as const
}
export const changeToggleAC = (toggle: meOrAllType) => {
  return { type: 'PACK/SET-TOGGLE', toggle } as const
}
export const setPageCountAC = (count: number) => {
  return { type: 'PACK/SET-PAGE-COUNT', count } as const
}

// ================ Thunk creators ================

export const getPackTC =
  (
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    user_id?: string,
    block?: boolean
  ): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))

      const res = await packsAPI.getPack(
        packName,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        user_id,
        block
      )

      dispatch(setPackAC(res.data))
    } catch (e) {
      const errors = e as Error | AxiosError<ChangeNameResType>

      if (axios.isAxiosError(errors)) {
        if (errors.response?.data.error) {
          dispatch(setAppErrorAC(errors.response?.data.error))
        } else {
          dispatch(setAppErrorAC('Something went wrong...'))
        }
      }
    } finally {
      dispatch(isLoadingAC(false))
    }
  }
// ================ Types ====================

//common type for reducer and to be merged in store
export type PackActionsType =
  | ReturnType<typeof setPackAC>
  | ReturnType<typeof changeToggleAC>
  | ReturnType<typeof setPageCountAC>

type PackStateType = {
  cardPacks: CardType[]
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
  meOrAll: meOrAllType
}
type meOrAllType = 'me' | 'all'