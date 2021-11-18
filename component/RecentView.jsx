import React from 'react'

export default function RecentView() {
    return (
        <div>
            <h2 className="title title-underline mb-4 ls-normal appear-animate">Your Recent Views</h2>
            <div className="swiper-container swiper-theme shadow-swiper appear-animate pb-4 mb-8" data-swiper-options="{
                    'spaceBetween': 20,
                    'slidesPerView': 2,
                    'breakpoints': {
                        '576': {
                            'slidesPerView': 3
                        },
                        '768': {
                            'slidesPerView': 5
                        },
                        '992': {
                            'slidesPerView': 6
                        },
                        '1200': {
                            'slidesPerView': 8
                        }
                    }
                }">
                <div className="swiper-wrapper row cols-xl-8 cols-lg-6 cols-md-4 cols-2">
                    <div className="swiper-slide product-wrap mb-0">
                        <div className="product text-center product-absolute">
                            <figure className="product-media">
                                <a href="product-defaproduct-default.html">
                                    <img src="assets/images/demos/demo1/products/7-1.jpg" alt="Category image" width={130} height={146} style={{ backgroundColor: '#fff' }} />
                                </a>
                            </figure>
                            <h4 className="product-name">
                                <a href="product-default.html">Women's Fashion Handbag</a>
                            </h4>
                        </div>
                    </div>
                    {/* End of Product Wrap */}
                    <div className="swiper-slide product-wrap mb-0">
                        <div className="product text-center product-absolute">
                            <figure className="product-media">
                                <a href="product-defaproduct-default.html">
                                    <img src="assets/images/demos/demo1/products/7-2.jpg" alt="Category image" width={130} height={146} style={{ backgroundColor: '#fff' }} />
                                </a>
                            </figure>
                            <h4 className="product-name">
                                <a href="product-default.html">Electric Frying Pan</a>
                            </h4>
                        </div>
                    </div>
                    {/* End of Product Wrap */}
                    <div className="swiper-slide product-wrap mb-0">
                        <div className="product text-center product-absolute">
                            <figure className="product-media">
                                <a href="product-defaproduct-default.html">
                                    <img src="assets/images/demos/demo1/products/7-3.jpg" alt="Category image" width={130} height={146} style={{ backgroundColor: '#fff' }} />
                                </a>
                            </figure>
                            <h4 className="product-name">
                                <a href="product-default.html">Black Winter Skating</a>
                            </h4>
                        </div>
                    </div>
                    {/* End of Product Wrap */}
                    <div className="swiper-slide product-wrap mb-0">
                        <div className="product text-center product-absolute">
                            <figure className="product-media">
                                <a href="product-defaproduct-default.html">
                                    <img src="assets/images/demos/demo1/products/7-4.jpg" alt="Category image" width={130} height={146} style={{ backgroundColor: '#fff' }} />
                                </a>
                            </figure>
                            <h4 className="product-name">
                                <a href="product-default.html">HD Television</a>
                            </h4>
                        </div>
                    </div>
                    {/* End of Product Wrap */}
                    <div className="swiper-slide product-wrap mb-0">
                        <div className="product text-center product-absolute">
                            <figure className="product-media">
                                <a href="product-defaproduct-default.html">
                                    <img src="assets/images/demos/demo1/products/7-5.jpg" alt="Category image" width={130} height={146} style={{ backgroundColor: '#fff' }} />
                                </a>
                            </figure>
                            <h4 className="product-name">
                                <a href="product-default.html">Home Sofa</a>
                            </h4>
                        </div>
                    </div>
                    {/* End of Product Wrap */}
                    <div className="swiper-slide product-wrap mb-0">
                        <div className="product text-center product-absolute">
                            <figure className="product-media">
                                <a href="product-defaproduct-default.html">
                                    <img src="assets/images/demos/demo1/products/7-6.jpg" alt="Category image" width={130} height={146} style={{ backgroundColor: '#fff' }} />
                                </a>
                            </figure>
                            <h4 className="product-name">
                                <a href="product-default.html">USB Receipt</a>
                            </h4>
                        </div>
                    </div>
                    {/* End of Product Wrap */}
                    <div className="swiper-slide product-wrap mb-0">
                        <div className="product text-center product-absolute">
                            <figure className="product-media">
                                <a href="product-defaproduct-default.html">
                                    <img src="assets/images/demos/demo1/products/7-7.jpg" alt="Category image" width={130} height={146} style={{ backgroundColor: '#fff' }} />
                                </a>
                            </figure>
                            <h4 className="product-name">
                                <a href="product-default.html">Electric Rice-Cooker</a>
                            </h4>
                        </div>
                    </div>
                    {/* End of Product Wrap */}
                    <div className="swiper-slide product-wrap mb-0">
                        <div className="product text-center product-absolute">
                            <figure className="product-media">
                                <a href="product-defaproduct-default.html">
                                    <img src="assets/images/demos/demo1/products/7-8.jpg" alt="Category image" width={130} height={146} style={{ backgroundColor: '#fff' }} />
                                </a>
                            </figure>
                            <h4 className="product-name">
                                <a href="product-default.html">Table Lamp</a>
                            </h4>
                        </div>
                    </div>
                    {/* End of Product Wrap */}
                </div>
                <div className="swiper-pagination" />
            </div>
        </div>

    )
}
