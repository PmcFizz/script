let superagent = require('superagent')
let cheerio = require('cheerio')

let baseUrl = 'https://fizzz.blog.csdn.net/article/list'
let blogHrefArr = []
let totalPage = 13
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
    if(res.statusCode === 200) {
      console.log(`爬取成功:__${blogItem.name}`)
    }else{
      console.warn(`爬取失败:__${blogItem.name}`)
    }
  })
}

// 使用递归获取所有页的博客链接
let getAllBlogHref = (n) => {
  const link = `${baseUrl}/${n}?orderby=ViewCount`
  console.log(`link：${link}`)
  superagent
    .get(link)
    .set(setData)
    .end((_,res) => {
      let $ = cheerio.load(res.text)
      const articleElArr = $(`${articleSelector}`)
      const len = articleElArr.length
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
        if(n>1){
          getAllBlogHref(n)
        }else{
          return blogHrefArr
        }
      }
  })
}

getAllBlogHref(13)