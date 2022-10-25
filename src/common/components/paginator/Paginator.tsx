import React, { useState } from 'react'

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import { PaginatorSelect } from './select/PaginatorSelect'
import { StyledPaginator } from './styledPaginator'

type PaginatorPropsType = {
  totalItemsCount: number
  pageCount: number
  paginatorPortion: number
  setCurrentItem: (item: number) => void
  currentItem: number
  ChangeFieldsNumber: (choice: number) => void
}

export const Paginator = (props: PaginatorPropsType) => {
  let options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  let [currentPage, setCurrentPage] = useState(props.currentItem)

  let pagesCount = Math.ceil(props.totalItemsCount / props.pageCount)

  let pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(props.totalItemsCount / props.paginatorPortion)
  let [portionNumber, setPortionNumber] = useState<number>(1)
  let leftPortionPageNumber = (portionNumber - 1) * props.paginatorPortion + 1
  let rightPortionPageNumber = portionNumber * props.paginatorPortion

  let [leftDisable, setLeftDisable] = useState<boolean>(true)
  let [rightDisable, setRightDisable] = useState<boolean>(false)

  const doLeftBtnDisable = () => {
    if (portionNumber === 2) {
      setPortionNumber(portionNumber - 1)
      setLeftDisable(true)
    }
    if (portionNumber > 1) {
      setPortionNumber(portionNumber - 1)
    } else {
      setLeftDisable(true)
      setRightDisable(false)
    }
  }

  const doRightBtnDisable = () => {
    if (portionNumber == portionCount - 1) {
      setRightDisable(true)
    } else {
      setPortionNumber(portionNumber + 1)
      setLeftDisable(false)
    }
  }

  const chooseCurrentPage = (page: number) => {
    props.setCurrentItem(page)
    setCurrentPage(page)
  }

  return (
    <StyledPaginator>
      <button disabled={leftDisable} onClick={doLeftBtnDisable} className={'paginatorBtn'}>
        {leftDisable ? <AiOutlineLeft color={'#EFEFEF'} /> : <AiOutlineLeft color={'#000000'} />}
      </button>

      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return (
            <span
              key={p}
              onClick={() => chooseCurrentPage(p)}
              className={`page ${currentPage === p ? 'selectedPage' : ''}`}
            >
              {p}
            </span>
          )
        })}
      <span className={'page'}>...</span>
      <span className={'page'}>{pagesCount}</span>
      <button disabled={rightDisable} onClick={doRightBtnDisable} className={'paginatorBtn'}>
        {rightDisable ? <AiOutlineRight color={'#EFEFEF'} /> : <AiOutlineRight color={'#000000'} />}
      </button>
      <span className={'beforeSelect'}>Show</span>
      <PaginatorSelect
        selected={props.pageCount}
        options={options}
        onChangeOption={props.ChangeFieldsNumber}
      />
      <span>Cards per page</span>
    </StyledPaginator>
  )
}
