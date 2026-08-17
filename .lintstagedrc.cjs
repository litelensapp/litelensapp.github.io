const path = require("node:path")

const cwd = process.cwd()

// Support Windows and Unix path separators and convert to relative paths
const toRelative = (files, separator = " ") =>
  files.map((f) => JSON.stringify(path.relative(cwd, f).replaceAll("\\", "/"))).join(separator)

module.exports = {
  "*.{ts,tsx,js,jsx}": (files) => {
    if (!files?.length) return []
    return [`oxlint ${toRelative(files)}`]
  },
  "*.{ts,tsx,js,jsx,json,css,md,html}": (files) => {
    if (!files?.length) return []
    return [`prettier --write ${toRelative(files)}`]
  },
}
