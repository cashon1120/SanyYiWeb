import styled from 'styled-components'

export const Title = styled.div`
	text-align: left;
	padding-top: 60px;
	margin-bottom: 20px;
	h1{
		font-size: 26px;
		color:#000;
	}
`

export const List = styled.ul`
	text-align: left;
	margin-top: 30px;
	border-top: 2px solid #000;
	li{
		line-height: 40px;
		padding: 20px 0;
		border-bottom: 2px solid #000;
		span {
			display:inline-block;
			width: 100px;
		}
		a {
			float: right;
			color: #008dff;
		}
	}
`
