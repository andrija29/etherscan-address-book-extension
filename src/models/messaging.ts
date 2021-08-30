import { Address } from "./address";

export enum MessageType {
    Update,
    ClearAndUpdate,
    Clear,
    DOMReady
};

export type Message = {
    type: MessageType,
    data?: Address[]
};