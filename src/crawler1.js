const axios = require('axios'); 
const cheerio = require('cheerio'); 
 
axios.get('https://bjrbdzb.bjd.com.cn/bjwb/mobile/2022/20220705/20220705_022/content_20220705_022_6.htm#page20') 
	.then(({ data }) => { 
		const $ = cheerio.load(data); 
 
		const pokemonNames = $('.tit_con') 
			// .map((_, product) => { 
			// 	const $product = $(product); 
			// 	return $product.text() 
			// }) 
			// .toArray(); 
		// console.log(pokemonNames) 
	});
