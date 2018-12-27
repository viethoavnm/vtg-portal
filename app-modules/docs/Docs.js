import React from 'react'
import request from 'api'
import Head from 'next/head'
import './Docs.scss'

class Docs extends React.Component {
  state = { content: '' }
  componentDidMount() {
    request.getSetting(this.props.id)
      .then(({ value }) => {
        this.setState({ content: value })
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
        </div>
      </div>)
  }
}

export default Docs;