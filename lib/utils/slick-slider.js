import React, { Component } from 'react';
import Slider from 'react-slick';
import Config from '../../config';

export default class SlickSliderWithImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: props.messages
        }
    }

    componentDidUpdate(prevprops, prevstate) {
        if (prevprops.messages != this.props.messages) {
            this.setState({messages: this.props.messages});
        }
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 5,
            speed: 500,
            slidesToScroll: 5
        };

        return (
            <div>
                <Slider {...settings}>
                    {this.state.messages.map(message =>
                        <div className="thumbnail-item" key={message.id}>
                            <div className="thumbnail-top">
                                <img src={message.logo} />
                                <div>
                                    <span className="company">{message.company}</span>
                                    <span className="date">${message.received_on}</span>
                                </div>
                            </div>
                            <div className="thumbnail-mid">
                                <span className="subject">{message.subject}</span>
                            </div>
                            <div className="thumbnail-bot">
                                {/* <img src="/images/lazy.gif" data-src={Config.assetsUrl + message.id + '--x720p.gif'} className="lazyload" /> */}
                                <img src={Config.assetsUrl + message.id + '--x720p.gif'} data-src={Config.assetsUrl + message.id + '--x720p.gif'} className="lazyload" />
                            </div>
                        </div>
                    )}
                </Slider>
            </div>
        );
    }
}