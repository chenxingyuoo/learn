import app from './app'

const port: number = 3000

export default app.listen(port, () => console.log(`Server run as http://127.0.0.1:${port}`))

process.on('uncaughtException', console.error)