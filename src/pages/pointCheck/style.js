import styled from 'styled-components'

export const SearchWrapper = styled.div`
	padding:0 20px;
	border: 1px solid #ebebeb;
	margin: 30px 0;
	.list {
		display: flex;
		border-bottom: 1px dashed #ebebeb;
		i {
			color: #449aff;
		}
		.flex-1 {
			flex: 1;
			.moreCar{
				padding: 0;
				margin-top: 20px;
			}
			.noCar{
				text-align: center;
				color: rgba(0, 0, 0, 0.25);
			}
			.letter {
				padding: 0;
				a {
					border: 1px solid #ebebeb;
					padding: 9px 13px;
					box-sizing: border-box;
					margin: 0;
					margin-left: -1px;
				}
			}
		}
		.defaultVehicle {
			height: 55px;
			overflow: hidden;
		}
		span {
			display: inline-block;
			background: #f2f2f2;
			padding: 10px 20px;
			margin-right: 20px;
		}
		a {
			display: inline-block;
			padding: 10px 20px;
			margin-right: 10px;
			margin-bottom: 10px;
			&:hover, &.active{
				color: #fff;
				background: #449aff;
			}
		}
		div{
			padding: 20px 0;
		}
		div:last-child{
			padding-top: 30px;
		}
	}
	.list:last-child {
		border: 0;
	}
`;

export const SystemList = styled.div`
	margin: 20px 0 30px 0;
	display: flex;
	border: 1px solid #ebebeb;
	border-right: 0;
	.noSearchInfo{
		padding: 30px;
		text-align: center;
		color: rgba(0, 0, 0, 0.25);
	}
	&>div {
		flex: 1;
		border-right: 1px solid #ebebeb;
		dt {
			font-weight: bold;
			padding-left: 15px;
			color:#000;
		}
		dt, dd {
			height: 38px;
			line-height: 38px;
			position: relative;
			padding-right: 15px;
			border-bottom: 1px solid #ebebeb;
		}
		dd {
			padding-left: 15px;
			&.selected{
				i {
					color: #b8b8b8;
				}
			}
		}
		dd:last-child {
			border-bottom: 0;
		}
		i {
			float: right;
			margin-top: 15px;
			color: #449aff;
		}
		&:first-child {
			dd {
				margin-left: 15px;
				padding-left: 0;
			}
		}
		&:last-child {
			dd {
				margin-right: 15px;
				border-right: 0;
			}
		}
	}
`


