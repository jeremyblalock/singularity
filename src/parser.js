const yaml = require('yaml')
const fs = require('fs').promises
//const JSXParser = require('react-jsx-parser')

const FILE_PATTERN = /^([\s\S]*?)(\<Page[\s\S]*\<\/Page\>)\s*$/

const parse = (app, components) => {
  return { ...app, components }
}

const loadAndParse = async folderPath => {
  const app = yaml.parse(await fs.readFile(`${folderPath}/app.yaml`, 'utf-8'))
  const otherFiles = (await fs.readdir(folderPath)).filter(file => file.match(/\.sing$/))
  const components = {}

  for (const file of otherFiles) {
    const content = await fs.readFile(`${folderPath}/${file}`, 'utf-8')

    const match = content.match(FILE_PATTERN)

    const header = yaml.parse(match[1])
    const body = match[2]
    const nameMatch = file.match(/^(.*)\.sing$/)
    const name = nameMatch[1]
    components[name] = { ...header, body }
  }

  return parse(app, components)
}

module.exports = {
  parse,
  loadAndParse,
  FILE_PATTERN,
}
