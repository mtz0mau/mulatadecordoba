import { createCategoriaAdapter } from "../adapters/useAdapter"
import { generateUrlConfig } from "../helpers"

export const getCategorias = async (config) => {

    const url = generateUrlConfig(`${process.env.URL_BACKEND}/categorias`, {
        limit: config?.limit ? config.limit : 500,
        page: config?.page ? config.page : 1,
        where: config?.where ? config.where : []
    })
    
    const res = {
        data: [],
        meta: {}
    }

    try {
        const response = await fetch(url)
        const result = await response.json()

        if(result.status != 200){
            return res
        }

        result.data.forEach(row => {
            res.data.push(createCategoriaAdapter(row))
        })
        res.meta = result.meta
    } catch (error) {
        console.log(error)
    }

    return res
}