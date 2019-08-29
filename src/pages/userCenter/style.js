import styled from 'styled-components'

export const Title = styled.div`
	text-align: left;
	padding-top: 60px;
	margin-bottom: 20px;
	h1{
		font-size: 24px;
		color:#000;
	}
`

export const List = styled.ul`
	text-align: left;
	margin-top: 30px;
	border-top: 1px solid #ebebeb;
	li{
		line-height: 40px;
		padding: 20px 0;
		border-bottom: 1px solid #ebebeb;
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
