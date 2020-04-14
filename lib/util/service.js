const http = require('./http')

exports.getProjects = async () => {
  const projects = []

  try {
    const res = await http.get('http://gitlab.dui88.com/api/v4/groups/660')
    if (res && res.projects) {
      res.projects.forEach(project => {
        projects.push(project.name)
      })
    }
  } catch (error) {
    console.log(error)
  }

  return projects
}

let packages = []

exports.getPackages = async () => {
  const packageNames = []

  try {
    const res = await http.get('http://gitlab.dui88.com/api/v4/groups/661')
    if (res && res.projects) {
      packages = res.projects
      res.projects.forEach(project => {
        packageNames.push(project.name)
      })
    }
  } catch (error) {
    console.log(error)
  }

  return packageNames
}

exports.getBranchs = async (packageName) => {
  const branches = []
  if (packages.length) {
    const package = packages.find(item => item.name === packageName)
    const { id, default_branch } = package
    try {
      const res = await http.get(`http://gitlab.dui88.com/api/v4/projects/${id}/repository/branches`)
      if (res && res.length) {
        res.forEach(branch => {
          const { name, commit } = branch
          const committed_date = commit.committed_date.split('.')[0].replace('T', ' ')
          branches.push(name + ' ' + commit.author_name + ' ' + committed_date)
        })
      }
    } catch (error) {
      console.log(error)
    }

    if (branches.length === 0) {
      branches.push(default_branch)
    }
  }

  return branches
}
