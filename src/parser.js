const yaml = require('yaml')
const fs = require('fs').promises
//const JSXParser = require('react-jsx-parser')

const parse = (app, components) => {
  return { ...app, components }
}

const loadAndParse = async folderPath => {
  const app = yaml.parse(await fs.readFile(`${folderPath}/app.yaml`, 'utf-8'))
  const otherFiles = (await fs.readdir(folderPath)).filter(file => file.match(/\.sing$/))
  const pages = []

  for (const file of otherFiles) {
    const content = await fs.readFile(`${folderPath}/${file}`, 'utf-8')

    const match = content.match(/\A(.*?)(\<Page.*\<\/Page\>)\w*\z/)

    const header = yaml.parse(match[1])
    const body = match[2]
    pages.push({ header, body })
  }

  return parse(app, pages)
}

module.exports = {
  parse,
  loadAndParse,
}
