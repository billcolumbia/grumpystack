import { basename } from 'node:path'
import chalk from 'chalk'
import Config from '../gumpy.config'

const { log } = console
const success = chalk.green
const note = chalk.dim
const info = chalk.cyan

export const build = async (options = { silent: false }) => {
  const START = performance.now()
  const JS_FILES = Config.build.js || []
  const CSS_FILES = Config.copy.css || []
  const OUT_DIR = Config.outDir || './dist'

  const showManifest = (type, files) => {
    const COUNT = files.length
    const ACTION = type === 'JS' ? 'Built' : 'Copied'
    !options.silent &&
      log(
        success(`✓ ${ACTION} ${COUNT} ${type} file${COUNT > 1 ? 's' : ''}\n`) +
          note(`${files.map((file) => '  ⌙ ' + file).join('\n')}`) +
          '\n'
      )
  }

  await Bun.build({
    entrypoints: JS_FILES,
    outdir: `${OUT_DIR}/js`,
  })

  CSS_FILES.forEach(async (css) => {
    let file = Bun.file(css)
    let fileName = basename(css)
    await Bun.write(`${OUT_DIR}/css/${fileName}`, file)
  })

  !options.silent &&
    log(info(`\nBuild took ${Math.round(performance.now() - START)}ms\n`))
  showManifest('JS', JS_FILES)
  showManifest('CSS', CSS_FILES)
}
