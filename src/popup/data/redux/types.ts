import { Address } from "../../../models/address";

export enum ActionTypes {
    ADD_ADDRESS = "ADD_ADDRESS",
    REMOVE_ADDRESS = "REMOVE_ADDRESS",
    UPDATE_ADDRESS = "UPDATE_ADDRESS",
    GET_ALL_ADDRESSES = "GET_ALL_ADDRESSES"
}

export type DictionaryState = {
    dictionary: Address[]
}

export type AddressAction = {
    type: ActionTypes,
    address: Address,
    list?: Address[]
};

export type DBDictionary = {
    allAddresses: Address[]
};

export type DispatchType = (args: AddressAction) => AddressAction;