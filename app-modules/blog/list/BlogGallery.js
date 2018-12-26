import React from 'react'
import moment from 'moment'
import { Skeleton } from 'antd'
import IconText from 'components/icon-text'
import ImageLoader from 'components/image-loader'
import Link from 'components/link'
import slugify from 'utils/url'
import { RESOURCES_THUMB_PATH } from 'consts'

const BlogGallery = ({ list = [] }) => {
  let card = list.map((item) => (
    item ?
      <Link href={`/blog/post?postId=${item.id}&thread=${slugify(item.title)}.html`}>
        <ImageLoader src={RESOURCES_THUMB_PATH + item.bannerContentName} />
        {item.province && <span className="gallery__label">{item.province}</span>}
        <span className="gallery__title">
          <h4 title={item.title}>{item.title}</h4>
          <div>
            <IconText type="clock-circle" text={moment().format('ll')} />
            <span className="view-count">
              <IconText type="eye" text={item.viewCount} />
            </span>
          </div>
        </span>
      </Link>
      : <Skeleton active />
  ))
  return (
    <div className="gallery">
      <div className="gallery__overlay">
        <div className="gallery__item gallery__item--big">
          {card[0]}
        </div>
        <div className="gallery__item gallery__item--two-item">
          <div className="gallery__sub-item">
            {card[1]}
          </div>
          <div className="gallery__sub-item">
            {card[2]}
          </div>
        </div>
        <div className="gallery__item gallery__item--two-item">
          <div className="gallery__sub-item">
            {card[3]}
          </div>
          <div className="gallery__sub-item">
            {card[4]}
          </div>
        </div>
      </div>
    </div>)
}
export default BlogGallery