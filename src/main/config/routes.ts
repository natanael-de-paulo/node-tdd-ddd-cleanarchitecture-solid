import { Express, Router } from 'express'
import fs from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const directoryPath = path.resolve(__dirname, '../routes')

  fs
    .readdirSync(directoryPath)
    .filter(file => file.includes('routes.ts'))
    .map(async file => (await import(path.join(__dirname, '..', 'routes', file))).default(router))
}
