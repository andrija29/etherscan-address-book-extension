
import React from 'react';


interface IProps {
    changePage: (page: String) => void
}

interface IState {
}


export class Settings extends React.Component<IProps, IState>{

    constructor(props: any) {
        super(props)
      }

    render(){
        return(
            <h1 className="nav_link" onClick={()=>{this.props.changePage('home')}}>Back</h1>
        );
    }
}

