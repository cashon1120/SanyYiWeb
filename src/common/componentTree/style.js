import styled from 'styled-components'


export const TreeData = styled.div `
 z-index: 1000;
 position: fixed;
 left: 0;
 top: 80px;
 width: 200px;
 }
 .treeIcon {
  font-size: 20px;
  position: fixed;
  background: #f00;
  color: #fff;
  top: 80px;
  padding: 8px;
  left: 0;
 }
`;

export const TreeWrapper = styled.div `{
 position: fixed;
 background: #eee;
 box-shadow:0 0 10px rgba(0,0,0, .1);
 width: 250px;
 left: -250px;
 max-height: 600px;
 border-radius: 0 8px 8px 0;
 overflow: auto;
 padding-bottom: 15px;
 div{
  padding: 15px 0 0 5px;
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
    transform: scale(.8);
    font-size: 12px;
    vertical-align: middle;
    margin-right: 3px;
    position:relative;
    display:inline-block;
    width: 15px;
    top: 3px;
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