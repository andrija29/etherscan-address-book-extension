import { Address } from "../models/address";
import { DBDictionary } from "../popup/data/redux/types";
import { getBucket } from "@extend-chrome/storage";

import "../styles/site_style.scss";

let dictionary: Address[] = [];

//This listens for dictionary changes and translates using new dictionary.
let dbStore = getBucket<DBDictionary>("etherscan_dictionary_bucket");
dbStore.valueStream.subscribe((values) => {
    dictionary = values.allAddresses;
    findAndReplaceAddresses();
});

function findAndReplaceAddresses(): void{
    let all = document.querySelectorAll("a, #mainaddress");

    //NOTE: This could probably be done faster...
    //Don't waste resources if there is nothing to translate
    if(dictionary.length > 0){
        for(let i = 0; i < all.length; i++){
            let data = isInDictionary(all[i].textContent?.toString() || "");
            if(data !== null){
                all[i].textContent = data.nickname; 
                all[i].classList.add("hash-tag-nicknamed")
            }
        }
    }
}

function isInDictionary(_address: String): Address | null{
    let index = dictionary.findIndex( el => el.address === _address);
    if(index > -1) return dictionary[index];
    return null;
}