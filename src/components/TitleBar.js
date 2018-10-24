import React, { Component } from 'react';
import { NON_DRAGGABLE } from '../Constants';

class TitleBar extends Component {
    shouldComponentUpdate(nextProps){

        return true;
    }

    componentDidUpdate(old) {
        console.log(this.props)
    }

    render() {
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, child =>
          React.cloneElement(child,{ className:"mx-1 "+NON_DRAGGABLE+" "+child.props.className})
        );
        console.log(childrenWithProps)
        return (
            <div className="fixed-top text-white-50 bg-dark" style={{ width: this.props.width + "px" }}>
                <div className="mx-1 d-inline">{this.props.name ? this.props.name : null}
                </div>
                {childrenWithProps}
            </div>
        );
    }
}

export default TitleBar;