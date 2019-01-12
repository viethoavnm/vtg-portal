import React from 'react';

const SocialItem = ({ src, text }) =>
  (<span className="social-item">
    <img src={src} title={text} />
    {text}
  </span>)
export default SocialItem;