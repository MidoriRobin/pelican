import { readonly } from "vue";
import type { ShopList, Item } from "./types/types";

const DB_NAME = "listdb";
const DB_VERSION = 2;
let DB: IDBDatabase;

const SHOPLIST_TABLE_NAME = "shop_list";
const ITEMLIST_TABLE_NAME = "item_list";

export default {
  /**
   * Gets the database object
   */
  async getDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }

      console.log("OPENING DB", DB);

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => {
        console.log("Error opening db", e);
        reject("Error");
      };

      request.onsuccess = (e: any) => {
        DB = e?.target?.result;
        resolve(DB);
      };

      // can this be dynamic?
      //Create an admin page?
      request.onupgradeneeded = (e: any) => {
        console.log("onupgradeneeded");
        const db: IDBDatabase = e.target.result;

        const shopObjStore = db.createObjectStore(SHOPLIST_TABLE_NAME, {
          autoIncrement: true,
          keyPath: "id",
        });

        shopObjStore.createIndex("name", "name", { unique: true });

        const itemObjStore = db.createObjectStore(ITEMLIST_TABLE_NAME, {
          keyPath: ["listId", "name"],
        });
        // itemObjStore.createIndex("name", "name", { unique: true });
      };
    });
  },

  /**
   *  Gets All shoplists registered to db
   */
  async getShopLists(): Promise<ShopList[]> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const trans = db.transaction([SHOPLIST_TABLE_NAME], "readonly");

      trans.oncomplete = async () => {
        const items = lists.map(async (element) =>
          element.items.push(...(await this.getListItems(<number>element?.id)))
        );

        await Promise.all(items);

        console.log("new lists are: ", lists);

        resolve(lists);
      };

      trans.onerror = (event) => {
        console.log("An error occured trying to get all lists", event);
      };

      const store = trans.objectStore(SHOPLIST_TABLE_NAME);
      const lists: ShopList[] = [];

      store.openCursor().onsuccess = (e: any) => {
        const cursor: IDBCursorWithValue = e.target.result;
        if (cursor) {
          lists.push(cursor.value);
          cursor.continue();
        }
        // TODO: Complete
      };
    });
  },

  /**
   *
   * @param id
   */
  async getShopList(id: number): Promise<ShopList> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const trans = db.transaction([SHOPLIST_TABLE_NAME], "readonly");

      trans.oncomplete = () => {
        resolve(shopList);
      };

      trans.onerror = (event) => {
        console.log("An error occured trying to get the list", event);
        reject();
      };

      const store = trans.objectStore(SHOPLIST_TABLE_NAME);
      let shopList: ShopList;

      store.get(id).onsuccess = (e: any) => {
        shopList = e.target.result as ShopList;
      };
    });
  },

  /**
   * Saves a shop list to db
   * @param list
   */
  async saveList(list: ShopList, id?: number) {
    const db = await this.getDb();

    return new Promise<void>((resolve) => {
      const trans = db.transaction([SHOPLIST_TABLE_NAME], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      const store = trans.objectStore(SHOPLIST_TABLE_NAME);
      id ? store.add(list, id) : store.put(list);
    });
  },

  /**
   * Deletes a shop list from database
   * @param id Id of shop list to be deleted
   */
  async deleteList(id: number) {
    const db = await this.getDb();

    this.deleteListItems(id);

    return new Promise<void>((resolve) => {
      const trans = db.transaction([SHOPLIST_TABLE_NAME], "readwrite");
      trans.oncomplete = async () => {
        resolve();
      };

      const store = trans.objectStore(SHOPLIST_TABLE_NAME);
      store.delete(id);
    });
  },

  /**
   * Deletes all list in the list database
   */
  async deleteAllLists() {
    const db = await this.getDb();

    return new Promise<void>((resolve) => {
      const trans = db.transaction([SHOPLIST_TABLE_NAME], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      const store = trans.objectStore(SHOPLIST_TABLE_NAME);
      store.clear();
    });
  },

  /**
   * Fetches all items with the specified listId
   * @param listId list id for items to obtain
   */
  async getListItems(listId: number): Promise<Item[]> {
    const db = await this.getDb();

    return new Promise((resolve) => {
      const trans = db.transaction([ITEMLIST_TABLE_NAME], "readwrite");

      trans.oncomplete = () => {
        resolve(items);
      };

      trans.onerror = (event) => {
        console.log("An error occured trying to get all lists", event);
      };

      const items: Item[] = [];
      const store = trans.objectStore(ITEMLIST_TABLE_NAME);

      store.openCursor().onsuccess = (e: any) => {
        const cursor: IDBCursorWithValue = e.target.result;
        if (cursor) {
          const item = cursor.value as Item;

          if (item.listId == listId) {
            items.push(cursor.value);
          }

          cursor.continue();
        }
      };
    });
  },

  /**
   * Saves the item to idb
   * @param item item object to be saved to list
   */
  async saveListItem(item: Item) {
    const db = await this.getDb();

    return new Promise<void>((resolve) => {
      const trans = db.transaction([ITEMLIST_TABLE_NAME], "readwrite");

      trans.oncomplete = () => {
        resolve();
      };

      trans.onerror = () => {
        console.log("Could not save list item");
      };

      const store = trans.objectStore(ITEMLIST_TABLE_NAME);
      console.log("Saving list item", item);
      store.put(item);
    });
  },

  /**
   * Deletes all the items for the list specified
   * @param listId list id for associated items
   */
  async deleteListItems(listId: number) {
    const items = await this.getListItems(listId);

    return new Promise<void>((resolve) => {
      try {
        items.forEach((element) => this.deleteListItem(element));

        resolve();
      } catch (error) {
        console.log("Error trying to delete all items for list: ", listId);
      }
    });
  },

  /**
   * Deletes an item from the database
   * @param item Item object to be deleted
   */
  async deleteListItem(item: Item) {
    const db = await this.getDb();

    return new Promise<void>((resolve) => {
      const trans = db.transaction([ITEMLIST_TABLE_NAME], "readwrite");

      trans.oncomplete = () => {
        resolve();
      };

      trans.onerror = () => {
        console.log("Could not delete list item");
      };

      const store = trans.objectStore(ITEMLIST_TABLE_NAME);
      console.log("Deleting item: ", item);
      store.delete([item.listId, item.name]);
    });
  },

  async updateListItem(item: Item, listId: number) {
    const db = await this.getDb();

    return new Promise<void>((resolve) => {
      const trans = db.transaction([ITEMLIST_TABLE_NAME], "readwrite");

      trans.oncomplete = () => {
        resolve();
      };

      trans.onerror = () => {
        console.log("Could not update item in list");
      };

      const store = trans.objectStore(ITEMLIST_TABLE_NAME);
      console.log("Updating item: ", item);
      store.put(item, [listId, item.name]);
    });
  },
};
