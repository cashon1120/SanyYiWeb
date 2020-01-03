import styled from 'styled-components'
import LoadingImg from '../../statics/images/loading.gif';
import defaultBannerImg from '../../statics/images/banner.jpg'
import lineImg from '../../statics/images/line.jpg'
import arrowImg from '../../statics/images/arrow_3.jpg'

export const HomeWrapper = styled.div`
	overflow: hidden;
	margin: 0 auto;
`;

export const BannerOuter = styled.div`
	overflow: hidden;
	margin: 0 auto;
	background: #fff;
	width: 1200px;
	border: 2px solid #d2d2d2;
`;

export const IndexBg = styled.div`
	background: #eee;
	text-align: center;
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
	height: 373px;
	background: url(${defaultBannerImg}) no-repeat center;
	background-color: #000;
	width: 100%;
`;

export const BannerWrapper = styled.div`
	overflow: hidden;
	margin: 0 auto;
	height: 600px;
	text-align: center;

	div{
		height: 600px;
		width: 1200px;
		padding: 30px;
		margin: auto;
		&::after{
			content:'';
			display:inline-block;
			vertical-align:middle;
			width:0;
			height: 100%;
		}
		&.active{
			background: #fff;
		}
		img{
			vertical-align:middle;
			max-width: 100%;
			max-height: 100%;
		}
	}
	
`;

export const Title = styled.div`
	overflow: auto;
	margin: 0 auto;
	padding: 15px 0;
	margin-top: 20px;
	text-align: center;
	h1 {
		padding-bottom: 5px;
		margin-bottom: 0;
	}
	.titleImg{
		width: 328px;
		height: 11px;
		margin: auto;
		background: url(${lineImg}) no-repeat center;
	}
	.downArrow{
		width: 20px;
		height: 13px;
		margin: auto;
		display: block;
		background: url(${arrowImg}) no-repeat center;
		transform: rotate(0);
		margin-top: 10px;
	}

	.upArrow{
		transform: rotate(180deg)
	}

	div.listWrapper{
		width: 1100px;
		height: 40px;
		margin: auto;
		overflow: hidden;
		transition: all .3s;
		margin-top: 30px;
		a{
			margin: 5px 10px;
			display: inline-block;
			width: 150px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			padding: 8px 0;
			background: #b50c0c;
			color: #fff;
			border-radius: 3px;
			font-size: 14px;
			&:hover, &.active{
				background: #18181b;
				color: #fff;
			}
		}
	}
	div.showMore{
		height: auto;
	}
	.flex-box{
		display: flex;
		align-items: flex-end;
		float: none;
		.flex-1 {
			flex: 1;
			a {
				position: relative;
				top: 6px;
			}
		}
	}
`;

export const SwiperWrapper = styled.div`
	z-index: 1;
	position: relative;
	width: 1200px;
	margin: auto;
	overflow:auto;
	text-align: center;
	padding: 30px 0;
`

export const PicContainer = styled.ul`
	padding-top: 30px;
	overflow: auto;
	li:nth-child(4n+0){
		margin-right: 0;
	}
	li{
		float:left;
		width: 23.4%;
		margin-right: 25px;
		box-sizing: border-box;
		margin-bottom: 30px;
		cursor: pointer;
		background: url(${LoadingImg}) no-repeat center 40%;
		background-size: 15% auto;
		background-color: #f6f6f6;
		height: 275px;
		padding: 14px;
		border: 1px solid #dedee0;
		&:hover{
			box-shadow: 0 0 8px rgba(0,0,0,.1);
		}
		div{
			background: #fff;
			height: 138px;
			img{
				width: 100%;
				height: 138px;
				margin-bottom: 15px;
			}
			margin-bottom: 15px;
		}
		aside{
			height: 45px;
			overflow: hidden;
			line-height: 22px;
			font-size: 14px;
			&.nodata{
				color: #9e9e9e;
			}
		}
		span{
			display: block;
			font-size: 18px;
			color: #000;
			padding-top: 15px;
			text-align: center;
		}
	}
`;

