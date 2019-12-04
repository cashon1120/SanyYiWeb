import styled from 'styled-components'
import LoadingImg from '../../statics/images/loading.gif';
import defaultBannerImg from '../../statics/images/banner2.jpeg'

export const HomeWrapper = styled.div`
	overflow: hidden;
	margin: 0 auto;
`;

export const BannerOuter = styled.div`
	overflow: hidden;
	margin: 0 auto;
	background: #fff;
	width: 1200px;
`;

export const DefaultBanner = styled.div`
	overflow: hidden;
	height: 450px;
	background: url(${defaultBannerImg}) no-repeat center;
	width: 100%;
`;

export const BannerWrapper = styled.div`
	overflow: hidden;
	margin: 0 auto;
	height: 450px;
	text-align: center;
	padding-top: 30px;

	div{
		height: 390px;
		width: 821px;
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
	border-bottom: 2px solid #d2d2d2;
	padding: 15px 0;
	margin-top: 20px;
	h1 {
		padding-bottom: 20px;
		border-bottom: 1px dashed #d2d2d2;
		margin-bottom: 15px;
	}
	div{
		a{
			margin-right: 30px;
			display: inline-block;
			width: 120px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			padding: 8px 0;
			font-size: 17px;
			&:hover, &.active{
				color: #f00;
			}
		}
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
	background:#efefef;
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
		&:hover img{
			box-shadow: 0 0 8px rgba(0,0,0,.1);
		}
		img{
			display:block;
			border: 2px solid #d2d2d2;
			width: 100%;
			height: 160px;
			margin-bottom: 15px;
		}
	}
`;

