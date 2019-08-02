import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './Collapser.css';

class Collapser extends Component {
    constructor(props){
        super(props);
        this.state={
            open:true
        }
    }
    render() {
        return (
            <Collapsible openedClassName ="collapse-border" transitionTime={100}  
                open={true}  
                onOpen={()=>{
                    this.setState({open:true})
                }}
                onClose={()=>{
                    this.setState({open:false})
                }}
            trigger={
                <div className="trigger font-weight-bold">
                    <span>{this.props.name}</span>
                    <span className={`fas float-right arrow ${this.state.open?'fa-chevron-up':'fa-chevron-down'}`}></span>
                </div>
            }>
                {this.props.children}
            </Collapsible>
        );
    }
}

export default Collapser;