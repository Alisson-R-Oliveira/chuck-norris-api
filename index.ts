import express from 'express'
import axios from 'axios'
import http from 'http'
import cors from 'cors'
import path from 'path'
import { Joke } from './interfaces'

const app = express()
const port = 3000
const CHUCK_NORRIS_API_BASE_URL = 'https://api.chucknorris.io'

app.use(express.json())
app.use(cors())
// app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/jokes/random', async (req, res) => {
    const category = req.query.category
    try {
        const {
            data
        } = await axios.get<Joke>(category ? `${CHUCK_NORRIS_API_BASE_URL}/jokes/random?category=${category}` : `${CHUCK_NORRIS_API_BASE_URL}/jokes/random`)
        if (data) res.send(data)
    } catch (error) {
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
        const {
            data
        } = await axios.get < [string] > (CHUCK_NORRIS_API_BASE_URL + '/jokes/categories')
        if (data) res.send(data)
    } catch (error) {
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
    const { query } = req.query
    if (!query) res.status(400).send(new Error('Missing term to filter.'))
    try {
        const {
            data
        } = await axios.get < [string] > (CHUCK_NORRIS_API_BASE_URL + `/jokes/search?query=${query}`)
        if (data) res.send(data)
    } catch (error) {
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