import React, { Component } from 'react'
import { connect } from 'react-redux'

class ContentList extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    contentList : state.ContentListReducer.contentList
})


export default connect(mapStateToProps, {})(ContentList)
