import styled from 'styled-components';

export const LoginWrapper = styled.div`
	z-index: 0;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background: #eee;
`;

export const LoginContainer = styled.div`
	z-index: 0;
	position: absolute;
	padding:25px 25px 0 25px;
	border-radius: 8px;
	left: 50%;
	margin-left: -200px;
	top: 30%;
	width: 400px;
	background: #fff;
	box-shadow:0 0 10px rgba(0,0,0,.3);
	h1{
		text-align:center;
		font-size:20px;
		padding-bottom:20px;
	}
`;
