const express = require('express')
const cors = require('cors')
const AppError = require('./utils/appError')
// routes
const shortLinkRouter = require('./routes/shortLink.routes')

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', shortLinkRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  return res.status(404).json({ status: false, message: `Can't find ${req.originalUrl} on this server!` })
});

module.exports = app