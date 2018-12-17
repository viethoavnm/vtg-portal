import React from 'react'
import { Button } from 'antd'
import './loadmore.scss'

const LoadMore = ({ onClick, loadMore, loading }) => {
  if (loadMore)
    return (
      <div className="load-more">
        <Button type="dashed" onClick={onClick} loading={loading}>
          VIEW_MORE
        </Button>
      </div>)
  return null
}

export default LoadMore 