import React, { Component } from 'react';
import { connect } from 'react-redux';

class Mesh extends Component {

    render(){
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, child =>
          React.cloneElement(child,{ name:this.props.name})
        );
        return (
            <div>
            {childrenWithProps}
            </div>
        )
    }
}

function mapStatetoProps(state,props){
    return{
        
    }
}
export default connect(mapStatetoProps,{})(Mesh)