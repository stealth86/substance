import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ContentList.css'

class ContentList extends Component {
  constructor(props){
    super(props);
    this.updateContents=this.updateContents.bind(this);
    this.state={
      active:null
    }
  }

  updateContents(name,tagTypes){
    this.setState({active:name});
    this.props.updateContents(tagTypes);
  }

  render() {
    return (
      <ul className="list-group list-group-flush p-2">
        {this.props.contentList.map(contentType => {
          return (
            <li className={`list-group-item contentType text-white-50 ${this.state.active===contentType.name?"activeType":""}`} key={contentType.name} onClick={()=>this.updateContents(contentType.name,contentType.tagTypes)}>
              {contentType.name}
            </li>)
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  contentList: state.ContentListReducer.contentList
})


export default connect(mapStateToProps, {})(ContentList)
