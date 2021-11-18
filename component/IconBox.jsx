import React from 'react'

export default function IconBox() {
    return (
        <div className="swiper-container  icon-box-wrapper br-sm mt-6 mb-6" data-swiper-options="{
            'slidesPerView': 1,
            'loop': false,
            'breakpoints': {
                '576': {
                    'slidesPerView': 2
                },
                '768': {
                    'slidesPerView': 3
                },
                '1200': {
                    'slidesPerView': 4
                }
            }
        }">
            <div className="swiper-wrapper row cols-md-4 cols-sm-3 cols-1">
                <div className="swiper-slide icon-box icon-box-side icon-box-primary">
                    <span className="icon-box-icon icon-shipping">
                        <i className="w-icon-truck" />
                    </span>
                    <div className="icon-box-content">
                        <h4 className="icon-box-title font-weight-bold mb-1">Free Shipping &amp; Returns</h4>
                        <p className="text-default">For all orders over $99</p>
                    </div>
                </div>
                <div className="swiper-slide icon-box icon-box-side icon-box-primary">
                    <span className="icon-box-icon icon-payment">
                        <i className="w-icon-bag" />
                    </span>
                    <div className="icon-box-content">
                        <h4 className="icon-box-title font-weight-bold mb-1">Secure Payment</h4>
                        <p className="text-default">We ensure secure payment</p>
                    </div>
                </div>
                <div className="swiper-slide icon-box icon-box-side icon-box-primary icon-box-money">
                    <span className="icon-box-icon icon-money">
                        <i className="w-icon-money" />
                    </span>
                    <div className="icon-box-content">
                        <h4 className="icon-box-title font-weight-bold mb-1">Money Back Guarantee</h4>
                        <p className="text-default">Any back within 30 days</p>
                    </div>
                </div>
                <div className="swiper-slide icon-box icon-box-side icon-box-primary icon-box-chat">
                    <span className="icon-box-icon icon-chat">
                        <i className="w-icon-chat" />
                    </span>
                    <div className="icon-box-content">
                        <h4 className="icon-box-title font-weight-bold mb-1">Customer Support</h4>
                        <p className="text-default">Call or email us 24/7</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
