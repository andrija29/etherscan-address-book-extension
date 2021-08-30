import "../styles/popup_style.scss";

import React from 'react';
import { render } from 'react-dom';
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";

import { Provider } from 'react-redux';
import store from './data/redux/store';
import { Address } from "../models/address";
import { Message, MessageType } from "../models/messaging";

//This is low level function that has task to delegate signal that dictionary changed! We don't care to pinpoint what changed, we just need to see changes!
store.subscribe(detectedChangeInReduxStore);
function detectedChangeInReduxStore() {
    let newState = store.getState().dictionary as Address[];
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let id = Number(tabs[0].id);
        chrome.tabs.sendMessage(id, { type: MessageType.ClearAndUpdate, data: newState } as Message, function(response) {
          console.log(response);
        });
      });
}

interface IProps {
}

interface IState {
    currentPage?: String;
}

class Root extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        //React Router is not working with extension for some reason. Most likely because popup does not have history to push onto it?!
        //TODO: Find out how to and fix this. This is probably worst way to switch pages.
        this.state = {
            currentPage: "home"
        };
        this.changePage = this.changePage.bind(this);
    }

    changePage(toPage: String){
        this.setState({
            currentPage: toPage
        })
    }

    render(){
        
        return(
            <div className="popup_main_wrapper">
                { this.state.currentPage === "home" && <Home changePage={this.changePage}/> }
                { this.state.currentPage === "settings" && <Settings changePage={this.changePage}/> }
            </div>
        );
    }
}

render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));