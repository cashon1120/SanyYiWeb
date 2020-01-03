import styled from 'styled-components';
import logoPic from '../../statics/images/logo.png';
import searchPic from '../../statics/images/search.png';

export const HeaderWrapper = styled.div `
	z-index: 100;
	position: relative;
	height: 67px;
	background:#18181b;
	.userName{
		position: absolute;
		right: 10px;
		width: 200px;
		top: 25px;
		text-align: right;
		a{
			font-size: 12px !important;
		}
	}
	a{
		position: relative;
		padding: 20px 0;
		font-size: 16px;
		color:#cbcbcb;
		margin-right: 15px;
	}
	.loginOut{
		display:block;
		position: absolute;
		right: 0;
		background: #ff1506;
		padding: 10px 0;
		border-radius: 5px;
		color: #fff;
		left: 50%;
		text-align: center;
		margin-left: -40px;
		width: 80px;
		top: 50px;
		font-size: 12px !important;
	}
	}
`;

export const NavWrapper = styled.div `{
		display:block;
		float:left;
		a{
			padding: 0 20px;
			height: 67px;
			line-height:67px;
			display: inline-block;
			text-align: center;
			width: 130px;
			font-size: 18px;
			color: #cbcbcb;
			box-sizing: border-box;
			&:hover{
				background: #2a2a2c;
				color: #fff !important;
				border-bottom: 4px solid #ff1506;
			}
		}
		div{
			position: fixed;
			background: #fff;
			z-index:999;
			width: 100%;
			border-top: 0;
			left: 0;
			top: 67px;
			height: 0;
			border: 0;
			box-sizing: border-box;
			overflow: hidden;
			text-align:center;
			padding: 0 50px 0 100px;
			opacity: 0;
			z-index: 1100;
			&.slide-enter {
				transition: all .2s ease-out;
			}
			&.slide-enter-active, &.slide-enter-done {
				opacity: 1;
				height: auto;
				padding: 50px 50px 50px 100px;
				border: 2px solid #d2d2d2;
				border-top: 0;
			}
			&.slide-exit {
				transition: all .2s ease-out;
			}
			&.slide-exit-active, &.slide-exit-active  {
				height: 0;
				opacity: 0;
			}
			ul {
				overflow: auto;
				padding-top:10px;
				width: 1240px;
				margin: auto;
				text-align: left;
				li {
					float:left;
					width: 33%;
					dl{
						overflow: auto;
						dt{
							font-weight:bold;
							padding-bottom: 30px;
							font-size: 18px;
							color:#000;
						}
						dd{
							float: left;
							width: 40%;	
							font-size: 16px;
						}
					}
				}
			}
		}
	}
`;

export const Logo = styled.div `
	float:left;
	top: 0;
	left: 0;
	width: 181px;
	height: 67px;
	background: url(${logoPic}) no-repeat;
	background-size: 100% 100%;
	margin-right: 20px;
`;

export const HeadPicWrapper = styled.div `
	display:inline-block;
	height: 45px;
	width: 45px;
	margin-left:10px;
	margin-right:10px;
	img {
		height: 45px;
		width: 45px;
		border-radius:100%;
		border:2px solid #fff;
	}
`;

export const SearchWrapper = styled.div `
	float:right;
	padding-top:14px;
	display:flex;
	text-align: right;
	align-items:center;
	form {
		display: inline-block;
		vertical-align: middle;
		margin-left: 20px;
	}
	.userName{
		position: absolute;
		right: 10px;
	}
	
	button {
		height: 35px;
		width: 35px;
		border: 0;
		float:left;
		background: url(${searchPic}) no-repeat;
		background-size: 100% 100%;
		outline:none;
		cursor: pointer;
	}
	.navSearch {
		width: 200px;
		height: 35px;
		padding: 0 20px 0 20px;
		box-sizing: border-box;
		float:left;
		outline: none;
		background: #323232;
		border: 0;
		border-radius: 5px 0 0 5px;
		font-size: 16px;
		color: #666;
		&::placeholder {
			color: #878787;
		}
	}
`;