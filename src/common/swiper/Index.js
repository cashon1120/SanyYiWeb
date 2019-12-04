import React, {Component} from 'react'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import {SwiperWrapper, IconLeft, IconRight} from './style'
import DefaultImg from '../../statics/images/nopic.jpg'
import Loadimg from '../loadImg/Index'


class SwiperComponent extends Component {
  state = {
    data: [],
    activeId: '',
    initialSlide: 0
  }

  componentWillReceiveProps(nextProp){
    const { data } = this.props
    this.setState({
      data
    })
  }

  // 是否更新组件
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data.length > 0 &&  nextState.data.length > 0 && (nextProps.data[0].id === nextState.data[0].id)) {
      return false
    }
    return true
  }

  // 组装swiper列表
  setSwiperData(data, listNum) {
    const {initialSlide} = this.state
    let [swiperList, picList] = [ [], [] ]
    data.forEach((item, index) => {
      picList.push(item)
      if ((index + 1) % listNum === 0) {
        swiperList.push(picList)
        picList = []
      }
      // 最后剩余数据
      if (index === data.length - 1 && picList.length > 0) {
        swiperList.push(picList)
      }
    })

    if (swiperList.length > 0) {
      const that = this
      setTimeout(() => {
        window.mySwiper = new Swiper('.swiper-container', {
          initialSlide: initialSlide,
          on: {
            slideChange: function () {
              that.setState({initialSlide: this.activeIndex})
            }
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        })
      }, 100)
    }
    return swiperList
  }

  // 鼠标移入事件
  onHover = (url, componentId, imgId) => {
    const {onHover} = this.props
    if (onHover) {
      onHover(url, componentId)
    }
  }

  handleClick = id => {
    const {handleClick} = this.props
    if (handleClick) {
      handleClick(id)
    }
  }

  render() {
    console.log('更新')
    const {data, listNum, classType, noFocus} = this.props
    const {activeId} = this.state
    const swiperList = this.setSwiperData(data, listNum) // 一组swiper数据
    return (
      <SwiperWrapper>
        <div className={classType}>
          <div className="swiper-container">
            <ul className="swiper-wrapper">
              {swiperList.map((item, index) => {
                return (
                  <li className="swiper-slide" key={index}>
                    {item.map((img, index) => {
                      img.url = img.url || DefaultImg
                      const temp = img.url.split('.')
                      const type = temp[temp.length - 1]
                      return (
                        <div
                          onClick={() => this.handleClick(img.componentId)}
                          onMouseEnter={() => this.onHover(img.url, img.componentId, img.id)}
                          key={index}
                          className={!noFocus && activeId === img.id
                          ? `active swiper-img` : 'swiper-img'}>
                          <div className="img-container">
                            <Loadimg name={img.name} url={img.url} type={type === 'mp4' ? 'mp4' : null} />
                            </div>
                          {img.name}
                        </div>
                      )
                    })}
                  </li>
                )
              })}
            </ul>
            <div className="swiper-button swiper-button-prev"><IconLeft/></div>
            <div className="swiper-button swiper-button-next"><IconRight/></div>
          </div>
        </div>
      </SwiperWrapper>
    )
  }
}

export default SwiperComponent
