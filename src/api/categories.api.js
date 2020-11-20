import httpClient from '@/api/httpClient'

export const getAllCategories = (options) => httpClient.get('/api/categories', { params: options })

export const getCategory = (options) => httpClient.get('/api/category', { params: options })
