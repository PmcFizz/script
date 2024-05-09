let superagent = require('superagent')
let cheerio = require('cheerio')

let articleLink = 'https://fizzz.blog.csdn.net/article/details/130358088'

const setData = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
  'Referrer': 'https://fizzz.blog.csdn.net',
  'Content-Type': 'text/html;charset=utf-8',
  'Cookie': 'uuid_tt_dd=10_37461946880-1616319310860-464795; Hm_ct_6bcd52f51e9b3dce32bec4a3997715ac=6525*1*10_37461946880-1616319310860-464795!5744*1*github_35631540; __gads=ID=e0c14d61578df8d9-22baf8673bd500d1:T=1658141081:RT=1658141081:S=ALNI_MZsc7eN6dgrV8Xz2DAhcrxpO2kT-Q; __gpi=UID=000007d65e658476:T=1658141081:RT=1658141081:S=ALNI_MbKwJ7Y1LsxnL-k-6N44Hy3rr8ynA; UN=github_35631540; __bid_n=184e7c6cf9f6be85b44207; FEID=v10-434c9e59a68496cd485000aab02eebe23850ed29; __xaf_fpstarttimer__=1671960290936; __xaf_thstime__=1671960291088; __xaf_fptokentimer__=1671960291153; c_segment=11; dc_sid=8e828701ab4544bd87ad9068d36118bf; historyList-new=%5B%5D; x_dev_cloud_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVkZW50aWFsIjoiIiwiY3NkblVzZXJuYW1lIjoiZ2l0aHViXzM1NjMxNTQwIiwidXNlcklkIjoiNjI2OWZlZDc5MjQ0MGM2MGZhMzMxMWE5IiwidXNlcm5hbWUiOiJnaXRodWJfMzU2MzE1NDAifQ.h0KoV1w7VVTmHXwptnJTXkY9H3Dtrr4KqPZjePPHNxQ; UserName=github_35631540; UserInfo=7cbaee1cd4a34061ac1ca2cf18a22329; UserToken=7cbaee1cd4a34061ac1ca2cf18a22329; UserNick=%E6%8B%BF%E6%88%91%E6%A0%BC%E5%AD%90%E8%A1%AB%E6%9D%A5; AU=E13; BT=1682213224568; p_uid=U010000; Hm_up_6bcd52f51e9b3dce32bec4a3997715ac=%7B%22islogin%22%3A%7B%22value%22%3A%221%22%2C%22scope%22%3A1%7D%2C%22isonline%22%3A%7B%22value%22%3A%221%22%2C%22scope%22%3A1%7D%2C%22isvip%22%3A%7B%22value%22%3A%220%22%2C%22scope%22%3A1%7D%2C%22uid_%22%3A%7B%22value%22%3A%22github_35631540%22%2C%22scope%22%3A1%7D%7D; SESSION=abb65720-937f-4f91-ba7a-fc3f1f6cc474; c_ins_um=-; _ga=GA1.1.698228121.1682671391; _ga_91C47RQLV7=GS1.1.1682671391.1.1.1682671437.0.0.0; c_ins_prid=1682669357974_584349; c_ins_rid=1683362300053_590527; c_ins_fref=https://mp.csdn.net/mp_blog/manage/article; c_ins_fpage=/?utm_source=636161750; FPTOKEN=X/Ci6deMpPaUl2IvNSXd8sfDJ/EAYvF+u8SpOxhAvrkT6BGm7Q3RzIT1Iqfcu+M+CjkbCWuqx/N7dDDrSdqbAeuzh/m3g3UMPwaPQNydq2C021Ai9LKAzvFLeEInJjwAvvGTs7/HElElAnX0bty4n5EtDOakO9J+006R+MB5XQHAyMfSzXL0m2GkooYIn2QtutMFaRvp55nKkmwoM4UUPBC01Dq4qLCatY6LRc/FGY9UwnNOLge/fyukf1o/xockXjbdO9aKwwWcQjJBnE8Ja2jRkI382BvUoCiVH7RYlOH1MSSrVhOsUfCNFaw5PKkCQcKialL1L0ee+wAhlg4R+C3/xf9x/f6xhi13xErdlp+LNpI4ZdDrJurDg4TC6LzekI7OPO5o4VJ6D1BTetrNQg==|MmNn9oMrCfQc/l6ZoANbJgGUB/NZuKj98+B2llG10i0=|10|6ef42889231c8e42833ea3dd49ba42ae; https_waf_cookie=aa636350-71de-41f5d9380dd7549de0340ef639778d93d39a; c_dl_prid=1683776902108_994123; c_dl_rid=1683811371355_988773; c_dl_fref=https://blog.csdn.net/github_35631540/article/details/125086261; c_dl_fpage=/download/weixin_42165018/18303172; c_dl_um=distribute.pc_search_result.none-task-blog-2%7Eblog%7Efirst_rank_ecpm_v1%7Erank_v31_ecpm-1-125086261-null-null.article_score_rank_blog; dp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTk3ODA0LCJleHAiOjE2ODQ1NTc3NDksImlhdCI6MTY4Mzk1Mjk0OSwidXNlcm5hbWUiOiJnaXRodWJfMzU2MzE1NDAifQ.SCw6LhAn3BiVrRNEZf8eYnivOg0ZOzb_nWY3FM8-Jgk; firstDie=1; c_hasSub=true; dc_session_id=10_1684111929943.651403; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1684112349; Hm_lvt_e5ef47b9f471504959267fd614d579cd=1684112720; Hm_lpvt_e5ef47b9f471504959267fd614d579cd=1684112723; ssxmod_itna=iq+xRD9DcA0=YDK40LRmGDBWt=wODYvhoqpdD/YtxnqD=GFDK40EoBhQAbYTAjKAWDx0QHKQD4fiiWbDERKhiGRef1WDneG0DQKGmDBKDSDWKD9ImO4GGAxBYDQxAYDGDDP9DGTVgRD7EUZSLjSR+GDxBoZ3dQgfkDDChDDbxpyDB=QxBQVfTjU+eXxZwRoYboWv75qFTxaY+GQKEYeYxwQW7xWdSWqzRqP/0Gd3I4YDD3q9O5PeD===; ssxmod_itna2=iq+xRD9DcA0=YDK40LRmGDBWt=wODYvhoqPG9tqquQDBwG7Ax7pik9HGF+EpZ5BbvxDuiwYesee8Yq6xKlEGO6xYlciBx8P23mYYsKfOYe4NUbImD2GfaRmItPz53V5hjo5z=s8gPBq40ept+BaHSnDx/mxQHO7WKDhdiRINegR=lnHFizqKU7mtKrDevD07W408DYKpimrd0m5kEpxrNi7j4D==; c_first_ref=www.baidu.com; c_pref=https%3A//www.baidu.com/link; c_first_page=https%3A//blog.csdn.net/chunmou1971/article/details/100761942; c_dsid=11_1684113506852.367503; https_ydclearance=3544045976cab2d3f983ebec-2322-4b91-814a-d2dc3ccf4a25-1684120718; c_ref=https%3A//fizzz.blog.csdn.net/article/list/18%3Forderby%3DViewCount; log_Id_click=6545; c_page_id=default; dc_tos=ruoedc; log_Id_pv=12421; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac=1684113601; log_Id_view=16983'
}

let getBlogDetail = (articleLink) => {
  superagent
  .get(`${articleLink}`)
  .set(setData)
  .end((err, res) => {
    if(res?.statusCode === 200) {
      console.log(`爬取成功:__${articleLink}`)
    }else{
      console.warn(`爬取失败:__${articleLink}`)
    }
  })
}


getBlogDetail(articleLink)

setInterval(() => {
  getBlogDetail(articleLink)
}, 1000 * 60)
