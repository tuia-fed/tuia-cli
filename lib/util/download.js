module.exports = async (tmpdir, repository) => {
  const download = require('download-git-repo')

  return await new Promise((resolve, reject) => {
    download(repository, tmpdir, { clone: true }, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}