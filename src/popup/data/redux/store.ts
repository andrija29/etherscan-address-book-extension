import { createStore, applyMiddleware, Store } from "redux"
import thunk from "redux-thunk"
import { DictionaryState, AddressAction, DispatchType } from "./types";

import reducer from "./reducers";

const store: Store<DictionaryState, AddressAction> & { dispatch: DispatchType } = createStore(reducer, applyMiddleware(thunk));

export default store;