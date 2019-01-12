import React from 'react';
import moment from 'moment';
import slugify from 'utils/url';
import { Skeleton } from 'antd';
import Link from 'components/link';
import { FormattedMessage } from 'react-intl';
import { RESOURCES_THUMB_PATH } from 'consts';
import ImageLoader from 'components/image-loader';

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
            <h4 className="item__title webkit-text" title={item.title}>{item.title}</h4>
            <div className="item__info info">
              <span className="info__author">{item.author ? item.author : 'Unknown'}</span>
              <span className="info__time">{moment(item.modifiedDate).format('DD/MM/YYYY')}</span>
              <span className="info__count"><FormattedMessage id="%d views" values={{ value: item.viewCount }} /></span>
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