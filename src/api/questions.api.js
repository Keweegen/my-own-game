import httpClient from '@/api/httpClient'

export const getQuestions = (options) => httpClient.get('/api/clues', { params: options })

export const getRandomQuestions = (options) => httpClient.get('/api/random', { params: options })
