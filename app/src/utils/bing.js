const http = require('http')

//'1024x768'
const getImgSize = (url, size) => url.replace(/(.*_)(\d+x\d+)(\.jpg$)/, (str, m1, m2, m3) => m1+size+m3)
const getBingImg = function (size, cb) {
  http.get('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US',  (res)=> {
      var jstr = '', url='', urlinfo={}
      res.on('data', (chunk) => {
        jstr = `${chunk}`;
        try{
          urlinfo = JSON.parse(jstr).images[0]
          url = getImgSize(urlinfo.url, size)
        }catch(e){
          url = e
        }
        cb(url, urlinfo.copyright)
      });
  }).on('error', (e) => {
    cb(e)
  });
}

export default getBingImg
