import React from 'react';

import SettingsIcon from "../../static/icons/settings.png";


interface IProps {
    changePage: (page: String) => void
}

interface IState {
}


export class Footer extends React.Component<IProps, IState> {
    render(){
        return(
            <div className="footer">
                <img src={SettingsIcon} alt="Settings icon" className="settings_icon nav_link" onClick={()=>{this.props.changePage('settings')}}/>
            </div>
        );
    }
}