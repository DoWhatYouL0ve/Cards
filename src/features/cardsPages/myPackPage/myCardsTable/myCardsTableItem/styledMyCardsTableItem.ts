import styled from 'styled-components'

export const StyledMyCardsTableItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 12px 0 24px;
  line-height: 48px;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  border-bottom: 1px solid #d9d9d9;

  .question {
    display: flex;
    align-items: center;
    width: 344px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px;
    .nameText {
      display: flex;
      justify-content: center;
      flex-direction: column;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis !important;
      .image {
        max-height: 36px;
      }
    }
  }

  .answer {
    display: flex;
    align-items: center;
    width: 316px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px;
    .nameText {
      display: flex;
      justify-content: center;
      flex-direction: column;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis !important;
      .image {
        max-height: 36px;
      }
    }
  }

  .lastUpdated {
    display: flex;
    align-items: center;
    width: 136px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .grade {
    display: flex;
    align-items: center;
    width: 132px;
  }

  .options {
    display: flex;
    align-items: center;
    width: 44px;
    position: relative;

    .edit {
      position: absolute;
      top: 15px;
      left: 0;

      &:hover {
        cursor: pointer;
      }

      &:active {
        top: 16px;
        left: 1px;
      }
    }

    .delete {
      position: absolute;
      top: 15px;
      left: 30px;

      &:hover {
        cursor: pointer;
      }

      &:active {
        top: 16px;
        left: 31px;
      }
    }
  }
`
