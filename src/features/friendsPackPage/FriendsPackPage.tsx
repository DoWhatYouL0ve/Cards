import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { BackToPack } from '../../common/components/backToPack/BackToPack'
import { Search } from '../../common/components/search/Search'
import { StyleButtonForMainPageHeader } from '../../common/styledComponents/styledButtons'
import { H1 } from '../../common/styledComponents/styledHeaders'
import {
  StyledFeaturesWrapper,
  StyledPageHeaderWrapper,
} from '../../common/styledComponents/styledWrappers'
import { PATH } from '../routes/PagesRoutes'

import { FriendsCardsTable } from './FriendsCardsTable/FriendsCardsTable'
import { StyledFriendsPackPage } from './styledFriendsPackPage'

export const FriendsPackPage = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <>
      <BackToPack />
      <StyledFriendsPackPage>
        <StyledPageHeaderWrapper>
          <div>
            <H1>Friend&apos;s Pack</H1>
          </div>
          <StyleButtonForMainPageHeader>Add new card</StyleButtonForMainPageHeader>
        </StyledPageHeaderWrapper>
        <StyledFeaturesWrapper>
          <Search className="mainPageSearch" />
        </StyledFeaturesWrapper>
        <FriendsCardsTable />
      </StyledFriendsPackPage>
    </>
  )
}