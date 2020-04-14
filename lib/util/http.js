const http = require('http')

async function get (url) {
  return new Promise((resolve, reject) => {
    let data = ''
    http.get(url, res => {
      res.on('data', chunk => {
        data += chunk
      })
      res.on('end', () => {
        resolve(JSON.parse(data))
      })
    }).on('error', e => {
      console.error(e)
      reject(e)
    })
  })
}

exports.get = get