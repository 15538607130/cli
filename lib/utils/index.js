const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 编译模版
const compile = (tmpPath, filename) => {

  return new Promise((resolve, reject) => {
    ejs.renderFile(tmpPath, { data: { name: filename } }, function (err, data) {
      if (err) {
        console.log(chalk.red(err))
        reject(err)
      }
      resolve(data)
    })
  })
}
//是否 有当前的路径 没有就创建
const createDirSync = (pathName) => {
  // 如果路径存在则返回 true，否则返回 false。
  if (fs.existsSync(pathName)) {
    return true
  } else {
    /*
      src/component/aa/bb 
      path.dirname() 取出父路径  src/component/aa
    */

    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

const writeFile = (path, conent) => {
  return fs.promises.writeFile(path, conent)
}

module.exports = {
  writeFile,
  compile,
  createDirSync
}