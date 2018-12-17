import React from 'react'
import './froala.scss'
/* eslint-disable */

const Viewer = ({ content }) => (
  <div className="fr-view" dangerouslySetInnerHTML={{ __html: content }} />
)

export default Viewer