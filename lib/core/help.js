
const program = require('commander')


// 向 --help 的option里面添加 指令说明

function helpOptions () {
  /* -V 或者 --version */

  program.option('-W, --why', '自定义配置 说明')

  // 带参数的
  program.option('-f, --framework <framework>', '自定义配置 说明')

  // 带参数的
  program.option('-d, --dest <dest>', '文件路径')

  program.on('--help', function () {
    console.log('');
    console.log('监听 --help 命令')
  })

}
module.exports = helpOptions