import React from 'react'
import { Skeleton } from 'antd'
import Slider from 'react-slick/lib/slider'
import './slider.scss'

export default class Responsive extends React.PureComponent {
  render() {
    const props = this.props.settings ? this.props.settings : settings
    const { inline, slides } = this.props
    const show = slides && slides.length > 0
    return (
      <div className={`slick-wrapper${inline ? " inline" : ''}`}>
        {show
          ? <Slider {...props}>{slides}</Slider>
          : <Skeleton active />}
      </div>
    )
  }
}

const settings = {
  dots: false,
  infinite: true,
  speed: 1500,
  autoplay: true,
  autoplaySpeed: 10000,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        centerMode: true,
      }
    }
  ]
}