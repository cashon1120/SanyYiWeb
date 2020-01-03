import styled from 'styled-components'
import iconLeftPic from '../../statics/images/arr-left.png';
import iconRightPic from '../../statics/images/arr-right.png';

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
		width: 15.5%;
		box-sizing: border-box;
		margin-right:15px;
		float: left;
		text-align: center;
		height: 130px;
		position: relative;
		background: #f0f0f0;
		border-radius: 3px;
		border: 2px solid #d2d2d2;
		text-align: center;
		font-size: 14px;
		color: #383838;
		&:hover{
			.img-container img{
				transform: scale(1.1);
			}
		}
		.img-container{
			text-align: center;
			height:82px;
			margin: 10px;
			box-sizing: border-box;
			background-size: 15% auto;
			background-color: #fff;
			margin-bottom: 15px;
			overflow:hidden;
		}
	}
	.swiper-img:nth-child(6n+0){
		margin-right: 0;
		float: right;
	}
	.swiper-button{
		background: rgba(0,0,0, .5);
		width: 40px;
		height: 40px;
		top: 60px;
		text-align: center;
		z-index: 100;
	}
	.swiper-button i {
		display: block;
		width: 20px;
		height: 20px;
		margin: auto;
		margin-top: 10px;
		position: relative;
	}

	.swiper-button-prev{
		left: -5px;
	}
	.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
		pointer-events: auto;
	}
	.swiper-button-prev i {
		left: 4px;
	}
	.swiper-button-next{
		right: -5px;
	}
	.swiper-button-next i {
		right: 0px;
	}
	.swiper-container{
		height: 170px;
	}
	.swiper-pagination-bullet{
		background: #e23535;
		opacity: 1;
	}
	.swiper-pagination-bullet-active{
		background: #1f1f1f;
	}
	.swiperIndex {
		margin: auto;
		z-index: 1;
		position: relative;
		height: 165px;
	}
	.swiperDetail{
		.swiper-container{
			height: auto;
		}
		.swiper-pagination{
			display: none;
		}
		width:750px;
		margin-bottom:0;
		.swiper-img{
			width: 23%;
			margin-right:20px;
			height: 100px;
		}
		.img-container{
			margin: 5px;
			height: 88px;
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
