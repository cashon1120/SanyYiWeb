import React, {Component, Fragment} from 'react'
import VideoImg from '../../statics/images/video-1.jpg'
import DefaultImg from '../../statics/images/nopic.jpg'
import {setDefaultImg} from '../../utils/format'

class LoadImg extends Component {
  state = {
    realUrl: DefaultImg
  }


  componentWillReceiveProps(nextProps) {
    const {type, url} = nextProps
    this.setRealImg(type, url)
  }
  
  componentDidMount(){
    let {type, url} = this.props
    url = url || DefaultImg
    this.setRealImg(type, url)
  }

  setRealImg(type, url){
    if (type === 'mp4') {
      this.setState({realUrl: VideoImg})
    }else{
      this.setState({realUrl: DefaultImg})
    }
    const realImg = new Image()
    realImg.src = url
    realImg.onload = () => {
      this.setState({
        realUrl: url
      })
    }
  }
 
  render() {
    const { realUrl } = this.state
    const { name } = this.props
    return (
      <Fragment>
        <img
          onError={e => setDefaultImg(e)}
          src={realUrl}
          alt={name}
        />
      </Fragment>
    )
  }
}

export default LoadImg
