import React, { useState } from 'react'

import Skeleton from '@mui/material/Skeleton'

import { deleteCardTC } from '../../../../../app/cards-reducer'
import Delete from '../../../../../assets/images/table/Delete.svg'
import Edit from '../../../../../assets/images/table/Edit.svg'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/appHooks'
import { CardsModal } from '../../../../../common/modals/cardsModal/CardsModal'
import { DeleteModal } from '../../../../../common/modals/deleteModal/DeleteModal'

import { MyItemGradeStars } from './myItemGradeStars/MyItemGradeStars'
import { StyledMyCardsTableItem } from './styledMyCardsTableItem'

type CardsTableItemType = {
  itemId: string
  question: string
  answer: string
  lastUpdated: string
  grade: number
}
export const MyCardsTableItem = (props: CardsTableItemType) => {
  const isLoading = useAppSelector(state => state.app.isLoading)

  const date = props.lastUpdated.toString().substring(0, 10).split('-').reverse().join('.')

  const [openCardsDeleteModal, setOpenCardsDeleteModal] = useState(false)
  const [openChangeCardsModal, setOpenChangeCardsModal] = useState(false)

  const dispatch = useAppDispatch()

  const setCardsDeleteModalClose = () => {
    setOpenCardsDeleteModal(false)
  }
  const onClickDeleteHandler = () => {
    setOpenCardsDeleteModal(true)
  }
  const deleteCard = () => {
    props.itemId && dispatch(deleteCardTC(props.itemId))
    setCardsDeleteModalClose()
  }

  const setChangeCardsModalClose = () => {
    setOpenChangeCardsModal(false)
  }
  const onClickChangeHandler = () => {
    setOpenChangeCardsModal(true)
  }

  return (
    <StyledMyCardsTableItem>
      <div className={'question'}>
        {!isLoading ? (
          <div className={'nameText'}>{props.question}</div>
        ) : (
          <Skeleton variant="rounded" height={16} width={'100%'} />
        )}
      </div>
      <div className={'answer'}>
        {!isLoading ? (
          <div className={'nameText'}>{props.answer}</div>
        ) : (
          <Skeleton variant="rounded" height={16} width={'100%'} />
        )}
      </div>
      <div className={'lastUpdated'}>
        {!isLoading ? date : <Skeleton variant="rounded" height={16} width={'90%'} />}
      </div>
      <div className={'grade'}>
        {!isLoading ? (
          <MyItemGradeStars grade={props.grade} />
        ) : (
          <Skeleton variant="rounded" height={16} width={'90%'} />
        )}
      </div>
      <div className={'options'}>
        {!isLoading ? (
          <>
            <img src={Edit} alt="" className={'edit'} onClick={onClickChangeHandler} />
            <img src={Delete} alt="" className={'delete'} onClick={onClickDeleteHandler} />
          </>
        ) : (
          <Skeleton variant="rounded" height={16} width={'100%'} />
        )}
      </div>
      {openCardsDeleteModal && (
        <DeleteModal
          open={openCardsDeleteModal}
          onClose={setCardsDeleteModalClose}
          onClick={deleteCard}
          name={props.question}
        />
      )}
      {openChangeCardsModal && (
        <CardsModal
          open={openChangeCardsModal}
          onClose={setChangeCardsModalClose}
          initialAnswer={props.answer}
          initialQuestion={props.question}
          title={'Edit card'}
          cardId={props.itemId}
        />
      )}
    </StyledMyCardsTableItem>
  )
}
