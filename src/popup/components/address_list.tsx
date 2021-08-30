import React from 'react';
import { connect } from 'react-redux';
import { List } from 'react-virtualized';
import { Address } from "../../models/address";
import { getAllAddresses } from "../data/redux/actions";

interface IProps {
    dictionary: Address[],
    getAllAddresses?: any
}

interface IState {
    
}

type RowData = {
    key: any, // Unique key within array of rows
    index: any, // Index of row within collection
    isScrolling: any, // The List is currently being scrolled
    isVisible: any, // This row is visible within the List (eg it is not an overscanned row)
    style: any // Style object to be applied to row (to position it)
}


class AddressList extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);
    }

    componentDidMount() {
        this.props.getAllAddresses();
    }

    rowRenderer = (RowData: RowData) => {
        return (
          <div key={RowData.key} style={RowData.style}>
            <div>{this.props.dictionary[RowData.index].address}</div>
          </div>
        );
    }

    render(){
        return(
            <div className="list_wrapper">
                <List
                    height={400}
                    width={300}
                    rowHeight={30}
                    rowRenderer={this.rowRenderer}
                    rowCount={this.props.dictionary.length}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, { getAllAddresses })(AddressList);

function mapStateToProps(state: any) {
    return { dictionary: state.dictionary };
}

