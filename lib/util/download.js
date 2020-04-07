const fs = require('fs-extra')
const path = require('path')

module.exports = async (tmpdir, repository) => {
  const download = require('download-git-repo')

  return await new Promise((resolve, reject) => {
    download(repository, tmpdir, { clone: true }, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}