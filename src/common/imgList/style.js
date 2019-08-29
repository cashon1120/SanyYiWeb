import styled from 'styled-components'

export const ImgWrapper = styled.ul `
	overflow: hidden;
	li{
		float: left;
		width: 100px;
		height: 100px;
		margin-right: 15px;
		img {
			cursor: pointer;
			width: 100px;
			height: 100px;
			border: 1px solid #ebebeb;
		}
	}
}
`
