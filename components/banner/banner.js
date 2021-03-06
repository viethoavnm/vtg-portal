import React from 'react'
import Slider from '../slider'
import ImageLoader from '../image-loader'
import { RESOURCES_PATH } from 'consts'

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
            {/* APP_NAME */}
          </h4>
          <p className="banner__slogan">
            {/* APP_SLOGAN */}
          </p>
        </a>
      </div>
      <div className="banner__ads">
        <a href={pageInfo.url1}>
          <div>
            <ImageLoader src={RESOURCES_PATH + pageInfo.ads1} />
          </div>
        </a>
        <a href={pageInfo.url2}>
          <div>
            <ImageLoader src={RESOURCES_PATH + pageInfo.ads2} />
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