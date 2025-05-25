import express from 'express'
import { User } from '@shared'

const app = express()
const port = process.env.PORT || 3000

app.get('/api/user', (_, res) => {
  const user: User = { id: '123', email: 'test@example.com', userName: 'testuser' }
  res.json(user)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
