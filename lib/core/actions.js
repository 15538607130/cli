
const { promisify } = require('util')
// promisify 将 download 函数 包装成 promise 
const download = promisify(require('download-git-repo'))
const inquirer = require('inquirer')
const { cmdSpawn } = require('../utils/terminal')
const ora = require('ora')
const chalk = require('chalk')
const program = require('commander')
const path = require('path')

const { writeFile, compile, createDirSync } = require('../utils/index')

/**
 * @description 
 * @param {*} project 项目名称
 * @return {*}
 */
async function createProjectAction (project) {
  let question = [
    {
      type: 'list',
      name: 'type',
      message: '项目类型',
      default: 'vue',
      choices: [
        { name: 'vue', value: 'vue' },
        { name: 'react', value: 'react' },
      ]
    }
  ]
  // 询问用户 选择模版框架
  let answers = await inquirer.prompt(question)
  switch (answers.type) {
    case 'vue':
      console.log('vue');
      break;
    case 'react':
      console.log('react');
      break;
    default:
      break;
  }
  // 询问用户 eslint ts
  let question2 = [
    {
      type: 'list',
      name: 'type',
      message: '辅助工具',
      default: 'ts',
      choices: [
        { name: 'ts', value: 'ts' },
        { name: 'eslint', value: 'eslint' },
        { name: '不需要', value: 'no' },
      ]
    }
  ]
  let answers2 = await inquirer.prompt(question2)
  switch (answers2.type) {
    case 'ts':
      console.log('ts');
      break;
    case 'eslint':
      console.log('eslint');
      break;
    default:
      break;
  }
  // 询问用户 需要用到的css编译工具
  let question3 = [
    {
      type: 'list',
      name: 'type',
      message: 'style辅助',
      default: 'less',
      choices: [
        { name: 'less', value: 'less' },
        { name: 'sass/scss', value: 'sass/scss' },
      ]
    }
  ]
  let answers3 = await inquirer.prompt(question3)
  switch (answers3.type) {
    case 'less':
      console.log('less');
      break;
    case 'eslint':
      console.log('sass/scss');
      break;
    default:
      break;
  }

  const loading = ora(chalk.red('下载中')).start();
  loading.color = 'yellow';

  try {

    //  TODO 通过一系列询问后 开始下载对应的模版
    /**  download-git-repo 下载github 模版   */
    await download('direct:https://github.com/15538607130/webpack5_react18_init.git', project, { clone: true })

    loading.succeed(chalk.green('下载成功！'))
    loading.info(chalk.yellow('npm run install '))
    // 下载后直接 install
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await cmdSpawn(command, ['install'], { cwd: `./${project}` })
    loading.stop()

  } catch (error) {
    console.error(error)
    loading.stop()
  }

}

/**
 * @description 
 * @param {*} type  vue 
 *          filename 文件名字
  * @return {*}
 */
async function createTemplateAction (type, others) {
  // 获取 commander options上的参数
  const options = program.opts()

  let filePath = options.dest || path.resolve('./')
  let filename = others[0]
  if (!filename) {
    console.log(chalk.red('文件名为空'))
    return
  }
  // 确保提供的文件路径存在 不存在的话 就创建
  createDirSync(filePath)
  // 获取对应的模版
  const tmpPath = path.resolve(__dirname, '../template/react/component.ejs')
  const targetPath = path.resolve(filePath, `${filename}.jsx`)
  let result = await compile(tmpPath, filename)
  writeFile(targetPath, result)
}

module.exports = {
  createProjectAction,
  createTemplateAction
}