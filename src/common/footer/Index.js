import React from 'react'

import {FooterWrapper} from './style'
import {MainWrapper} from '../../style'

export default() => {
		return <FooterWrapper>
				<MainWrapper>
					<div>
						<dl>
							<dt>快捷连接</dt>
							<dd><a href="#">选新机</a></dd>
							<dd><a href="#">选配件</a></dd>
							<dd><a href="#">先二手挖机</a></dd>
							<dd><a href="#">购机惠</a></dd>
						</dl>
						<dl>
							<dt>服务支持</dt>
							<dd><a href="#">服务介绍</a></dd>
							<dd><a href="#">服务网点</a></dd>
							<dd><a href="#">金融服务</a></dd>
							<dd><a href="#">环保信息</a></dd>
						</dl>
						<dl>
							<dt>新闻&活动</dt>
							<dd><a href="#">三一新闻</a></dd>
							<dd><a href="#">行业新闻</a></dd>
							<dd><a href="#">媒体视角</a></dd>
							<dd><a href="#">影像三一</a></dd>
						</dl>
						<dl>
							<dt>关于三一</dt>
							<dd><a href="#">企业简介</a></dd>
							<dd><a href="#">全球公司</a></dd>
							<dd><a href="#">企业文化</a></dd>
							<dd><a href="#">社会责任</a></dd>
							<dd><a href="#">公司刊物</a></dd>
							<dd><a href="#">人才招聘</a></dd>
						</dl>
					</div>
					<div className="copyright">
						©版权所有 三一集团  ICP 证: 浙ICP备09109183号-25法律声明<br/>
转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源  <br/>  
技术支持: 成都亿盟恒信</div>
				</MainWrapper>
		</FooterWrapper>
}
