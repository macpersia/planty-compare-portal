export interface IPurchasingPower {
  id?: string;
  year?: string;
  city?: string;
  category?: string;
  value?: number;
}

export class PurchasingPower implements IPurchasingPower {
  constructor(public id?: string, public year?: string, public city?: string, public category?: string, public value?: number) {}
}
