import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setActiveMaterial } from '../../actions/MaterialAction'
import { NavLink, withRouter } from 'react-router-dom'
import './MaterialItem.css'

class MaterialItem extends Component {
  constructor(props){
    super(props);
    this.updateContents=this.updateContents.bind(this);
    this.setActiveMaterial=this.props.setActiveMaterial.bind(this);
  }

  componentDidMount(){
    window.onpopstate = (e)=>{
      console.log(e)
      console.log(this.props)
    }
  }

  updateContents(name){
    //this.setState({active:name});
    this.setActiveMaterial(name);
  }

  render() {
    return (
      <li className={`list-group-item materialType ${this.props.activeMaterial && this.props.materialName===this.props.activeMaterial.name?"activeType":""}`}>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value=""/>
          <NavLink className="materialLink w-100 d-inline-block" activeClassName="activex" onClick={()=>this.updateContents(this.props.materialName)} to={"/material/"+this.props.materialName}>{this.props.materialName}</NavLink>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
    activeMaterial:state.MaterialReducer.activeMaterial
})

export default withRouter(connect(mapStateToProps, {setActiveMaterial})(MaterialItem))
