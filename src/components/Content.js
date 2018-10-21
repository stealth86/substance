import React, { Component } from 'react';
import { connect } from 'react-redux';

class Content extends Component {
    render(){
        return (
            <div>
            {this.props.children}
            </div>
        )
    }
}

function mapStatetoProps(state,props){
    return{
    }
}
export default connect(mapStatetoProps,{})(Content)