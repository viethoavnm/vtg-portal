import React from 'react'
import { List, Divider } from 'antd'
import IconText from '../icon-text'
import ImageLoader from '../image-loader'
import slugify from 'utils/url'
import Link from 'components/link'
import moment from 'moment'
import { RESOURCES_THUMB_PATH } from 'consts'

class PostList extends React.PureComponent {
  render() {
    const { list } = this.props
    if (!Array.isArray(list) || list.length === 0)
      return null
    return (
      <List
        className="post-list"
        itemLayout="vertical"
        dataSource={list}
        renderItem={item => (
          <Link key={item.id} className="post-item" href={`/blog/post?postId=${item.id}&thread=${slugify(item.title)}.html`} >
            <span className="post-item__image">
              <ImageLoader
                alt={item.title}
                src={RESOURCES_THUMB_PATH + item.bannerContentName}
              />
            </span>
            <span>
              <span className="post-item__title webkit-text" title={item.title}>
                {item.title}
              </span>
              <div className="post-item__actions">
                <IconText type="clock-circle" text={moment(item.createdDate).format('MMM Do YY')} />
                <Divider type="vertical" />
                <IconText type="eye" text={item.viewCount} />
              </div>
            </span>
          </Link>
        )}
      />
    )
  }
}

export default PostList