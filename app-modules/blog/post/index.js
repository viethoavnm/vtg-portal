import React from 'react'
import moment from 'moment'
import { Breadcrumb, Rate, Divider } from 'antd'
import Viewer from 'components/viewer'
import PostList from 'components/post-list'
import ImageLoader from 'components/image-loader'
import IconText from 'components/icon-text'
import request from 'api'
import Fanpage from 'components/facebook/page'
import ShareButton from 'components/facebook/share'
import { strip } from 'utils/html'
import { addJSONLD } from 'utils/seo'
import Link from 'components/link'
import Head from 'next/head'
import {
  APP_URL,
  FB_APP_ID,
  RESOURCES_PATH,
  RESOURCES_THUMB_PATH
} from 'consts'
import { injectIntl } from 'react-intl';

class Post extends React.PureComponent {
  static defaultProps = { post: {} }

  state = { relative: [] }

  componentDidMount() {
    const { categoryId, provinceId } = this.props.post
    request.getRelativeBlog({ categoryId, provinceId })
      .then(({ content: relative }) => { this.setState({ relative }) })
  }

  t = (id) => (this.props.intl.formatMessage({ id }))

  render() {
    const { post } = this.props
    return (
      <React.Fragment>
        <Head>
          <title>{post.title}</title>
          <meta property="og:url" content={APP_URL + post.url} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={strip(post.introduction)} />
          <meta property="og:image" content={APP_URL + RESOURCES_THUMB_PATH + post.bannerContentName} />
          <meta property="fb:app_id" content={FB_APP_ID} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: addJSONLD(post, APP_URL) }} />
          <script>{`(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.2&appId=198992767197026&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));`}
          </script>
          <link href="https://cdn.jsdelivr.net/npm/froala-editor@2.9.1/css/froala_style.min.css" rel="stylesheet" type="text/css" />
        </Head>
        <div id="fb-root"></div>
        <div className="blog__cover">
          <ImageLoader className="cover__image" src={RESOURCES_PATH + post.bannerContentName} alt={post.title} />
          <div className="cover__nest">
            <div className="container cover__nest--flex">
              <span className="cover__left date-time">
                <span className="date-time___day">{moment(post.createdDate).format('dddd')}</span>
                <span className="date-time___date">{moment(post.createdDate).format('MMM Do')}</span>
              </span>
              <div className="cover__right">
                <h1 className="cover__title">{post.title}</h1>
                <ul className="info">
                  <li><IconText type="clock-circle" text={moment(post.createdDate).format('ll')} /></li>
                  <li><IconText type="user" text={post.author ? post.author : '(Anonymous)'} /></li>
                  <li><IconText type="eye" text={post.viewCount} /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="container">
            <div className="blog__breadcrumb">
              <Breadcrumb>
                <Breadcrumb.Item href='/'><IconText type="home" text={this.t('Home')} /></Breadcrumb.Item>
                <Breadcrumb.Item href='/blogs'><IconText type="link" text={this.t('Travel blogs')} /></Breadcrumb.Item>
                <Breadcrumb.Item href={`/blogs?categoryId=${post.categoryId}`}><IconText type="link" text={post.categoryName} /></Breadcrumb.Item>
                <Breadcrumb.Item href={`/blogs?provinceId=${post.provinceId}`}><IconText type="compass" text={post.province} /></Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="blog">
              <div className="blog__left">
                <div>
                  <h4> * Bài viết</h4>
                  <Viewer content={post.introduction} />
                  <Divider />
                </div>
                <article style={{ background: '#fff', padding: '15px' }}>
                  <Viewer content={post.content} />
                </article>
                <Divider />
                <div className="content__footer" style={{ marginTop: 16 }}>
                  <p style={{ fontWeight: 'bold', fontSize: 11 }}>Bản quyền thộc về spetrip.com</p>
                  <h4 className="title">{this.t('Rating post')}</h4>
                  <div style={{ marginTop: 8 }}><Rate /></div>
                  <div style={{ marginTop: 8 }}><ShareButton url={APP_URL + post.url} /></div>
                </div>
              </div>
              <div className="blog__right">
                <div>
                  <div className="blog__title"><span>{this.t('Relative post')}</span></div>
                  <PostList list={this.state.relative} />
                </div>
                <div className="sticky-ads">
                  <div className="blog__title"><span>{this.t('Connect')}</span></div>
                  <Fanpage />
                  <Link className="blog__ads" href="/quang-cao-left"><img src="/static/images/co-ip.jpg"></img></Link>
                </div>
              </div>
            </div>
            <div className="fb-comments" data-href={APP_URL + post.url} data-numposts="5"></div>
          </div>
        </div>
      </React.Fragment >
    )
  }
}

export default injectIntl(Post)