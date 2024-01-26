import styled from 'styled-components';
import { style } from "@/constants";
import { rem } from 'polished';

export const List = styled.div`
`;

export const ListSection = styled.section`
  margin: ${rem(20)} ${rem(20)} 0;
  font-size: ${rem(14)};
  
  &.hidden {
    display: none;
  }
`;

export const HeadTab = styled.ul`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  
  li {
    width: calc(50% - 4px);
    border-bottom: 2px solid #000;
    border-top: 2px solid #000;
    border-left: 2px solid #000;
    padding: ${rem(8)} ${rem(8)};
    box-sizing: border-box;
    cursor: pointer;
    
    &:last-child {
      border-right: 1px solid #000;
    }
    
    &.active {
      color: #ffffff;
      background-color: ${style.theme.lightBlue400};
    }
  }
`;

export const DetailList = styled.div`
  font-size: ${rem(12)};
`;

export const DetailListTable = styled.table`
  width: 100%;
  //table-layout: fixed;

  td {
    vertical-align: middle;
    border-right: 1px solid #000;
    
    &:first-child {
      border-left: 1px solid #000;
    }
  }

  .head {
    td {
      padding: ${rem(10)} 0;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      background-color: #404040;
    }
  }

  tbody {
    tr {
      &:last-child {
        border-bottom: 1px solid #000;
      }
    }
  }

  .record {
    cursor: pointer;
    border-top: 1px solid #000;

    &.active {
      background-color: #E2F0D9;
    }

    &.disabled {
      background-color: #c9c8c8;
    }

    &:hover {
      background-color: #e2f0d9;
    }

    td {
      padding: ${rem(10)};
      color: #000;
      word-wrap: break-word;
      overflow-wrap: break-word;
      text-align: center;

      &:last-child {
        padding: ${rem(10)} 0;

        button {
          img {
            min-width: ${rem(32)};
            min-height: ${rem(32)};
          }
        }
      }

      &.invalid {
        background-color: #ff7676;
      }
    }

    .edit {
      .label {
        display: block;
      }

      .content {
        display: none;
      }

      &.isEditing {
        .label {
          display: none;
        }

        .content {
          display: block;
        }
      }
    }
  }
`;

export const IcnOutside = styled.button`
  img {
    width: ${rem(32)};
  }
`;

export const IcnInvoice = styled.button`
  img {
    width: ${rem(32)};
  }
`;

export const ListHeaderInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: ${rem(20)};
  font-size: ${rem(11)};
  font-weight: bold;
  
  .columnLeft {
    width: ${rem(100)};
    margin-right: auto;
    padding-left: ${rem(0)};
  }

  .columnRight {}
`;

export const ListHeaderInfoFlexStart = styled(ListHeaderInfo)`
  justify-content: flex-start;
  font-size: ${rem(13)};
`;

const EditMenu = styled.div`
  .editMenu {
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: #808080;
    }
  }
`;

export const ListHeaderInfoTop = styled(EditMenu)`
  margin-bottom: ${rem(10)};

  & > div {
    margin-right: ${rem(25)};
  }
`;

export const ListHeaderInfoBottom = styled(EditMenu)`
  div {
    padding-right: ${rem(25)};
  }
`;

export const NoImage = styled.div`
  width: ${rem(60)};
  height: ${rem(60)};
  margin: auto;
  padding-top: ${rem(10)};
  border-radius: ${rem(4)};
  border: ${rem(3)} solid #2f5ae7;
  background-color: #3d78d2;
  text-align: center;
  color: #fff;
  font-size: ${rem(10)};
  font-weight: bold;
`;
