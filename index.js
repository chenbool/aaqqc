
// import {App} from './app'
var App = require('./app')

new App('http://m.aaqqc.com');

//最新电视剧
// /vod-type-id-2-pg-2.html
// var url = 'http://m.aaqqc.com/vod-type-id-2.html';

// http.get(url, function(res) {
//     let html = '';
//     // 获取页面数据
//     res.on('data', function(data) {
//         html += data;
//     });
//     // 数据获取结束
//     res.on('end', function() {
//         filterList(html);
//     });
// }).on('error', function() {
//     console.log('获取数据出错！');
// });

// /* 过滤页面信息 */
// function filterList(html) {
//     if (html) {
//         // 沿用JQuery风格，定义$
//         const $ = cheerio.load(html);
//         let vod_list = $("#vod_list").find("li");

//         vod_list.each(function(item) {
//             const _this = $(this);
//             let temp = {
//                 title: _this.find('a').attr('title'),
//                 href: 'http://m.aaqqc.com/' + _this.find('a').attr('href'),
//                 img: _this.find('.picsize').find('img').attr('data-original'),
//                 score: _this.find('.picsize').find('.score').text(),
//                 status: _this.find('.picsize').find('.status').text(),
//                 news: _this.find('.picsize').find('.title').text(),
//                 act: _this.find('p').text()
//             }
//             console.log(temp );
//         });

//         // console.log( vod_list.html() );
//     } else {
//         console.log('无数据');
//     }
// }


