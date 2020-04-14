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

exports.getPackages = async () => {
  const packages = []

  try {
    const res = await http.get('http://gitlab.dui88.com/api/v4/groups/661')
    if (res && res.projects) {
      res.projects.forEach(project => {
        packages.push(project.name)
      })
    }
  } catch (error) {
    console.log(error)
  }

  return packages
}
