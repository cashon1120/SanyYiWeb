import React, {Component, Fragment} from 'react'
import {Modal} from 'antd'
import {ImgWrapper} from './style'
import defaultBanner from '../../statics/images/banner.jpg'

class ImgList extends Component {
		state = {
			previewVisible: false,
			previewImage: ''
		}
		handleCancel = () => {
			this.setState({
				previewVisible: false
			})
		}

		handlePreview = url => {
			this.setState({
					previewImage: url,
					previewVisible: true
			});
		}

		onError(e){
			e.target.src = defaultBanner
		}

		render() {
				const {data} = this.props
				const { previewVisible, previewImage } = this.state
				return (
						<Fragment>
								<ImgWrapper>
										{data.map(item => <li key={item.id} onClick={()=> this.handlePreview(item.url)}><img onError={(e) => this.onError(e)} src={item.url} alt=""/></li>)}
								</ImgWrapper>
								<Modal
										centered
										footer={null}
										onCancel={this.handleCancel}
										visible={previewVisible}>
										<div style={{padding: 10}}>
											<img
													alt="example"
													src={previewImage}
													onError={this.onError.bind(this)}
													style={{
													width: '100%'
											}}/>
										</div>
								</Modal>
						</Fragment>
				)
		}
}
export default ImgList
