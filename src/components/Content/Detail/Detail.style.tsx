import styled from 'styled-components';
import { rem } from 'polished';
import { style } from '@/constants';

export const Content = styled.div`
  width: 100%;
  margin: ${rem(10)} auto 0;
  box-sizing: border-box;
  font-family: 'UD';
`;

export const Column = styled.div`
`;

export const OrderInfo = styled.div`
`;

export const ProductCode = styled.div`
  padding-left: ${rem(10)};
`;

export const ProductDetail = styled.div`
`;

export const ProductDetailSlider = styled.div`
  .imageSlide {
    width: ${rem(300)};
  }
`;

export const ProductDetailTop = styled.div`
  .barcodeWrapper {
    width: 22%;
  }
  
  .leftColumn {
    width: 40%;
  }
`;

export const ProductDetailInternalCapacityListTable = styled.ul`
  padding: ${rem(10)};
  font-size: ${rem(18)};
  
  li {
    margin-bottom: ${rem(10)};
  }
`;

export const ProductDetailBottom = styled.div`
`;

export const ItemStructureTable = styled.table`
  width: 100%;
  
  td {
    text-align: center;
  }
  
  .head {
    td {
      font-size: ${rem(14)};
      
      &:first-child {
        width: 30%;
      }
    }
  }
  
  .record {
    border-bottom: ${rem(1)} dashed #000;

    &:last-child {
      border-bottom: none;
    }
    
    td {
      padding: ${rem(10)} 0;
      font-size: ${rem(13)};
      vertical-align: middle;
      
      &:first-child {
        text-align: left;
      }
    }
  }
  
  &.configurationItem {}
  
  &.productionOrder {
    .head {
      td:last-child {
        width: ${rem(55)};
      }
    }
  }
`;

export const BarcodeWrapper = styled.div`
  margin-bottom: ${rem(10)};
  padding: ${rem(3)} ${rem(0)} ${rem(3)};
  background-color: #ffffff;
`;

export const BarcodeNumber = styled.div`
  font-size: ${rem(14)};
  letter-spacing: ${rem(2.4)};
`;

export const Barcode = styled.div`
  background-color: #fff;
  
  img {
    width: ${rem(130)};
  }
`;

export const Tag = styled.li`
  padding-right: ${rem(14)};
  float: left;
`;

export const Allergen = styled.ul`
  margin-left: ${rem(140)};
  font-weight: bold;
  
  li {
    width: ${rem(60)};
    
    &:last-child {
      .definition, .mark  {
        border-right: 2px solid #000;
      }
    }
  }
  
  div {
    height: ${rem(30)};
  }
  
  .definition {
    padding: ${rem(3)} 0 ${rem(2)};
    background-color: #a9d18e;
    border-top: 2px solid #000;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    box-sizing: border-box;
    text-align: center;
  }
  
  .mark {
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    box-sizing: border-box;
    text-align: center;
  }
`;

export const Calendar = styled.i`
  position: absolute;
  top: ${rem(10)};
  right: ${rem(10)};
`;

export const ImgLeaf = styled.div`
  width: ${rem(40)};
  position: absolute;
  top: ${rem(10)};
  right: ${rem(50)};
  cursor: pointer;
`;

export const LocationWrapper = styled.div`
`;

export const Location = styled.div`
  width: ${rem(160)};
  height: ${rem(55)};
  padding: ${rem(3)} ${rem(20)} ${rem(3)};
  position: relative;
  border: 1px solid #111111;
  border-radius: ${rem(10)};
  text-align: center;
  
  i {
    position: absolute;
    top: ${rem(10)};
    left: ${rem(-17)};
    background-color: #e4efdb;
  }
`;

export const QuantityInfo = styled.div`
  .panel {
    margin-bottom: ${rem(4)};
    padding: ${rem(0)} ${rem(10)};
    font-size: ${rem(13)};
    background: #c4d2d5;
  }
  
  &.smallFont {
    .panel {
      font-size: ${rem(11)};
    }
  }
`;

export const ProductDetailSection = styled.section`
  margin: ${rem(0)} ${rem(20)};
  font-size: ${rem(16)};
  
  &.spacePadding {
    margin: 0 !important;
    padding: ${rem(0)} ${rem(20)};
  }
`;

export const ProductDetailSectionHeader = styled.div`
  display: block;
  font-size: ${rem(16)};
  position: relative;
  height: ${rem(24)};

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: ${rem(1)};
    background-color: #000;
    position: absolute;
    top: ${rem(12)};
    left: 0;
    z-index: 10;
  }

  div {
    display: inline-block;
    padding-right: ${rem(6)};
    background-color: #ffffff;
    top: 0;
    position: absolute;
    z-index: 11;
  }
`;

export const ProductDetailSectionInfo = styled.div`
`;

export const ProductDetailSectionContent = styled.div`
`;

export const ProductDetailSectionContentProductMenuListWrapper = styled.div`
  .menuButton {
    text-align: center;
    width: 30%;
    color: #fff;
    border-radius: ${rem(3)};
    margin: 0 ${rem(2)};
    font-family: 'AgencyB', serif;
    font-weight: normal;
    
    &.general { background-color: #ef578d; }
    &.bp { background-color: #6a6a69; }
    &.bpPlant { background-color: #988443; }

    &.production { background-color: #577693; }
    &.mrp { background-color: #c78150; }
    &.quality { background-color: #6a7b57; }
  }
`;

export const ProductDetailSectionContentQRCodeBoxWrapper = styled.div`
  padding: ${rem(20)} ${rem(20)} ${rem(0)};
`;

export  const ProductDetailSectionContentQRCodeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  .column-center {
    width: 40%;
    
    img {
      margin: auto;
    }
  }
  
  //.column-left,
  //.column-right {
  //  width: 40%;
  //}

  .column-left {
    padding-right: ${rem( 10)};
  }

  .column-right {
    padding-left: ${rem( 10)};
  }
  
  .productMenu {
    padding-bottom: ${rem( 10)};
    text-align: center;
    
    &:last-child {
      padding-bottom: ${rem( 0)};
    }
  }

  .productMenuTitle {
    font-size: ${rem( 13)};
  }
`;

export const ProductDetailSectionContentTwoColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  .infoLabel {
    text-align: center;
    background-color: #DEEBF7;
    border-radius: ${rem( 4)};
    color: #767171;
  }
  
  .lightBlueInfo {
    color: #2E75B6;
    
    .itemText {
      color: #000;
    }
  }
  
  .lightBrownInfo {
    color: #BF9000;
    
    .itemText {
      color: #000;
    }
  }
`;

export const ProductDetailSectionContentThreeColumn = styled(ProductDetailSectionContentTwoColumn)`
`;

export const BluePanel = styled.div`
  text-align: center;
  border-radius: ${rem(4)};
  color: #c4c4c4;
  background-color: #ababab;

  &.active {
    background-color: #0fa0dd;
    color: #c4c4c4;
  }
`;
