const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')
dotenv.config({ path: './config.env' })
// DB Connection
mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(con => {
  console.log('💾 DB connected successfuly... ')
})
// run server
app.listen(port, () => console.log(`🌎 Server listening on port: ${port}...`))
