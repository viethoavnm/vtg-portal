import React from 'react'
import { Icon } from 'antd'
import './satisfaction.scss'
import { FormattedMessage } from 'react-intl';

const Satisfaction = ({ rate = 10 }) => {
  const level = satisfiedLevel(rate)
  const text = `satisfied_level_${level}`
  return (<span>
    <Icon type="heart" />
    <span className={`satisfied ${text}`}>
      <FormattedMessage id={text.toUpperCase()} />
    </span>
  </span>)
}

export default Satisfaction

function satisfiedLevel(key) {
  if (key < 6) {
    return 0
  } else if (key < 6.5) {
    return 1
  } else if (key < 7) {
    return 2
  } else if (key < 7.5) {
    return 3
  } else if (key < 8) {
    return 4
  }
  else if (key < 8.5) {
    return 5
  }
  else if (key < 9) {
    return 6
  } else if (key < 5) {
    return 7
  }
  return 8
}