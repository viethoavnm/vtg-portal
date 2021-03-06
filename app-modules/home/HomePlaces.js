import React from 'react';
import Router from 'next/router';
import { Icon, Skeleton } from 'antd';
import { RESOURCES_PATH } from 'consts';
import { FormattedMessage } from 'react-intl';
import ImageLoader from 'components/image-loader';

export default class TopPlaces extends React.PureComponent {

  onClick = (selected) => () => {
    Router.push({
      pathname: `/hotel`,
      query: {
        objectId: selected.id,
        objectType: 'PLACE'
      }
    })
  }

  render() {
    const { items } = this.props
    return (
      <React.Fragment>
        <div className="home__title"><FormattedMessage id="Top of places" /></div>
        <div className="home__places places">
          {items.slice(0, 5).map((item, i) => (
            <div className={`places__item item ${i < 2 ? 'places__item--long' : 'places__item--short'}`} key={i.toString()} >
              {
                item ?
                  <a className="item__wrapper" onClick={this.onClick(item)}>
                    <div className="item__overlay">
                      <h4 className="item__name">{item.name}</h4>
                      <span className="item__slogan">{item.slogan}</span>
                      <span className="item__hotel-count">
                        <Icon type="home" theme="filled" />
                        <FormattedMessage id="%d hotels" values={{ value: item.count }} />
                      </span>
                    </div>
                    <ImageLoader
                      className="item__image"
                      src={item.contentNames && item.contentNames.length > 0 ? RESOURCES_PATH + item.contentNames[0] : undefined}
                      alt={item.name} />
                  </a>
                  :
                  <Skeleton active paragraph={{ rows: 4 }} />}
            </div >
          ))}
        </div>
      </React.Fragment>)
  }
}
