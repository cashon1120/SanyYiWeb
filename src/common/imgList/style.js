import styled from 'styled-components'

export const ImgWrapper = styled.ul `
	overflow: hidden;
	li{
		float: left;
		width: 350px;
		height: 350px;
		text-align: center;
		margin-right: 15px;
		border: 2px solid #000;
		box-sizing: border-box;
		padding: 1px;
		&:before{
			content: '';
			display:inline-block;
			height: 100%;
			vertical-align: middle;
			width: 0;
		}
		img {
			display:inline-block;
			cursor: pointer;
			max-width: 99.99%;
			max-height: 100%;
			vertical-align: middle;
		}
	}
}
`
