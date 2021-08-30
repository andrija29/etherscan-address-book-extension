
import { Address } from "../../../models/address";
import { DatabaseHandler } from "../data_handling";
import {
    ActionTypes,
    DispatchType,
    AddressAction
} from "./types";

const DataHandler = DatabaseHandler.getInstance();


export const addAddress = (_address: Address) => async (dispatch: DispatchType) => {
    try{
        await DataHandler.addAddress(_address);
        let obj = {address: _address.address, nickname: _address.nickname} as Address;
        dispatch({type: ActionTypes.ADD_ADDRESS, address: obj} as AddressAction);
        return Promise.resolve(obj);
    }catch(err){
        return Promise.reject(err);
    }
};

export const removeAddress = (_address: Address) => async (dispatch: DispatchType) => {
    try{
        await DataHandler.removeAddress(_address);
        let obj = {address: _address.address, nickname: _address.nickname} as Address;
        dispatch({type: ActionTypes.REMOVE_ADDRESS, address: obj} as AddressAction);
        
        return Promise.resolve(obj);
    }catch(err){
        return Promise.reject(err);
    }
};

export const updateAddress = (_address: Address) => async (dispatch: DispatchType) => {
    try{
       await DataHandler.updateAddress(_address);
        let obj = {address: _address.address, nickname: _address.nickname} as Address;
        dispatch({type: ActionTypes.UPDATE_ADDRESS, address: obj} as AddressAction);
        
        return Promise.resolve(obj);
    }catch(err){
        return Promise.reject(err);
    }
};

export const getAllAddresses = (_address: Address) => async (dispatch: DispatchType) => {
    try{
        let res = await DataHandler.getAllAddresses();
        dispatch({type: ActionTypes.GET_ALL_ADDRESSES, list: res} as AddressAction);
        
        return Promise.resolve(res);
    }catch(err){
        return Promise.reject(err);
    }
};