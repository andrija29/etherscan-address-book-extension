import React from 'react';
import { connect } from 'react-redux';
import { Address } from '../../models/address';
import { addAddress } from "../data/redux/actions";

interface IProps {
    addAddress?: any
}

interface IState {
    newAddress: String,
    newNickname: String
}


class Header extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.updateAddressValue = this.updateAddressValue.bind(this);
        this.updateNicknameValue = this.updateNicknameValue.bind(this);
        this.addNewAddress = this.addNewAddress.bind(this);

    }

    updateAddressValue(evt: React.ChangeEvent<HTMLInputElement>){
        let target = evt.target as HTMLInputElement;
        this.setState({
            newAddress: target.value
        });
    }

    updateNicknameValue(evt: React.ChangeEvent<HTMLInputElement>){
        let target = evt.target as HTMLInputElement;
        this.setState({
            newNickname: target.value
        })
    }

    addNewAddress(){
        let address = this.state.newAddress;
        let nickname = this.state.newNickname;

        if(address !== "" || nickname !== ""){
            this.props.addAddress({ address: this.state.newAddress, nickname: this.state.newNickname } as Address);
        }else{
            //TODO: Handle error here!
        }

    }

    render(){
        return(
            <div className="header">
                <input type="text" placeholder="0x000000000000000000000000000000000000dEaD" onChange={this.updateAddressValue}/>
                <input type="text" placeholder="Dead address" onChange={this.updateNicknameValue}/>
                <input type="button" value="Add" onClick={this.addNewAddress} />

            </div>
        );
    }
}

export default connect(null, { addAddress })(Header);
