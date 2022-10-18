import React from 'react'

import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../common/styledComponents/globalStyles'
import { Header } from '../common/styledComponents/Header'
import { StyledMainWrapper } from '../common/styledComponents/styledWrappers'
import { theme } from '../common/styledComponents/theme'
import { CheckEmail } from '../features/checkEmail/CheckEmail'
import { ForgotPasswordPage } from '../features/forgotPasswordPage/ForgotPasswortPage'
import { SignUpPage } from '../features/signUpPage/SignUpPage'
import { SignInPage } from '../features/singInPage/SignInPage'

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StyledMainWrapper>
          <Header />
          <Routes>
            <Route index path={'/cards'} element={<SignInPage />} />
            <Route path={'/signup'} element={<SignUpPage />} />
            <Route path={'/signin'} element={<SignInPage />} />
            <Route path={'/checkemail'} element={<CheckEmail />} />
            <Route path={'/forgotpassword'} element={<ForgotPasswordPage />} />
            <Route path={'/*'} element={<div>404</div>} />
          </Routes>
        </StyledMainWrapper>
        {/*<PersonalInformation />*/}
      </ThemeProvider>
    </div>
  )
}

export default App
