let superagent = require('superagent')
let cheerio = require('cheerio')

let baseUrl = 'https://blog.csdn.net/github_35631540/article/list'
// https://fizzz.blog.csdn.net/article/list/21?orderby=ViewCount
let blogHrefArr = []
let totalPage = 21
const articleSelector = `.article-list h4 a` // 列表页面文章选择器

const setData = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
  'Referrer': 'https://blog.csdn.net/github_35631540?t=1',
  'Content-Type': 'text/html; charset=UTF-8',
}

let getBlogDetail = (blogItem) => {
  superagent
  .get(`${blogItem.href}`)
  .set(setData)
  .end((err, res) => {
    if(res?.statusCode === 200) {
      console.log('\x1b[32m%s\x1b[0m', `爬取成功:__${blogItem.name}`);
    }else{
      console.error(`爬取失败:__${blogItem.name}`)
    }
  })
}

function errhandle(err) {
  console.log(err)
}

// 使用递归获取所有页的博客链接
let getAllBlogHref = (n) => {
  const link = `${baseUrl}/${n}?orderby=ViewCount`

  superagent
    .get(link)
    .set(setData)
    .retry(2)
    .on('error', errhandle)
    .end((_,res) => {
      let $ = cheerio.load(res.text)
      const articleElArr = $(`${articleSelector}`)
      const len = articleElArr.length
      console.warn(`link：${link}, article count: ${len}  `)
      let item = null
      if (len > 1) {
        console.log(`获取到${len}条博客记录`)
        console.log(`开始获取博客地址....`)
        for (let i = 0; i < len; i++) {
          item = articleElArr[i]
          let blogItem = {
            name: $(item).text().replace(/\s+/g, ''),
            href: $(item).attr('href'),
          }
          getBlogDetail(blogItem)
          blogHrefArr.push(blogItem)
        }
        n--
        if(n > totalPage - 5){
          getAllBlogHref(n)
        }else{
          return blogHrefArr
        }
      }
  })
}

getAllBlogHref(totalPage)
