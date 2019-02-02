import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ContentList.css'

class ContentList extends Component {
  render() {
    return (
      <ul className="contentList">
        {this.props.contentList.map(contentType => {
          return (
            <li className="contentType" key={contentType.name} onClick={()=>this.props.updateContents(contentType.tagTypes)}>
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
