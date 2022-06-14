import express from 'express'
import axios from 'axios'
import http from 'http'
import { Joke } from './interfaces'

const app = express()
const port = 3000
const CHUCK_NORRIS_API_BASE_URL = 'https://api.chucknorris.io'

app.use(express.json())

app.get('/jokes/random', async (req, res) => {
  try {
    const { data } = await axios.get<Joke>(CHUCK_NORRIS_API_BASE_URL + '/jokes/random')
    if (data) res.send(data)
  } catch(error) {
    console.error(error)
    let defaultStatusCode = 500
    let defaultErrorMessage = 'An unexpected error has occurred.'
    if (axios.isAxiosError(error)) {
        defaultStatusCode = error.response!.status
        defaultErrorMessage = error.response!.data as string
    }
    res.status(defaultStatusCode).send(new Error(defaultErrorMessage))
  }
})

app.get('/jokes/categories', async (req, res) => {
    try {
        const { data } = await axios.get<[string]>(CHUCK_NORRIS_API_BASE_URL + '/jokes/categories')
        if (data) res.send(data)
    } catch(error) {
        console.error(error)
        let defaultStatusCode = 500
        let defaultErrorMessage = 'An unexpected error has occurred.'
        if (axios.isAxiosError(error)) {
            defaultStatusCode = error.response!.status
            defaultErrorMessage = error.response!.data as string
        }
        res.status(defaultStatusCode).send(new Error(defaultErrorMessage))
    }
})

app.get('/jokes/search', async (req, res) => {
    const term = req.query.term as string
    try {
        const { data } = await axios.get<[string]>(CHUCK_NORRIS_API_BASE_URL + `/jokes/search?query=${term}`)
        if (data) res.send(data)
    } catch(error) {
        console.error(error)
        let defaultStatusCode = 500
        let defaultErrorMessage = 'An unexpected error has occurred.'
        if (axios.isAxiosError(error)) {
            defaultStatusCode = error.response!.status
            defaultErrorMessage = error.response!.data as string
        }
        res.status(defaultStatusCode).send(new Error(defaultErrorMessage))
    }
});

http.createServer(app).listen(port)