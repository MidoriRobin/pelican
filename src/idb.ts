import { readonly } from "vue";
import type { ShopList } from "./types/types";

const DB_NAME = "listdb";
const DB_VERSION = 1;
let DB: IDBDatabase;

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

      request.onupgradeneeded = (e: any) => {
        console.log("onupgradeneeded");
        const db: IDBDatabase = e.target.result;
        db.createObjectStore("lists", {
          autoIncrement: true,
          keyPath: "id",
        });
      };
    });
  },

  /**
   *  Gets All shoplists registered to db
   */
  async getLists(): Promise<ShopList[]> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const trans = db.transaction(["lists"], "readonly");

      trans.oncomplete = () => {
        resolve(lists);
      };

      trans.onerror = (event) => {
        console.log("An error occured trying to get all lists", event);
      };

      const store = trans.objectStore("lists");
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
      const trans = db.transaction(["lists"], "readonly");

      trans.oncomplete = () => {
        resolve(shopList);
      };

      trans.onerror = (event) => {
        console.log("An error occured trying to get the list", event);
        reject();
      };

      const store = trans.objectStore("lists");
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
      const trans = db.transaction(["lists"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      const store = trans.objectStore("lists");
      id ? store.put(list, id) : store.put(list);
    });
  },

  /**
   * Deletes a shop list from database
   * @param id Id of shop list to be deleted
   */
  async deleteList(id: number) {
    const db = await this.getDb();

    return new Promise<void>((resolve) => {
      const trans = db.transaction(["lists"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      const store = trans.objectStore("lists");
      store.delete(id);
    });
  },

  async deleteAllLists() {
    const db = await this.getDb();

    return new Promise<void>((resolve) => {
      const trans = db.transaction(["lists"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      const store = trans.objectStore("lists");
      store.clear();
    });
  },
};
