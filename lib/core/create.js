
const program = require('commander')
const { createProjectAction, createTemplateAction } = require('./actions')

const createCommands = () => {
  // create 命令创建 项目
  program.command('create <project> [others....]')
    .description('clone code into a folder')
    .action(createProjectAction)

  // add vue/react  add命令创建 文件
  program.command('add <filename> [others....]')
    .description('clone code into a folder')
    .action(createTemplateAction)
}



module.exports = createCommands