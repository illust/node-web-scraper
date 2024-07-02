const axios = require('axios'); 
const cheerio = require('cheerio'); 
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'

// axios.get("https://bjrbdzb.bjd.com.cn/bjwb/mobile/2022/20221228/20221228_020/content_20221228_020_5.htm").then(res=>{
//     // console.log(res.data);
//     const $ = cheerio.load(res.data)
//     const htmlContent = $("#content > p:nth-child(2)").html()
//     console.log(htmlContent);
//     return htmlContent
// })

// 获取日期之间的所有日期数组
const getDayAll = (starDay, endDay) => {
    const arr = [];
    const dates = [];
  
    // 设置两个日期UTC时间
    const db = new Date(starDay);
    const de = new Date(endDay);
    // 获取两个日期GTM时间
    const s = db.getTime() - 24 * 60 * 60 * 1000;
    const d = de.getTime() - 24 * 60 * 60 * 1000;
  
    // 获取到两个日期之间的每一天的毫秒数
    for (let i = s; i <= d; ) {
      i = i + 24 * 60 * 60 * 1000;
      arr.push(parseInt(String(i)));
    }
  
    // 获取每一天的时间  YY-MM-DD
    for (const j in arr) {
      const time = new Date(arr[j]);
      const year = time.getFullYear();
      const mouth = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);
      const day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();
      const YYMMDD = year + '' + mouth + '' + day;
      dates.push(YYMMDD);
    }
  
    return dates;
  };

  const rangeDate1 = getDayAll('2020-07-14','2020-12-31')
  const rangeDate2 = getDayAll('2021-01-01','2021-12-31')
  const rangeDate3 = getDayAll('2022-01-01','2022-12-31')
  let crosswordDateArr = []
  let dayCount = 0
async function findDate(rangeDate,year) {

      let data = await rangeDate.filter(function(item){
        url = "https://bjrbdzb.bjd.com.cn/bjwb/mobile/" + year + "/" + item + "/" + item + "_m.html"

        let res = axios.get(url).then(res => {
            const $ = cheerio.load(res.data)
            const picList = $("#picList")
    
            // 获取所有li元素
            let liElements = picList.find("li");
            let count = 0
            // 遍历li元素
            liElements.each(function() {
              count = count + 1;

                // 在当前li元素中查找class为"img-title"的span元素
                let imgTitleSpan = $(this).find(".img-title");
                
                // 检查是否存在这样的span元素，并且其文本内容为"五色土·胡同"
                if (imgTitleSpan.length > 0 && imgTitleSpan.text().includes("五色土·胡同")) {
                    return false; // 如果找到符合条件的元素，可以终止循环
                }
            });
            console.log("length of count, liEle",item, count, liElements.length);

            if(count < liElements.length){
              // console.log("item", item);
              dayCount = dayCount + 1
              return item
            }
          })
        return res;
      })
      console.log("dayCount", dayCount);
      crosswordDateArr.push(data)
      // crosswordDateArr[0].forEach(e=>console.log(e))
    }

 findDate(rangeDate1, 2020)
 findDate(rangeDate2, 2021)
 findDate(rangeDate3, 2022)