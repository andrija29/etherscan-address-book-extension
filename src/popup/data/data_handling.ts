import { getBucket } from "@extend-chrome/storage";
import { DBDictionary } from "../data/redux/types";
import { Address } from "../../models/address";


//NOTE: Storing whole Dictionary list and returning it, modifying and putting back or setting key/value pairs like address/object? For now it's address/object, need to test performance of this.
//This is singleton class just for the performance sake.

export class DatabaseHandler {
  private static instance: DatabaseHandler;
  private static dbStore = getBucket<DBDictionary>("etherscan_dictionary_bucket");

  private constructor() {}
  public static getInstance(): DatabaseHandler {
    if (!DatabaseHandler.instance) {
      DatabaseHandler.instance = new DatabaseHandler();
    }
    return DatabaseHandler.instance;
  }

  public addAddress(_address: Address) {
    return DatabaseHandler.dbStore.set(({ allAddresses }) => {
        let oldArray = allAddresses || [];
      return { allAddresses: oldArray.concat(_address) };
    });
  }

  public removeAddress(_address: Address) {
    return DatabaseHandler.dbStore.set(({ allAddresses }) => {
        const updatedAddresses: Address[] = allAddresses.filter(address => address.address !== _address.address)
        return { allAddresses: updatedAddresses };
    });
  }

  public updateAddress(_address: Address) {
    // return DatabaseHandler.dbStore.set(address);
  }

  public getAllAddresses() {
    let everything: Address[] = [];
    return new Promise((resolve) => {
      DatabaseHandler.dbStore.get('allAddresses').then((res) => {
        everything = res.allAddresses;
        resolve(everything);
      });
    });
  }
}
