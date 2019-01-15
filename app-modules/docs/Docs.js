import React from 'react';
import request from 'api';
import { Skeleton } from 'antd';

class Docs extends React.Component {
  state = { content: '', loading: false }
  componentDidMount() {
    this.setState({ loading: true })
    request.getSetting(this.props.id)
      .then((content) => {
        this.setState({ content, loading: false })
      })
  }
  render() {
    return (
      <div className="docs-page">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: this.state.content }} className="fr-view" />
          {this.state.loading && <Skeleton active paragraph={{ rows: 10 }} />}
        </div>
      </div>)
  }
}

export default Docs;