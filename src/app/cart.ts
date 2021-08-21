export class Cart {
        _id:string;
        items: [];
        totalPrice:number;
        quantity:number;
    
        constructor(_id:string,
        items: [],
        totalPrice:number, quantity:number){
            this._id = _id;
            this.items = items;
            this.totalPrice = totalPrice;
            this.quantity= quantity;
        }
    
    
}
