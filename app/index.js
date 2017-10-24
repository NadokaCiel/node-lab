import app from './app'
import config from 'config-lite'

const { PORT = 8080 } = process.env
app.listen(config.port, () => {
  console.log(`${config.name} listening on port ${config.port}`)
})
