const { FILE_PATTERN } = require('../parser')

describe('FILE_PATTERN', () => {
  test('basic', () => {
    const file = `
      name: My Page

      <Page>
        <Text>hello</Text>
      </Page>
    `

    const match = file.match(FILE_PATTERN)
    expect(match[1].trim()).toEqual('name: My Page')
    expect(match[2].trim()).toEqual('<Page>\n        <Text>hello</Text>\n      </Page>')
  })
})
