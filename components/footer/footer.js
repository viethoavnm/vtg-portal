import React from 'react'
import Icon from 'components/icon-text'
import Link from 'components/link'
import ImageLoader from 'components/image-loader'
import { Input } from 'antd'
import { RESOURCES_PATH } from 'consts'
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux'
import './footer.scss'

const Footer = ({ info = {}, intl: { formatMessage } }) => (
  <footer className="footer">
    <div className="footer__box">
      <div className="container">
        <div className="box-white">
          <div className="row">
            <div className="col-sm-5 col-md-2">
              <ImageLoader
                src={RESOURCES_PATH + info.footerLogo}
                alt={info.companyName}
                className="logo" />
            </div>
            <div className="col-sm-7 col-md-5">
              <p className="company-name">{info.companyName}</p>
              <div>{info.addressLineF}<p>{info.addressLineS}</p></div>
              <p>{info.cert}</p>
              <p><a href={'mailto:' + info.email}><Icon type="mail" text={formatMessage({ id: 'Email' })} />: {info.email}</a></p>
              <p><a href={'tel:' + info.hotline}><Icon type="sound" text={formatMessage({ id: 'Hotline' })} />: {info.hotline}</a></p>
            </div>
            <div className="col-sm-5 col-md-2">
              <p className="footer__category">{formatMessage({ id: 'Follow us' })}</p>
              <p><a href={info.fbLink}><Icon type="facebook" text="Facebook" theme="filled" /></a></p>
              <p><a href={info.insLink}><Icon type="instagram" text="Instagram" theme="filled" /></a></p>
              <p><a href={info.ytbLink}><Icon type="youtube" text="Youtube" theme="filled" /></a></p>
              <p><a href={info.twLink}><Icon type="twitter" text="Twitter" /></a></p>
              <p><a href={info.gpLink}><Icon type="google" text="Google +" /></a></p>
            </div>
            <div className="col-sm-7 col-md-3">
              <p className="footer__category">{formatMessage({ id: 'Download app now' })}</p>
              <div><img src="/static/images/appstore.png" alt="appstore" /></div>
              <div style={{ marginTop: 8 }}><img src="/static/images/googleplay.png" alt="googleplay" style={{ height: 20 }} /></div>
              <p className="footer__category">{formatMessage({ id: 'Register email' })}</p>
              <Input.Search
                enterButton={formatMessage({ id: 'Send' })}
                placeholder={formatMessage({ id: 'Input your email' })} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer__box footer__box--light-gray">
      <div className="container">
        <div className="box-link">
          <Link href="/about">{formatMessage({ id: 'About us' })}</Link>
          <Link href="/policy">{formatMessage({ id: 'Term and conditions' })}</Link>
          <Link href="/activity">{formatMessage({ id: 'Operational regulations' })}</Link>
          <Link href="/support">{formatMessage({ id: 'Support' })}</Link>
          <Link href="/contact">{formatMessage({ id: 'Contact' })}</Link>
          <Link href="/career">{formatMessage({ id: 'Recruitment' })}</Link>
        </div>
      </div>
    </div>
    <div className="footer__box footer__box--gray">
      <div className="container">
        <div className="box-gray">
          <span className="copyright">{info.copyright}</span>
          <img src="/static/images/dadangky.png" alt="Đã đăng ký bộ công thương" style={{ marginRight: 24 }} />
          <img src="/static/images/dathongbao.png" alt="Đã thông báo bộ công thương" />
        </div>
      </div>
    </div>
  </footer>
)

const mapState = (state) => ({
  info: state.info.COMMON
})
export default injectIntl(connect(mapState)(Footer))