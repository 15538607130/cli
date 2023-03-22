
const { exec, spawn } = require('child_process')

/**
 * @description  开启子进程  执行终端命令
 * @return {*}
 * args  参数 
 * command  例如 npm
 * [args]命令参数  如 install 
 * opitons  其他配置  
 */
const cmdSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  cmdSpawn
}