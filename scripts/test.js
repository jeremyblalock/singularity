const path = require('path')
const { loadAndParse } = require('../src/parser')

if (require.main === module) {
  const result = loadAndParse(path.join(__dirname, '../tests/001'))
    .then((result) => {
      console.log(JSON.stringify(result, null, 2))
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      process.exit(0)
    })
}
