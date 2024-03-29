const http = require('http')
const url = require('url')

const app = require('./routerHandler')
const server = http.createServer(app)

const mockData = require('./mockData')

//接口
app.get('/list', (req, res) => {
  // console.log(req.url, url.parse(req.url))

  let parseReqUrlQuery = url.parse(req.url).query
  let pageNum = parseReqUrlQuery.match(/pageNum=([^&]+)/) ? +parseReqUrlQuery.match(/pageNum=([^&]+)/)[1] : 10
  let pageSize = parseReqUrlQuery.match(/pageSize=([^&]+)/) ? +parseReqUrlQuery.match(/pageSize=([^&]+)/)[1] : 1
  // let name = parseReqUrlQuery.match(/name=([^&]+)/) ? parseReqUrlQuery.match(/name=([^&]+)/)[1] : ''

  let start = pageNum < 1 ? 0 : (pageNum - 1) * pageSize
  let end = start + pageSize

  let listTable = mockData.randomuser.slice(start, end)

  setTimeout(() => {
    res.end(JSON.stringify(listTable))
  }, 3000)
})

app.post('/login', (req, res) => {
  res.end('登录')
})

server.listen(3003, () => {
  console.log('running at http://localhost:3003')
})
