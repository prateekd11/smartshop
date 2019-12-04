export class Offer
 {
    offerDate : Date;
    productCode : String;
    discountedRate : Number;
    offerName : String;

    constructor(discountedRate: number,offerDate : Date,offerName: string,productCode : string) {
        this.offerDate = offerDate;
        this.discountedRate = discountedRate;
        this.offerName = offerName;
        this.productCode = productCode;
    }
}