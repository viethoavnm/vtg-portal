import React from 'react'
import { Card, Rate, Icon } from 'antd'
import ImageLoader from '../image-loader'
import Satisfaction from '../satisfaction'
import { RESOURCES_PATH } from 'consts'
import { FormattedMessage } from 'react-intl';

const Square = ({ item, onClick = () => { } }) => {
  const starRank = 5,
    rate = Math.floor((Math.random() * 21) + 80) / 10,
    commentNum = 112,
    price = 1000000,
    salePrice = 500000,
    salePercent = 50,
    location = 'Hà Nội'
  const { name, address, contentNames } = item
  const thumb = contentNames ? RESOURCES_PATH + contentNames[0] : undefined
  return (
    <Card
      hoverable
      className="square"
      onClick={onClick}
      cover={<ImageLoader className="animated fadeIn" alt={name} src={thumb} />}>
      <div className="square__price">
        <a><FormattedMessage id="Price per night" /></a>
        <span className="strike">{price}</span>
        <FormattedMessage id="Price from" /> <span className="price">{salePrice} </span>
      </div>
      <span className="square__title" title={name}>{name}<Rate count={starRank} value={starRank} /></span>
      <span className="square__address" title={address}><Icon type="environment" />{address}</span>
      <span>
        <Satisfaction rate={rate} />
        <span className="square__comment">
          <FormattedMessage id="%d comments" values={{ value: commentNum }} />
        </span>
      </span>
      <div className="square__discount"><span>-{salePercent}%</span></div>
      <div className="square__location">{location}</div>
    </Card>
  )
}
export default Square