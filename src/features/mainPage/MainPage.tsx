import { memo, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'

export const MainPage = memo(() => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin')
    }
  }, [isLoggedIn])

  return <StyledSingFormWrapper>ТАДАААМ, ВЫ НА КАРТОЧКАХ</StyledSingFormWrapper>
})