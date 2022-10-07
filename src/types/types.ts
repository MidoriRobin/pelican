export interface Item {
  listId: number;
  name: string;
  price: number;
}

export interface ShopList {
  id?: number;
  name: string;
  items: Item[];
}
