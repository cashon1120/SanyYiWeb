import NoPic from '../statics/images/nopic.jpg'

// 图片加载失败设置默认图片
export const setDefaultImg = function (e) {
  e.target.src = NoPic
}

/**
 * @param pictures 服务器返回的图片列表
 * @param type 当 type 为2的时候 表示当前为除故障模式详情以外的其它详情页面, 需要多加一个 remark2 字段
 */
export function formartPicture(pictures, type) {
  const newPictrues = []
  pictures.forEach(item => {
    const {
      id,
      businessType,
      oldFileName,
      sourceType,
      url
    } = item
    const picInfo = {
      id,
      businessType,
      oldFileName,
      sourceType,
      url
    }
    /**
     * 由于历史原因, 这里只能用 remark 字段(设计雷区要点标题)来判断是否属于同一条记录
     * 没有就新加一条记录
     * 有就只在 pictures 里新加一张图片
     */
    const hasData = newPictrues.find(list => list.remark === item.remark)
    if (!hasData) {
      const content = {
        remark: item.remark,
        remark2: item.remark2,
        pictures: [picInfo]
      }
      if (!item.url) {
        content.pictures = []
      }
      if (type !== 2) {
        delete content.remark2
      }
      newPictrues.push(content)
    } else {
      for (let i = 0; i < newPictrues.length; i += 1) {
        if (newPictrues[i].remark === item.remark && item.url) {
          newPictrues[i].pictures.push({
            ...picInfo
          })
        }
      }
    }
  })
  return newPictrues
}

//根据比例设置 BANNER 图的宽高
export function setBannerSize(url, scale, callback) {
  let [width, height] = []
  const realImg = new Image()
  realImg.src = url
  realImg.onload = () => {
    width = realImg.width
    height = realImg.height
    if (width / height >= scale) {
      callback({bannerWidth: '100%', bannerHeight: 'auto'})
    } else {
      callback({bannerWidth: 'auto', bannerHeight: '100%'})
    }
  }
}