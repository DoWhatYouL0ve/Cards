import styled from 'styled-components'

export const StyledFriendsCardsTableItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 24px;
  line-height: 48px;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  border-bottom: 1px solid #d9d9d9;
  .question {
    width: 344px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px;
  }
  .answer {
    width: 384px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px;
  }
  .lastUpdated {
    width: 136px;
  }
  .grade {
    width: 96px;
  }
`
