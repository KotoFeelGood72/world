export interface ProductType {
    id: string | number
    img: string
    gallery?: string[]
    title: string
    price: number
    sizes: string[]
    color: string[]
    quantity: number
}