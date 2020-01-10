import styled from 'styled-components'

export const HomeWrapper = styled.div`
	overflow: hidden;
	margin: 0 auto;
`;

export const BannerOuter = styled.div`
	overflow: hidden;
	margin: 0 auto;
	background: #fff;
	width: 1200px;
	border: 2px solid #f00;
`;

export const IndexBg = styled.div`
	background: #eee;
	text-align: center;
`

export const More = styled.div`
	margin-left: 0.8%;
	display: block;
	margin-bottom: 20px;
`

export const IndexContainer = styled.div`
	width: 1240px;
	background: #fff;
	margin: auto;
	padding-top: 20px;
	padding-bottom: 40px;
`

export const DefaultBanner = styled.div`
	overflow: hidden;
	padding-bottom: 40%;
	background-color: #000;
	width: 100%;
	position: relative;
	img{
		position: absolute;
		width: 100%;
		height: 100%
	}
`;

export const Title = styled.div`
	margin: 0 0.8%;
	padding: 15px 0;
	margin-top: 20px;
	font-size: 26px;
	color: #f00;
	border-bottom: 1px solid #f00;
`;


export const ClassList = styled.div`
	border-right: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
	position: relative;
	z-index: 999;
	flex: 1;
	.text{
		padding: 10px;
	}
	section{
		padding: 15px 50px 10px 50px;
		display: flex;
		height: 102px;
		background: #fff;
		transition: all .2s ease-out;
		&:hover{
			transform: translateY(-20px);
		}
	}
	span{
		display: block;
		font-size: 14px; 
		color: #999;
		padding-top: 5px;
		line-height: 20px;
	}
`

export const PicContainer = styled.ul`
	padding-top: 30px;
	overflow: auto;
	padding-bottom: 10px;
	li:nth-child(4n+0){
		margin-right: 0;
	}
	li{
		float:left;
		width: 23.3%;
		margin-left: 0.8%;
		margin-right: 0.9%;
		box-sizing: border-box;
		margin-bottom: 1.3%;
		cursor: pointer;
		background-color: #fff;
		transition: all .2s ease-out;
		box-shadow: 0 0 10px rgba(0,0,0,.1);
		&:hover{
			box-shadow: 0 0 15px rgba(0,0,0,.25);
		}
		div{
			background: #fbfbfb;
			position: relative;
			padding-bottom: 80%;
			overflow: hidden;
			img{
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
				width: 100%;
			}
			&:hover{
				img {
					transform: translateY(-50%) scale(1.1);
				}
			}
		}
		aside{
			border-top: 1px solid #f5f5f5;
			padding: 20px;
			overflow: hidden;
			color: #999;
			font-size: 14px;
		}
		h1{
			font-size: 18px;
			color: #000;
			font-weight: normal;
			padding-bottom: 15px;
		}
	}
`;

