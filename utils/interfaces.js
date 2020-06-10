const domain = 'https://uniapp-interface.herokuapp.com/';

const interfaces = {
    // 获取首页数据
    getMallData: domain + 'api/profiles/mall_list',
	getCategory:  domain + 'api/profiles/category',
	// 获取商品列表
	getGoodsList: domain + 'api/profiles/goodslist',
	// 获取商品详情
		getGoods: domain + 'api/profiles/goods'
    
}
module.exports = interfaces;


