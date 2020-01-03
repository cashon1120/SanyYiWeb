import styled from 'styled-components'


export const TreeData = styled.div `
  &.fixedTree{
    position: fixed;
    top: 0;
  }
 z-index: 1000;
 position: absolute;
 left: 50%;
 margin-left: -750px;
 width: 280px;
 top: 67px;
 overflow-y: auto;
 overflow-x: hidden;
 bottom: 28%;
 border: 2px solid #d2d2d2;
 }
 .treeIcon {
  display: none;
  font-size: 20px;
  position: fixed;
  background: #f00;
  color: #fff;
  top: 80px;
  padding: 6px;
  left: 0;
 }
`;

export const TreeWrapper = styled.div `{
 background: #fff;
 box-shadow:0 0 10px rgba(0,0,0, .1);
 width: 280px;
 border-radius: 0 8px 8px 0;
 overflow: auto;
 padding-bottom: 15px;
 height: 100%;
 div{
  padding: 15px 0 0 18px;
  span {
    cursor:pointer;
    overflow:hidden;
    display: inline-block;
    vertical-align:middle;
    text-overflow: ellipsis;
    width: 170px;
    position:relative;
    top: 3px;
    white-space:nowrap;
    &:hover{
      color: #ff0000;
    }
    &.active{
      color: #ff0000;
    }
  }
  i {
    transform: scale(1);
    font-size: 14px;
    vertical-align: middle;
    margin-right: 3px;
    position:relative;
    display:inline-block;
    width: 15px;
    top: 3px;
    margin-right: 5px;
  }
  &.showChildren{
   display: block;
   & > div {
    display: block;
   }
  }
  &.hideChildren{
   & > div {
    display: none;
   }
  }
 }
 &.slide-enter {
  transition: all .2s ease-out;
 }
 &.slide-enter-active, &.slide-enter-done {
  left: 0;
 }
 &.slide-exit {
  transition: all .2s ease-out;
 }
 &.slide-exit-active, &.slide-exit-active  {
  left: -200px;
 }
}`