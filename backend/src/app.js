import express from 'express';
import { testConnection } from './config/database.js';
import userRoutes from './routes/user.route.js'
const app = express()
const port = 3000

testConnection()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', userRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
