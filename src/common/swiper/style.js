import styled from 'styled-components'
import iconLeftPic from '../../statics/images/arr-left.png';
import iconRightPic from '../../statics/images/arr-right.png';
import LoadingImg from '../../statics/images/loading.gif';

export const SwiperWrapper = styled.div`
	z-index: 1;
	text-align: center;
	img{
		width: 100%;
		height:104px;
		display: block;
		margin: auto;
	}
	.videoImg {
		img {
			width: 80px;
			height: 80px;
			margin: auto;
			margin-top: 12px;
		}
	}
	.swiper-img{
		width: 15.25%;
		box-sizing: border-box;
		margin-right:20px;
		float: left;
		text-align: center;
		height: 134px;
		position: relative;

		.img-container{
			text-align: center;
			border: 1px solid #ebebeb;
			width: 100%;
			height:104px;
			background-size: 15% auto;
			background-color: #fff;
			margin-bottom: 15px;
			overflow:hidden;
			&:hover {
				border: 1px solid #f00;
				box-sizing: border-box;
			}
			&.active {
				border: 1px solid #f00;
				box-sizing: border-box;
			}
		}
	}
	.swiper-img:nth-child(6n+0){
		margin-right: 0;
		float: right;
	}
	.swiper-button{
		background: rgba(0,0,0, .5);
		width: 50px;
		height: 50px;
		border-radius: 100%;
		top: 50px;
		text-align: center;
		z-index: 100;
	}
	.swiper-button i {
		display: block;
		width: 20px;
		height: 20px;
		margin: auto;
		margin-top: 15px;
		position: relative;
	}

	.swiper-button-prev{
		left: -15px;
	}
	.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
		pointer-events: auto;
	}
	.swiper-button-prev i {
		left: 4px;
	}
	.swiper-button-next{
		right: -15px;
	}
	.swiper-button-next i {
		right: 4px;
	}
	.swiperIndex {
		margin: auto;
		z-index: 1;
		position: relative;
		overflow:hidden;
		height: 135px;
		width: 1200px;
		.swiper-img{
			border: 0;
			text-align: left;
		}
	}
	.swiperDetail{
		width:750px;
		margin-bottom:0;
		.swiper-img{
			width: 23%;
			margin-right:20px;
			height: 100px;
		}
		.img-container{
			height: 98px;
		}
		.swiper-img:nth-child(4n+0){
			float: right;
			margin-right: 0;
		}
		img{
			height: 100%;
			margin: auto;
			border: 0;
		}
		.swiper-button {
			top: 45px;
		}
	}
`;

export const IconLeft = styled.i`
	background: url(${iconLeftPic}) no-repeat;
	background-size: 100% 100%;
`

export const IconRight = styled.i`
	background: url(${iconRightPic}) no-repeat;
	background-size: 100% 100%;
`
