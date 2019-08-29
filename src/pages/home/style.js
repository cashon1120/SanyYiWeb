import styled from 'styled-components'
import LoadingImg from '../../statics/images/loading.gif';

export const HomeWrapper = styled.div`
	overflow: hidden;
	margin: 0 auto;
`;

export const BannerOuter = styled.div`
	overflow: hidden;
	margin: 0 auto;
	background: #c6daf1;
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
	border-bottom: 1px solid #ebebeb;
	padding: 15px 0;
	margin-top: 20px;
	h1 {
		padding-bottom: 20px;
		border-bottom: 1px dashed #ebebeb;
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
			color: #838383;
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
	background:#f9f9f9;
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
			border: 1px solid #ebebeb;
			width: 100%;
			height: 160px;
			margin-bottom: 15px;
		}
	}
`;

