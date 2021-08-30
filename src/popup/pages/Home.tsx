
import React from 'react';

import Header from '../components/header';
import { Footer } from '../components/footer';
import AddressList from '../components/address_list';


interface IProps {
    changePage: (page: String) => void
}

interface IState {
}


export class Home extends React.Component<IProps, IState>{

    constructor(props: any) {
        super(props)
      }

    render(){
        return(
            <>
                <Header/>
                <AddressList/>
                <Footer changePage={this.props.changePage}/>
            </>
        );
    }
}

