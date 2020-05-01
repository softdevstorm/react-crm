import React, { Component } from 'react';
import Slider from 'react-slick';
import Config from '../../config';
import { connect } from "react-redux";
import { setMessageId } from '../../lib/store/action/filter';

class SlickSliderWithImage extends Component {
    
    constructor(props) {
        super(props);
        this.setClickedMessageId = this.setClickedMessageId.bind(this);
        this.state = {
            messages: props.messages
        }
    }

    componentDidUpdate(prevprops, prevstate) {
        if (prevprops.messages != this.props.messages) {
            this.setState({messages: this.props.messages});
        }
    }

    setClickedMessageId(event) {
        const clickedMessageId = event.currentTarget.getAttribute('data-message-id');
        this.props.dispatch(setMessageId(clickedMessageId));
    }

    render() {
        const settings = {
            dots: true,
            infinite: false,
            slidesToShow: 5,
            speed: 500,
            slidesToScroll: 5
        };

        return (
            <div>
                <Slider {...settings}>
                    {this.state.messages.map(message =>
                        <div className="thumbnail-item" key={message.id} data-message-id = {message.id} onClick={this.setClickedMessageId}>
                            <div className="thumbnail-top">
                                <img src={message.logo} />
                                <div>
                                    <span className="company">{message.company}</span>
                                    <span className="date">{message.received_on}</span>
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

const mapStateToProps = (state) => {
    return {
        messageId: state.filter.messageId
    }
}

export default connect(mapStateToProps)(SlickSliderWithImage);