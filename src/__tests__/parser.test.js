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
    expect(match).not.toBeNull()
    console.log('MATCH', match)
    expect(match[1].trim()).toEqual('name: My Page')

    expect(
      match[2]
        .trim()
        .split(/\n/)
        .map(itm => itm.trim())
    ).toEqual(['<Page>','<Text>hello</Text>','</Page>'])
  })
})
