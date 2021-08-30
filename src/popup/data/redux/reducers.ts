import { Address } from "../../../models/address";
import { DictionaryState, AddressAction, ActionTypes  } from "./types";

const initialState: DictionaryState = {
    dictionary: [

    ]
};

const reducer = (state: DictionaryState = initialState, action: AddressAction): DictionaryState => {
    switch(action.type){
      case ActionTypes.ADD_ADDRESS:
        const newAddress: Address = {
            address: action.address.address,
            nickname: action.address.nickname,
          }
          return {
            ...state,
            dictionary: state.dictionary.concat(newAddress)
          };
      case ActionTypes.REMOVE_ADDRESS:
        const updatedDictionary: Address[] = state.dictionary.filter(
            _address => _address.address !== action.address.address
          )
          return {
            ...state,
            dictionary: updatedDictionary,
          };
      case ActionTypes.GET_ALL_ADDRESSES:
        return {
          ...state,
          dictionary: state.dictionary.concat(action.list || [])
        };
    }
    return state;
}

export default reducer;