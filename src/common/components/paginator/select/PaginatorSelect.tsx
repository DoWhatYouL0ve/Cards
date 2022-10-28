import { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes } from 'react'

import { StyledPaginatorSelect } from './styledPaginatorSelector'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: number[]
  onChangeOption: (option: number) => void
  selected: number
}

export const PaginatorSelect: React.FC<SuperSelectPropsType> = ({
  options,
  onChangeOption,
  onChange,
  selected,
  ...restProps
}) => {
  const mappedOptions: JSX.Element[] | undefined = options?.map((el, key) => {
    return (
      <option key={key} value={el}>
        {el}
      </option>
    )
  })

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    let choice = +e.currentTarget.value

    if (choice) {
      onChangeOption(choice)
    }
    onChange && onChange(e)
  }

  return (
    <StyledPaginatorSelect>
      <select
        onChange={onChangeCallback}
        defaultValue={selected}
        {...restProps}
        className={'select'}
      >
        {mappedOptions}
      </select>
    </StyledPaginatorSelect>
  )
}
