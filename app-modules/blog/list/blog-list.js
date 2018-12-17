import React from 'react'
import { List, Skeleton } from 'antd'
import Item from './blog-item'
import LoadMore from 'components/loadmore'

const MAX_ITEM_LOADING = 5

const CustomList = ({ list, loading, loadMore, onLoadMore }) => (
  <List
    className="blog-list"
    itemLayout="horizontal"
    dataSource={loading ? list.concat([...new Array(MAX_ITEM_LOADING)]) : list}
    loadMore={<LoadMore
      loading={loading}
      loadMore={loadMore}
      onClick={onLoadMore}
    />}
    renderItem={(item) => {
      if (!item)
        return (<Skeleton active />)
      return (<Item
        item={item}
        key={item.id}
      />)
    }}
  />
)

export default CustomList