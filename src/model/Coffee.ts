
export type Coffee={
    id:string,
    name:string,
    price:number,
    quantity:number,
    status:CoffeeStatus
}

export enum CoffeeStatus {
    "ON_STOCK" = "on_stock",
    "SOLD" = "sold"
}