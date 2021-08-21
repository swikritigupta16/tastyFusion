export class Items {
    i_id:any;
    _id:number;
    Name: string;
    price: number;
    isEditable:boolean;
    imgPath:string;
    text: any;

    constructor(i_id:any,Name: string,
        price: number,
        isEditable:boolean,
        imgPath:string,
        id:number){
            this._id = id;
            this.i_id = i_id;
            this.Name = Name;
            this.price = price;
            this.isEditable = false;
            this.imgPath = imgPath;
        }
}