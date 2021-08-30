import { Address } from "../models/address";
import { Message, MessageType } from "../models/messaging";

import "../styles/site_style.scss";

let dictionary: Address[] = [];

//This listens for dictionary changes and translates using new dictionary.
chrome.runtime.onMessage.addListener(
    function(request) {
        let message = request as Message;
        switch(request.type){
            case MessageType.ClearAndUpdate:
                dictionary = message.data || [];
                findAndReplaceAddresses();
                break;
        }
    }
);

function findAndReplaceAddresses(): void{
    let all = document.getElementsByClassName("hash-tag");

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