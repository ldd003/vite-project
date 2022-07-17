const http = require('http')

const app = require('./routerHandler')
const server = http.createServer(app)

//接口
app.get('/list', (req, res) => {
  let listTable = [
    {
      name: 'tom',
      age: 12
    },
    {
      name: 'lucky',
      age: 19
    }
  ]

  res.end(JSON.stringify(listTable))
})

app.post('/login', (req, res) => {
  res.end('登录')
})

server.listen(3003, () => {
  console.log('running at http://localhost:3003')
})
