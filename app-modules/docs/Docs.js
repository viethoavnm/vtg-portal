import React from 'react'
import request from 'api'
import Head from 'next/head'
import { Skeleton } from 'antd'
import './Docs.scss'

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
        <Head>
          <link href="https://cdn.jsdelivr.net/npm/froala-editor@2.9.1/css/froala_style.min.css" rel="stylesheet" type="text/css" />
        </Head>
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: this.state.content }} className="fr-view" />
          {this.state.loading && <Skeleton active paragraph={{ rows: 10 }} />}
        </div>
      </div>)
  }
}

export default Docs;