import React from 'react'
/* eslint-disable */

const Viewer = ({ content }) => (
  <div className="fr-view" dangerouslySetInnerHTML={{ __html: content }} />
)

export default Viewer