import styled from 'styled-components';
import { injectGlobal } from 'styled-components';

injectGlobal`
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video, dl, dt, dd {
		margin: 0;
		padding: 0;
		border: 0;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
		font-size: 15px;
		overflow-x: hidden;
		font-family: Arial, Helvetica, sans-serif, '黑体';
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	a{
		transition: all .3s;
		color: #333333;
		&:hover, &:hover h1{
			color:#ff0000;
		}
		&.active{
			color:#ff0000;
		}
	}

	img {
		transition: all .3s;
	}
	.noData{
		display: block;
		padding: 10px 0 10px 0;
		opacity: .4;
	}
	.noData-div{
		padding: 12px 0;
		text-align: center;
	}
	::-webkit-scrollbar
	{
			width: 8px;
			height: 8px;
			background-color: #fff;
	}
	 
	/*定义滚动条轨道 内阴影+圆角*/
	::-webkit-scrollbar-track
	{
			-webkit-box-shadow: inset 0 0 6px rgba(255,255,255,0.1);
			background-color: #eee;
	}
	 
	/*定义滑块 内阴影+圆角*/
	::-webkit-scrollbar-thumb
	{
			border-radius: 4px;
			-webkit-box-shadow: inset 0 0 6px rgba(255,255,255,.1);
			background-color: rgba(255,255,255,.8)
	}

`;

export const MainWrapper = styled.div`
	position: relative;
	width:1200px;
	margin:auto;
	.tableA {
		color: #1890ff;
	}
`;

export const H1Title = styled.h1 `
	font-size: 24px;
	color: #000;
	line-height: 1.3;
`

export const NoPage = styled.h1 `
	text-align: center;
	div{
		padding-bottom: 30px;
		padding-top: 15%;
	}
`