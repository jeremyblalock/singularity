const fs = require('fs').promises

const writeFiles = async (app, folderPath) => {
  let stats = null

  try {
    stats = await fs.lstat(folderPath)
  } catch (err) {
    // do nothing
  }

  if (stats && !stats.isFolder()) {
    throw new Error('Path exists and is not a folder')
  } else if (stats) {
    const contents = await fs.readdir(folderPath)

    if (contents.length > 0) {
      throw new Error('Folder exsts and is not empty')
    }
  }

  if (!stats) {
    await fs.mkdir(folderPath)
  }

  const { components, ...appDetails } = app
}
