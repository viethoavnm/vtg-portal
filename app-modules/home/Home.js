import React from 'react';
import { Icon } from 'antd';
import Card from 'components/card';
import Search from 'components/search';
import Slider from 'components/slider';
import Banner from 'components/banner';
import Advertisement from './HomeAds';
import Places from './HomePlaces';
import request from 'api';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Router from 'next/router';
import Link from 'next/link';

class Home extends React.PureComponent {
  state = { places: [], sales: [], suggestions: [] }

  componentDidMount() {
    request.getTopPlaces().then(({ content: places }) => { this.setState({ places }) })
    request.getTopSaleOff().then(({ content: sales }) => { this.setState({ sales }) })
    request.getTopViewCount().then(({ content: suggestions }) => { this.setState({ suggestions }) })
  }

  onItemSelect = ({ id }) => {
    Router.push({
      pathname: `/hotel/${id}`,
      query: { objectId: id, objectType: 'HOTEL' }
    })
  }

  render = () => {
    const { pageInfo } = this.props
    const { places, sales, suggestions } = this.state
    return (
      <div className="home">
        <Banner pageInfo={pageInfo} />
        <div className="container">
          <Search onSearch={this.onSearch} />
          <Places items={places} />
          <Advertisement />
          <div className="home__title">
            <FormattedMessage id="Top of places" />
            <Link href="hotels/top-of-places"><a><FormattedMessage id="View more" /><Icon type="right" /></a></Link>
          </div>
          <Slider inline slides={sales.map((item, index) => (<Card item={item} key={index.toString()} onClick={this.onItemSelect.bind(this, item)} />))} />
          <div className="home__title">
            <FormattedMessage id="Top of selections" />
            <Link href="hotels/top-of-selections"><a><FormattedMessage id="View more" /><Icon type="right" /></a></Link>
          </div>
          <Slider inline slides={suggestions.map((item, index) => (<Card key={index.toString()} item={item} onClick={this.onItemSelect.bind(this, item)} />))} />
          <br />
        </div>
      </div >
    )
  }
}

export default connect((state) => ({ pageInfo: state.info.HOME }))(Home)