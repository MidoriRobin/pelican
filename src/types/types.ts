export interface Item {
  listId: number;
  name: string;
  price: number;
  quantity?: number;
  obtained: boolean;
}

export interface ShopList {
  id?: number;
  name: string;
  items: Item[];
}
