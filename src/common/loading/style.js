import styled from 'styled-components'

export const LoadingWrapper = styled.div `
	text-align: center;
	background: rgba(255,255,255, .3);
	position: fixed;
	width: 100%;
	top: 0;
	bottom: 0;
	z-index: 999;
}
`
export const LoadingDiv = styled.div `
	text-align: center;
	position: absolute;
	width: 100%;
	top: 50%;
	left: 50%;
	margin-left: -25px;
	margin-top: -25px;
	width: 50px;
	height: 50px;
}
`
