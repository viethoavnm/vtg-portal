import React from 'react'
import { Icon } from 'antd'

const IconText = (props) => (
  <span>
    <Icon style={{ marginRight: 5 }} {...props} />
    {props.text}
  </span>
)

export default IconText