export interface Item {
  id?: number;
  name: string;
  price: string;
}

export interface ShopList {
  id?: number;
  name: string;
  items: Item[];
}
