import React from 'react'
import moment from 'moment'
import ImageLoader from 'components/image-loader'
import Link from 'components/link'
import slugify from 'utils/url'
import { strip } from 'utils/html'
import { RESOURCES_THUMB_PATH } from 'consts'
import { FormattedMessage } from 'react-intl';

const BlogItem = ({ item }) => {
  const url = `/blog/post?postId=${item.id}&thread=${slugify(item.title)}.html`
  return (
    <div className="blog-item">
      {/*eslint-disable-next-line */}
      <Link className="blog-item__cover" href={url}>
        <ImageLoader
          alt="images"
          src={`${RESOURCES_THUMB_PATH}${item.bannerContentName
            && item.bannerContentName.indexOf('.jpg') !== -1
            ? item.bannerContentName
            : item.bannerContentName + '.jpg'}`}
        />
      </Link>
      {item.province && <span className="blog-item__place">{item.province}</span>}
      <div className="blog-item__content content">
        <Link className="content__title webkit-text" href={url} title={item.title}>{item.title}</Link>
        <ul className="content__info info">
          <li className="author">{item.author ? item.author : 'Unknown'}</li>
          <li>{moment(item.lastModify).format('DD/MM/YYYY')}</li>
          <li><FormattedMessage id="%d views" values={{ value: item.viewCount }} /></li>
        </ul>
        <div className="content__description webkit-text">
          {strip(item.introduction)}
        </div>
      </div>
    </div>)
}

export default BlogItem