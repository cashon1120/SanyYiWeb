import React, {Component, Fragment} from 'react'
import {Icon} from 'antd'
import {LoadingWrapper, LoadingDiv} from './style'

class Loading extends Component {
		render() {
				const {loading} = this.props
				return (
						<Fragment>
								{loading
										? <LoadingWrapper>
														<LoadingDiv>
																<Icon
																		type="sync"
																		spin
																		style={{
																		fontSize: 30
																}}/>
														</LoadingDiv>
												</LoadingWrapper>
										: null}
						</Fragment>
				)
		}
}
export default Loading
