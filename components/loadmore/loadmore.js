import React from 'react';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';

const LoadMore = ({ onClick, loadMore, loading }) => {
  if (loadMore)
    return (
      <div className="load-more">
        <Button type="dashed" onClick={onClick} loading={loading}>
          <FormattedMessage id="View more" />
        </Button>
      </div>)
  return null
}

export default LoadMore;