
var http = require('http')
var cheerio = require('cheerio')

class App {
    // 构造方法
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.html = ''
        this.lastPage = 0
        this.$ = []
        // console.log(this.baseUrl)
    }

    // 设置采集的分类
    setType(typeId){
        this.getUrl = this.baseUrl + '/vod-type-id-'+typeId+'.html'
        this.getHtml()
    }

    // 获取html内容
    getHtml() {
        const _this = this
        http.get(this.getUrl, function (res) {
            // 获取页面数据
            res.on('data', function(data) {
                _this.html += data
            });
            // 数据获取结束
            res.on('end', function() {
                // console.log(_this.html)
                _this.getLastPage()
            });
        }).on('error', function() {
            console.log('获取数据出错！')
        });
    }

    // 获取此分类的总页数
    getLastPage(){
        const _this = this
        const $ = cheerio.load(this.html)
        this.$ = $
        // 只有page小于等于0才执行
        if (this.lastPage <= 0){
            $(".ui-vpages").find(".pagelink_a").each(function (v) {
                _this.lastPage = $(this).attr('href').split('-')[5].replace(/.html/g, "")
            })
        }
        // console.log(_this.lastPage)
        this.getList()
    }

    // 获取列表内容
    getList(){
        const _this = this
        this.lastPage = 1
        for (let index = 1; index <= this.lastPage; index++) {
            let urls = this.baseUrl+'/vod-type-id-2-pg-'+index+'.html'
            // 请求
            http.get(urls, function (res) {
                // 获取页面数据
                res.on('data', function (data) {
                    _this.html += data
                });
                // 数据获取结束
                res.on('end', function () {
                    _this.filterList()
                });
            }).on('error', function () {
                console.log('获取数据出错！')
            });
        }
    }

    // 过滤列表
    filterList(){
        const $ = this.$;
        const _this = this
        let html = $("#vod_list").find("li");
        html.each(function (item) {
            const _self = $(this);
            let temp = {
                title: _self.find('a').attr('title'),
                href: 'http://m.aaqqc.com/' + _self.find('a').attr('href'),
                img: _self.find('.picsize').find('img').attr('data-original'),
                score: _self.find('.picsize').find('.score').text(),
                status: _self.find('.picsize').find('.status').text(),
                news: _self.find('.picsize').find('.title').text(),
                act: _self.find('p').text()
            }
            console.log(temp );
            // 获取详情内容
            // _this.getDetail(temp)

        });
    }

    // 获取详情
    getDetail(data){

        const _this = this
        this.detail = ''
        // 请求
        http.get(data.href, function (res) {
            // 获取页面数据
            res.on('data', function (data) {
                _this.detail += data
            });
            // 数据获取结束
            res.on('end', function () {
                let $ = cheerio.load(_this.detail)
                _this._detail(_this.detail, $)
            });
        }).on('error', function () {
            console.log('获取数据出错！')
        });

        // .vod-body
    }

    // 解析
    _detail(html,$){
        let intro = $('#resize_vod').find('.vod-n-l')
        console.log(intro.html());
    }

}

const app = new App('http://m.aaqqc.com')
app.setType(2)

// module.exports.App = App;