import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AppContext from "../../storeData/AppContext";
import ProductCard from "../ProductCard";
import SkeletonCard from "../SkeletonCard";

export default function Filter({ products, loading, getmore, ismoredata }) {
  const {
    state: { category },
  } = useContext(AppContext);
  //   const [fdata, setFdata] = useState({catid:'',brandid:'',min:null,max:null,sort_by:null})
  //   const setFilterData = (id) => {

  //   }
  const route = useRouter();
  return (
    <main className="main">
      {/* Start of Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb bb-no">
            <li>
              <a href="demo1.html">Home</a>
            </li>
            <li>
              <a href="shop-banner-sidebar.html">Shop</a>
            </li>
            <li>4 Columns</li>
          </ul>
        </div>
      </nav>
      {/* End of Breadcrumb */}
      {/* Start of Page Content */}
      <div className="page-content">
        <div className="container">
          {/* Start of Shop Banner */}
          <div
            className="shop-default-banner banner d-flex align-items-center mb-5 br-xs"
            style={{
              "background-image": "url(assets/images/shop/banner1.jpg)",
              "background-color": "#FFC74E",
            }}
          >
            <div className="banner-content">
              <h4 className="banner-subtitle font-weight-bold">
                Accessories Collection
              </h4>
              <h3 className="banner-title text-white text-uppercase font-weight-bolder ls-normal">
                Smart Wrist Watches
              </h3>
              <a
                href="shop-banner-sidebar.html"
                className="btn btn-dark btn-rounded btn-icon-right"
              >
                Discover Now
                <i className="w-icon-long-arrow-right" />
              </a>
            </div>
          </div>

          {/* Start of Shop Content */}
          <div className="shop-content row gutter-lg mb-10">
            {/* Start of Sidebar, Shop Sidebar */}
            <aside className="sidebar shop-sidebar sticky-sidebar-wrapper sidebar-fixed">
              {/* Start of Sidebar Overlay */}
              <div className="sidebar-overlay" />
              <a className="sidebar-close" href="#">
                <i className="close-icon" />
              </a>
              {/* Start of Sidebar Content */}
              <div className="sidebar-content scrollable">
                {/* Start of Sticky Sidebar */}
                <div className="pin-wrapper" style={{ height: "1805px" }}>
                  <div
                    className="sticky-sidebar"
                    style={{
                      "border-bottom": "0px none rgb(102, 102, 102)",
                      width: "280px",
                    }}
                  >
                    <div className="filter-actions">
                      <label>Filter :</label>
                      <Link href="/products">
                        <a className="btn btn-dark btn-link filter-clean">
                          Clean All
                        </a>
                      </Link>
                    </div>
                    {/* Start of Collapsible widget */}
                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <span>All Categories</span>
                        <span className="toggle-btn" />
                      </h3>
                      <ul className="widget-body filter-items search-ul">
                        {category
                          .filter((v) => v.parent_id == 0)
                          .map((v) => (
                            <li key={v.id}>
                              <Link href={`/products?categories=${v.id}`}>
                                <a>{v.name}</a>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                    {/* End of Collapsible Widget */}
                    {/* Start of Collapsible Widget */}
                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <span>Price</span>
                        <span className="toggle-btn" />
                      </h3>
                      <div className="widget-body">
                        <ul className="filter-items search-ul">
                          <li>
                            <a href="#">$0.00 - $100.00</a>
                          </li>
                          <li>
                            <a href="#">$100.00 - $200.00</a>
                          </li>
                          <li>
                            <a href="#">$200.00 - $300.00</a>
                          </li>
                          <li>
                            <a href="#">$300.00 - $500.00</a>
                          </li>
                          <li>
                            <a href="#">$500.00+</a>
                          </li>
                        </ul>
                        <form className="price-range">
                          <input
                            type="number"
                            name="min_price"
                            className="min_price text-center"
                            placeholder="$min"
                          />
                          <span className="delimiter">-</span>
                          <input
                            type="number"
                            name="max_price"
                            className="max_price text-center"
                            placeholder="$max"
                          />
                          <a href="#" className="btn btn-primary btn-rounded">
                            Go
                          </a>
                        </form>
                      </div>
                    </div>
                    {/* End of Collapsible Widget */}
                    {/* Start of Collapsible Widget */}
                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <span>Size</span>
                        <span className="toggle-btn" />
                      </h3>
                      <ul className="widget-body filter-items item-check mt-1">
                        <li>
                          <a href="#">Extra Large</a>
                        </li>
                        <li>
                          <a href="#">Large</a>
                        </li>
                        <li>
                          <a href="#">Medium</a>
                        </li>
                        <li>
                          <a href="#">Small</a>
                        </li>
                      </ul>
                    </div>
                    {/* End of Collapsible Widget */}
                    {/* Start of Collapsible Widget */}
                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <span>Brand</span>
                        <span className="toggle-btn" />
                      </h3>
                      <ul className="widget-body filter-items item-check mt-1">
                        <li>
                          <a href="#">Elegant Auto Group</a>
                        </li>
                        <li>
                          <a href="#">Green Grass</a>
                        </li>
                        <li>
                          <a href="#">Node Js</a>
                        </li>
                        <li>
                          <a href="#">NS8</a>
                        </li>
                        <li>
                          <a href="#">Red</a>
                        </li>
                        <li>
                          <a href="#">Skysuite Tech</a>
                        </li>
                        <li>
                          <a href="#">Sterling</a>
                        </li>
                      </ul>
                    </div>
                    {/* End of Collapsible Widget */}
                    {/* Start of Collapsible Widget */}
                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <span>Color</span>
                        <span className="toggle-btn" />
                      </h3>
                      <ul className="widget-body filter-items item-check mt-1">
                        <li>
                          <a href="#">Black</a>
                        </li>
                        <li>
                          <a href="#">Blue</a>
                        </li>
                        <li>
                          <a href="#">Brown</a>
                        </li>
                        <li>
                          <a href="#">Green</a>
                        </li>
                        <li>
                          <a href="#">Grey</a>
                        </li>
                        <li>
                          <a href="#">Orange</a>
                        </li>
                        <li>
                          <a href="#">Yellow</a>
                        </li>
                      </ul>
                    </div>
                    {/* End of Collapsible Widget */}
                  </div>
                </div>
                {/* End of Sidebar Content */}
              </div>
              {/* End of Sidebar Content */}
            </aside>
            {/* End of Shop Sidebar */}
            {/* Start of Shop Main Content */}
            <div className="main-content">
              <nav className="toolbox sticky-toolbox sticky-content fix-top">
                <div className="toolbox-left">
                  <a
                    href="#"
                    className="btn btn-primary btn-outline btn-rounded left-sidebar-toggle 
                                  btn-icon-left d-block d-lg-none"
                  >
                    <i className="w-icon-category" />
                    <span>Filters</span>
                  </a>
                  <div className="toolbox-item toolbox-sort select-box text-dark">
                    <label>Sort By :</label>
                    <select
                      name="orderby"
                      className="form-control"
                      onChange={(e) =>
                        route.push(`/products?sort_key=${e.target.value}`)
                      }
                    >
                      <option value="default" selected="selected">
                        Default sorting
                      </option>
                      <option value="popularity">Sort by popularity</option>
                      <option value="top_rated">Sort by top_rated</option>
                      <option value="new_arrival">Sort by latest</option>
                      <option value="price_low_to_high">
                        Sort by pric: low to high
                      </option>
                      <option value="price_high_to_low">
                        Sort by price: high to low
                      </option>
                    </select>
                  </div>
                </div>
              </nav>
              <div className="product-wrapper row cols-lg-4 cols-md-3 cols-sm-2 cols-2">
                {loading.reload ? (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : (
                  <>
                    {products.map((v) => (
                      <ProductCard product={v} key={v.id} />
                    ))}
                  </>
                )}
              </div>
              <div className="toolbox toolbox-pagination justify-content-between">
                <p className="showing-info mb-2 mb-sm-0">
                  Showing<span>1-12 of 60</span>Products
                </p>
                <ul className="pagination">
                  <li className="prev disabled">
                    <a
                      href="#"
                      aria-label="Previous"
                      tabIndex={-1}
                      aria-disabled="true"
                    >
                      <i className="w-icon-long-arrow-left" />
                      Prev
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="next">
                    <a href="#" aria-label="Next">
                      Next
                      <i className="w-icon-long-arrow-right" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End of Shop Main Content */}
          </div>
          {/* End of Shop Content */}
        </div>
      </div>
      {/* End of Page Content */}
    </main>
  );
}
