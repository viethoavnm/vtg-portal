import React from 'react';
import Slider from 'react-slick';

class Preview extends React.PureComponent {
  state = {
    sliderA: null,
    sliderB: null
  }

  componentDidMount() {
    /*eslint-disable-next-line */
    this.setState({
      sliderA: this.sliderA,
      sliderB: this.sliderB
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.thumbs.length > 0 && this.props.thumbs.length === 0) {
      this.sliderA.slickNext();
    }
  }

  render() {
    const { sliderA, sliderB } = this.state;
    return (<div className="preview">
      <div className="row no-gutters">
        <div className="col-7 slick-wrapper inline sliderA">
          <Slider
            {...settingsA}
            asNavFor={sliderB}
            ref={e => (this.sliderA = e)}
          >
            {this.props.thumbs.map((item, index) =>
              (<img src={item} key={index.toString()} alt="img" />))}
          </Slider>
        </div>
        <div className="col-5">
          {/* <Maps location={{ lat: 0, lng: 0 }} /> */}
        </div>
      </div>
      <div className="row">
        <div className="col-12 slick-wrapper inline sliderB">
          <Slider
            {...settingsB}
            asNavFor={sliderA}
            ref={e => (this.sliderB = e)}
          >
            {this.props.thumbs.map((item, index) =>
              (<img src={item} key={index.toString()} alt="img" />))}
          </Slider>
        </div>
      </div>
    </div>
    );
  }
}

export default Preview;

const settingsA = {
  dots: false,
  arrows: false,
  speed: 1000,
  lazyLoad: 'ondemand',
  fade: true
};

const settingsB = {
  dots: false,
  lazyLoad: 'ondemand',
  infinite: true,
  speed: 1000,
  autoplay: true,
  focusOnSelect: true,
  autoplaySpeed: 7500,
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
};