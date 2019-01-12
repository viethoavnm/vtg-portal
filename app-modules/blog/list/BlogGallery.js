import React from 'react'
import moment from 'moment'
import { Skeleton } from 'antd'
import IconText from 'components/icon-text'
import ImageLoader from 'components/image-loader'
import Link from 'components/link'
import slugify from 'utils/url'
import { RESOURCES_THUMB_PATH } from 'consts'

const BlogGallery = ({ list = [] }) => {
  const dataSource = list.map((item) => (
    <li key={item.id}>
      {item ?
        <Link className="gallery__item item" href={`/blog/post?postId=${item.id}&thread=${slugify(item.title)}.html`}>
          <div className="item__thumb">
            <ImageLoader src={RESOURCES_THUMB_PATH + item.bannerContentName} />
            {item.province && <span className="item__label">{item.province}</span>}
          </div>
          <div className="item__footer">
            <h4 className="item__title" title={item.title}>{item.title}</h4>
            <div className="item__info info">
              <span className="info__time">{moment(item.modifiedDate).format('DD/MM/YYYY')}</span>
              <span className="info__count"> - {item.viewCount} (lượt xem)</span>
            </div>
          </div>
        </Link>
        : <Skeleton active />}
    </li>
  ))
  return (
    <ul className="gallery">
      {dataSource}
    </ul>)
}
export default BlogGallery