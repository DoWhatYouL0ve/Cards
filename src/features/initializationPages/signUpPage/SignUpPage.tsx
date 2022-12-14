import React, { useState } from 'react'

import { useFormik } from 'formik'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Navigate, NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { setAppErrorAC, signUpTC } from '../../../app/app-reducer'
import { PATH } from '../../../app/routes/PagesRoutes'
import { MyInput } from '../../../common/components/styledInput/MyInput'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/appHooks'
import { StyleButtonFormAdjusted } from '../../../common/styledComponents/styledButtons'
import { StyledErrorArea } from '../../../common/styledComponents/styledErrorArea'
import { H2, H4, StyledBottomFormLink } from '../../../common/styledComponents/styledHeaders'
import { StyledSingFormWrapper } from '../../../common/styledComponents/styledWrappers'

import { StyledSignUpForm } from './styledSignUpPage'

export const SignUpPage = () => {
  const [passwordIcon, setPasswordIcon] = useState(true)
  const [passwordShowMode, setPasswordShowMode] = useState(true)
  const isLoading = useAppSelector(state => state.app.isLoading)

  const onClickAction = () => {
    setPasswordIcon(!passwordIcon)
    setPasswordShowMode(!passwordShowMode)
  }

  const clearError = () => {
    dispatch(setAppErrorAC(''))
  }

  const signUpStatus = useAppSelector(store => store.app.registered)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('* Email field is required'),
      password: Yup.string().min(8).required('* Subject field is required'),
      confirmPassword: Yup.string()
        .min(8)
        .required('* Subject field is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: values => {
      dispatch(signUpTC(values.email, values.password))
    },
  })

  if (signUpStatus) {
    dispatch(setAppErrorAC(''))

    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <StyledSingFormWrapper>
      <StyledSignUpForm>
        <H2>Sing Up</H2>
        <form onSubmit={formik.handleSubmit}>
          <div className={'inputErrorHandlerForm'}>
            <MyInput text={'email'} label={'Email'} {...formik.getFieldProps('email')} />
            <div className={'formErrorPlacement'}>
              {formik.errors.email && formik.touched.email ? (
                <StyledErrorArea>{formik.errors.email}</StyledErrorArea>
              ) : null}
            </div>
          </div>
          <div className={'inputErrorHandlerForm'}>
            <MyInput
              text={passwordShowMode ? 'password' : 'text'}
              label={'Password'}
              icon={passwordIcon ? AiFillEye : AiFillEyeInvisible}
              onClickAction={onClickAction}
              {...formik.getFieldProps('password')}
            />
            <div className={'formErrorPlacement'}>
              {formik.errors.password && formik.touched.password ? (
                <StyledErrorArea>{formik.errors.password}</StyledErrorArea>
              ) : null}
            </div>
          </div>
          <div className={'inputErrorHandlerForm'}>
            <MyInput
              text={passwordShowMode ? 'password' : 'text'}
              label={'Confirm Password'}
              icon={passwordIcon ? AiFillEye : AiFillEyeInvisible}
              onClickAction={onClickAction}
              {...formik.getFieldProps('confirmPassword')}
            />
            <div className={'formErrorPlacement'}>
              {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                <StyledErrorArea>{formik.errors.confirmPassword}</StyledErrorArea>
              ) : null}
            </div>
          </div>
          <StyleButtonFormAdjusted type="submit" disabled={isLoading}>
            Sign Up
          </StyleButtonFormAdjusted>
        </form>
        <H4>Already have an account</H4>
        <div className={'styledBottomFormLink'}>
          <StyledBottomFormLink>
            <NavLink to={PATH.LOGIN} className={'bottomFormLink'} onClick={clearError}>
              Sign In
            </NavLink>
          </StyledBottomFormLink>
        </div>
      </StyledSignUpForm>
    </StyledSingFormWrapper>
  )
}
