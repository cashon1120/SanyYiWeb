import styled from 'styled-components'

export const SearchPage = styled.div`
	padding:30px 0;
	.loadMore{
		display: block;
		padding: 10px;
		text-align: center;
		width: 200px;
		border: 2px solid #d2d2d2;
		margin: 30px auto;
		&:hover{
			background: #f7f7f7;
			color: #6e6e6e
		}
	}
	.searchList{
		&:nth-child(2){
			padding-top: 30px;
			border-top: 1px dashed #d2d2d2;
		}
		margin-top: 30px;
		display:flex;
		line-height: 24px;
		border-bottom: 1px dashed #d2d2d2;
		padding-bottom: 30px;
		color: #b3b3b3;
		a {
			display: block;
			font-size: 20px;
			padding-bottom: 10px;
		}
		img {
			width: 75px; 
			height:75px;
			margin-right: 20px;
		}
		.flex-1{
			flex: 1;
		}
	}
`;

