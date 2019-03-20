import React from 'react';
import moment from 'moment';
import { Breadcrumb, Rate } from 'antd';
import Viewer from 'components/viewer';
import PostList from 'components/post-list';
import ImageLoader from 'components/image-loader';
import IconText from 'components/icon-text';
import request from 'api';
import Fanpage from 'components/facebook/page';
import ShareButton from 'components/facebook/share';
import { strip } from 'utils/html';
import { addJSONLD } from 'utils/seo';
import Link from 'components/link';
import Head from 'next/head';
import {
  APP_URL,
  FB_APP_ID,
  RESOURCES_PATH,
  RESOURCES_THUMB_PATH
} from 'consts'
import { injectIntl, FormattedMessage } from 'react-intl';

class Post extends React.PureComponent {
  static defaultProps = { post: {} }

  state = { relative: [], copyright: '', province: {}, rated: false }

  componentDidMount() {
    const { categoryId, provinceId } = this.props.post
    request.getRelativeBlog({ categoryId, provinceId, limit: 6 })
      .then(({ content }) => {
        this.setState({ relative: content.slice(0, 6) })
      });
    request.getProvince(provinceId)
      .then((province) => {
        this.setState({ province })
      });
    request.getSetting('BlogCopyright')
      .then((copyright) => {
        this.setState({ copyright });
      });
  }

  t = (id) => (this.props.intl.formatMessage({ id }))

  onRating = (value) => {
    const { id, ratingId } = this.props.post;
    request.rating({
      "objectId": id,
      "objectType": "BLOG",
      "ranks": value,
      "id": ratingId,
      "ratingId": ratingId
    }).then(() => {
      this.setState({ rated: true })
    })
  }

  render() {
    const { post } = this.props;
    const { province } = this.state;
    const ads = { url: '#', src: '/static/images/co-ip.jpg' }
    if (province && province.adsList && province.adsList[1]) {
      ads.url = province.adsList[1].adsUrl
      ads.src = RESOURCES_THUMB_PATH + province.adsList[1].name || ads.src
    }
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
        </Head>
        <div id="fb-root"></div>
        <div className="blog__cover">
          <ImageLoader className="cover__image" src={RESOURCES_PATH + post.bannerContentName} alt={post.title} />
          <div className="cover__nest">
            <div className="container cover__nest--flex">
              <div className="cover__right">
                <h1 className="cover__title webkit-text">{post.title}</h1>
                <ul className="info">
                  <li><IconText type="clock-circle" text={moment(post.lastModify).format('DD/MM/YYYY')} /></li>
                  <li><IconText type="user" text={post.author ? post.author : ' - '} /></li>
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
                <article className="blog__intro">
                  <Viewer content={post.introduction} />
                </article>
                <div className="spacing" />
                <Viewer content={post.content} />
                <div className="content__footer">
                  <div className="blog__copyright" style={{ marginTop: 8 }}>
                    <Viewer content={this.state.copyright} />
                  </div>
                  <h4 className="title" style={{ marginTop: 8 }}><FormattedMessage id='Rating post' /></h4>
                  <div className="rating-box" style={{ marginTop: 8 }}>
                    <Rate defaultValue={post.statisticsRatingRankAvg} onChange={this.onRating} disabled={this.state.rated} />
                    <div className="rating__point" style={{ marginTop: 8 }}>
                      <FormattedMessage id="%d rating." values={{ value: this.state.rated ? post.statisticsRatingCount + 1 : post.statisticsRatingCount }} />
                    </div>
                  </div>
                  <div style={{ margin:'16px 0'  }}>
                    <b>Từ khóa: </b>{post.tagList}
                  </div>
                  <div style={{ marginTop: 8 }}><ShareButton url={APP_URL + post.url} /></div>
                </div>
                <div className="fb-comments" data-href={APP_URL + post.url} data-numposts="3"></div>
              </div>
              <div className="blog__right">
                <div>
                  <div className="blog__title"><span>{this.t('Relative post')}</span></div>
                  <PostList list={this.state.relative} />
                </div>
                <div className="sticky-ads">
                  <div className="blog__title"><span>{this.t('Connect')}</span></div>
                  <Fanpage />
                  <a className="blog__ads" href={ads.url} target="_blank"><img src={ads.src}></img></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment >
    )
  }
}

export default injectIntl(Post)