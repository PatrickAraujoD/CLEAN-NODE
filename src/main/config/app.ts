import express from 'express'
import setupMiddlewares from './middlewares'
import setupRouters from './routes'

const app = express()
setupMiddlewares(app)
setupRouters(app)
export default app