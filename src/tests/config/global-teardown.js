const { execSync } = require('child_process')

module.exports = async () => {
  execSync('npx sequelize-cli db:drop')
}
