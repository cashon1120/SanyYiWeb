import styled from 'styled-components'
import Icon from '../../statics/images/icon-list.jpg'
import IconDocPic from '../../statics/images/icon-doc.jpg'
import IconPptPic from '../../statics/images/icon-ppt.jpg'
import IconExcelPic from '../../statics/images/icon-excel.jpg'
import IconPdfPic from '../../statics/images/icon-pdf.jpg'

export const Title = styled.div`
	line-height: 2;
	text-align: left;
	margin-bottom: 20px;
	h1{
		margin-bottom: 20px;
		font-size: 24px;
		color:#000;
	}
`

export const Banner = styled.div`
	overflow: hidden;
	margin: 0 auto;
	padding: 30px 0;
	margin-bottom: 30px;
	height: 582px;
	box-sizing: border-box;
`;

export const BannerMain = styled.div`
	width: 750px;
	border:2px solid #d2d2d2;
	text-align: center;
	height: 400px;
	&::after{
		content:'';
		display:inline-block;
		vertical-align:middle;
		width:0;
		height: 100%;
	}
	img {
		max-width: 99.5%;
		max-height: 380px;
		vertical-align:middle;
	}
	video {
		max-width: 99.5%;
		max-height: 400px;
		margin: auto;
		vertical-align:middle;
	}
`
export const BannerList = styled.ul`
	overflow: auto;
	margin-top: 20px;
	height: 100px;
`

export const ImgContainer = styled.ul`
	width: 750px;
	float: left;
`
export const TitleContainer = styled.ul`
	width: 400px;
	float: right;
	line-height: 24px;
	max-height: 520px;
	overflow: auto;
	.flex-container{
		display: flex;
		align-items: flex-start;
		.flex-1{
			flex: 1;
		}
	}
`

export const ContentWrapper = styled.div`
	overflow: auto;
	margin-top: 30px;
	h1 {
		padding-bottom: 20px;
	}
`
export const ContentLeft = styled.div`
	float: left;
	width: 900px;
`

export const ContentRight = styled.div`
	float: right;
	width: 275px;
`

export const Content = styled.div`
	border: 2px solid #d2d2d2;
	padding: 0 30px 30px 30px;
	.imglist {
		padding-top: 10px;
	}
	h2 {
		font-size: 18px;
		padding-left: 35px;
		position: relative;
		margin-bottom: 15px;
		margin-top: 30px;
		&::before {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			top: -3px;
			width: 25px;
			height: 25px;
			background: url(${Icon}) no-repeat;
			background-size: 100% 100%;
		}
	}
`

export const ImgUl = styled.ul`
	padding-left: 30px;
	li{
		display: flex;
		align-items: center;
		padding: 10px 0;
		border-bottom: 2px solid #d2d2d2;
		&:last-child {
			border: 0;
		}
		img{
			width: 80px;
			height: 80px;
			margin-right: 30px;
		}
	}
`

export const FileUl = styled.div`
	height: auto;
	margin-top: 25px;
	padding-left: 35px;
	overflow: auto;
	a {
		float: left;
		width: 200px;
		display: inline-block;
		text-align: left;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
		vertical-align: middle;
		i {
			display: inline-block;
			margin: auto;
			width: 20px;
			height: 20px;
			margin-right: 5px;
			vertical-align: middle;
			position: relative;
			top: -1px;
		}
	}
`
export const IconDoc = styled.i`
	background: url(${IconDocPic}) no-repeat;
	background-size: 100% 100%;
`

export const IconPpt = styled.i`
	background: url(${IconPptPic}) no-repeat;
	background-size: 100% 100%;
`

export const IconExcel = styled.i`
	background: url(${IconExcelPic}) no-repeat;
	background-size: 100% 100%;
`

export const IconPdf = styled.i`
	background: url(${IconPdfPic}) no-repeat;
	background-size: 100% 100%;
`
export const TextArea = styled.div`
	line-height: 30px;
	padding-left: 35px;
	h4{
		color:#000;
		font-weight: bold;
	}
`

export const SwiperWrapper = styled.div`
	margin-top: 30px;
	z-index: 1;
	position: relative;
	overflow:auto;
	text-align: center;
	padding: 30px 0;
`

export const ModelUl = styled.ul`
	p {
		padding-bottom: 20px;
		font-weight: bold;
	}
	li {
		background: #f6f6f6;
		margin-bottom: 10px;
		overflow:hidden;
		text-overflow: ellipsis;
		&.current{
			a {
				color: #c0c0c0;
			}
		}
		a {
			padding: 10px;
			width: 100%;
			box-sizing: border-box;
			display: block;
			white-space: nowrap;
			overflow:hidden;
			text-overflow: ellipsis;
			span{
				display: inline-block;
				color: #666;
				width: 50px;
				text-align: right;
				vertical-align: middle;
			}
			span.link-title{
				width: 180px;
				text-align: left;
				white-space: nowrap;
				overflow:hidden;
				text-overflow: ellipsis;
				vertical-align: middle;
			}
		}
		&.active{
			a, span {
				color: #ff0000;
			}
		}
	}
`