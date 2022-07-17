const url = require('url')

//模拟express，处理router
function createApp() {
  let obj = {
    get: {},
    post: {}
  }

  const app = (req, res) => {
    if (req.url === '/favicon.ico') return res.end()

    let pathname = url.parse(req.url).pathname
    let method = req.method.toLowerCase()

    if (obj[method][pathname]) {
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000') //后端允许跨域
      res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' })

      if (method === 'get') {
        obj[method][pathname](req, res)
      } else {
        let data = ''
        req.on('data', chunk => {
          data += chunk
        })
        req.on('end', () => {
          req.body = data
          obj[method][pathname](req, res)
        })
      }
    } else {
      res.end('404')
    }
  }

  app.get = (url, cb) => {
    obj.get[url] = cb
  }
  app.post = (url, cb) => {
    obj.post[url] = cb
  }

  return app
}

module.exports = createApp()
