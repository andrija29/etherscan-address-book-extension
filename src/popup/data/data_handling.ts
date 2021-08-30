import localForage from "localforage";
import { Address } from "../../models/address";


//Localforge works 100% offline. "localForage includes a localStorage-backed fallback store for browsers with no IndexedDB or WebSQL support. Asynchronous storage is available in the current versions of all major browsers: Chrome, Firefox, IE, and Safari (including Safari Mobile)."
//NOTE: Storing whole Dictionary list and returning it, modifying and putting back or setting key/value pairs like address/object? For now it's address/object, need to test performance of this.
//This is singleton class just for the performance sake.
export class DatabaseHandler{
    private static instance: DatabaseHandler;

    private constructor(){}
    public static getInstance(): DatabaseHandler{
        if(!DatabaseHandler.instance){
            DatabaseHandler.instance = new DatabaseHandler();
        }

        return DatabaseHandler.instance;
    }

    public addAddress(address: Address){
        return localForage.setItem(address.address, address);
    }

    public removeAddress(address: Address){
        return localForage.removeItem(address.address);
    }

    public updateAddress(address: Address){
        return localForage.setItem(address.address, address);
    }

    public getAllAddresses(){
        let everything: Address[] = [];
        return new Promise((resolve, reject) => {
            localForage.iterate((value: any, key) => {
                everything.push({address: key, nickname: value.nickname})
            }).then(() => { resolve(everything)} ).catch(err => reject(err));
          });
    }
}