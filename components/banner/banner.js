import React from 'react'
import Slider from '../slider'
import ImageLoader from '../image-loader'
import { RESOURCES_PATH } from 'consts'
import './banner.scss'

const Banner = ({ pageInfo }) => (
  <div className="banner animated bounceInLeft">
    <div className="banner__overlay overlay">
      <div className="overlay__slider slider">
        <Slider
          settings={settings}
          slides={pageInfo.contentNames
            ? pageInfo.contentNames.map((img, index) =>
              (<ImageLoader
                alt={img}
                className="slider__image"
                src={RESOURCES_PATH + img}
                key={index.toString()} />))
            : null}
        />
        <a href="/" className="banner__slogan-wrapper">
          <h4 className="banner__app-name">
            APP_NAME
          </h4>
          <p className="banner__slogan">
            APP_SLOGAN
          </p>
        </a>
      </div>
      <div className="banner__ads">
        <a href="/">
          <div>
            <ImageLoader src={RESOURCES_PATH + '6fae2b1e-79ae-46e3-8c29-71df8b864f8a.jpg'} />
          </div>
        </a>
        <a href="/">
          <div>
            <ImageLoader src={RESOURCES_PATH + '93da99ba-98ec-47c0-a187-3d81048a23ef.jpg'} />
          </div>
        </a>
      </div>
    </div>
  </div>
)

Banner.defaultProps = {
  pageInfo: {}
}

export default Banner
const settings = {
  dots: true,
  infinite: true,
  speed: 1500,
  autoplay: true,
  fade: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
}