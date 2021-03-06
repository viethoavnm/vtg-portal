import React from 'react';
import moize from 'moize';
import request from 'api';
import Head from 'next/head';
import Router from 'next/router';
import BlogList from './BlogList';
import Gallery from './BlogGallery';
import Category from './BlogCategory';
import Province from './BlogProvince';
import { Input, Breadcrumb } from 'antd';
import IconText from 'components/icon-text';
import PostList from 'components/post-list';
import Fanpage from 'components/facebook/page';
import { injectIntl } from 'react-intl';
import { RESOURCES_PATH } from 'consts';

class Blogs extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { content: [], topView: [], loading: false, last: false }
  }

  fetch(page = 0) {
    this.setState({ loading: true })
    const { query } = this.props
    const isSearch = !!query && (!!query.text || !!query.categoryId || !!query.provinceId)
    if (isSearch) {
      request.searchBlog({
        page,
        provinceId: query.provinceId,
        categoryId: query.categoryId,
        key: query.text,
        status: 'PUBLISHED',
        sort: 'lastModify,desc'
      })
        .then((data) => {
          this.setState({
            ...data,
            loading: false,
            content: this.state.content.concat(data.content)
          })
        })
        .catch(() => {
          this.setState({ loading: false })
        })
    } else
      request.getBlogList({ page, sort: 'lastModify,desc' })
        .then((data) => {
          this.setState({
            ...data,
            loading: false,
            content: this.state.content.concat(data.content)
          })
        })
        .catch(() => {
          this.setState({ loading: false })
        })
  }

  onLoadMore = () => {
    this.fetch(this.state.number + 1)
  }

  componentDidMount() {
    request.getTopViewBlog({})
      .then(({ content }) => { this.setState({ topView: content.slice(0, 6) }) })
    this.fetch()
  }

  onSearch(value) {
    Router.push({
      pathname: '/blogs',
      query: { text: value }
    })
  }

  onChangeCategory = ({ key }) => {
    Router.push({
      pathname: '/blogs',
      query: { categoryId: key !== 'all' ? key : null }
    })
  }

  onChangeProvince = (key) => {
    Router.push({
      pathname: '/blogs',
      query: { provinceId: key !== 'all' ? key : null }
    })
  }

  t = moize((id, values) => (this.props.intl.formatMessage({ id }, values)))

  render() {
    const { content, topView, loading, last } = this.state
    const { pageInfo, category, province, query } = this.props
    const isSearch = !!query && (!!query.text || !!query.categoryId || !!query.provinceId)
    const text = !isSearch
      ? this.t('New posts') : province
        ? this.t('Posts in value', { value: province.name })
        : category ? this.t('Posts in value', { value: category.title })
          : this.t('Search result', { value: query.text })
    const adsF = { url: pageInfo.url1, src: RESOURCES_PATH + pageInfo.ads1 }
    const adsS = { url: pageInfo.url2, src: RESOURCES_PATH + pageInfo.ads2 }
    if (province && province.adsList) {
      adsF.url = province.adsList[0].adsUrl
      adsS.url = province.adsList[1].adsUrl
      adsF.src = RESOURCES_PATH + province.adsList[0].name || adsF.src
      adsS.src = RESOURCES_PATH + province.adsList[1].name || adsS.src
    }
    return (
      <div className="container no-padding">
        <Head><title>{text}</title></Head>
        {!isSearch && <Gallery list={content.slice(0, 5)} />}
        <div className="blog__breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item href='/'><IconText type="home" text={this.t('Home')} /></Breadcrumb.Item>
            <Breadcrumb.Item href="/blogs"><IconText type="link" text={this.t('Travel blogs')} /></Breadcrumb.Item>
            {category && <Breadcrumb.Item href={`/blogs?category=${category.id}`}><IconText type="link" text={category.title} /></Breadcrumb.Item>}
            {province && <Breadcrumb.Item><IconText type="link" text={province.name} /></Breadcrumb.Item>}
          </Breadcrumb>
        </div>
        {province && <div className="blog-province">
          <div className="blog-province__info">
            <h3 className="name">{province.name}</h3>
            <p className="intro">{province.introduction}</p>
          </div>
          <div className="blog-province__banner">
          </div>
        </div>}
        <div className="blog">
          <div className="blog__left">
            <div className="blog__title"><span>{text}</span></div>
            <BlogList
              loading={loading}
              loadMore={!last}
              onLoadMore={this.onLoadMore}
              list={isSearch ? content : content.slice(5)}
            />
          </div>
          <div className="blog__right">
            <div>
              <div className="blog__title"><span>{this.t('Search')}</span></div>
              <div style={{ marginTop: 16 }}>
                <Province onSelect={this.onChangeProvince} selected={query.provinceId || 'all'} />
              </div>
              <Input.Search
                style={{ marginTop: 16 }}
                onSearch={this.onSearch}
                placeholder={this.t('Search post')}
                enterButton={this.t('Act Search')}
              />
            </div>
            <div>
              <div className="blog__title"><span>{this.t('Category')}</span> </div>
              <Category onSelect={this.onChangeCategory} selected={query.categoryId || 'all'} />
            </div>
            <div>
              <a className="blog__ads" href={adsF.url} target="_blank"><img src={adsF.src}></img></a>
            </div>
            <div>
              <div className="blog__title"><span>{this.t('Most reading posts')}</span></div>
              <PostList list={topView} />
            </div>
            <div className="sticky-ads">
              <div className="blog__title"><span>{this.t('Connect')}</span></div>
              <Fanpage />
              <a className="blog__ads blog__ads--long" href={adsS.url} target="_blank"><img src={adsS.src}></img></a>
            </div>
          </div>
        </div>
      </div >)
  }
}
Blogs.defaultProps = {
  pageInfo: {}
}
export default injectIntl(Blogs)