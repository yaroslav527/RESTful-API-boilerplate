import mongoose from 'mongoose'
import config from './index'

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`

mongoose.set('strictQuery', true);

mongoose.connect(CONNECTION_URL, {})

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})