import styled from 'styled-components'

export const FooterWrapper = styled.div `
	text-align: center;
	padding: 40px 0;
	color: #7b7b7b;
	background:#171717;
	font-size: 14px;
	dl{
		width: 160px;
		text-align: left;
		line-height: 24px;
		dt{
			color: #fff;
			font-size: 18px;
			padding-bottom: 5px;
		}
		dd{
			a{
				color: #7b7b7b;
				&:hover{
					color: #fff;
				}
			}
		}
	}
	div{
		display: flex;
	}
	.copyright{
		text-align: center;
		line-height: 20px;
		padding-top: 50px;
		margin-left: 50px;
	}
}
`
