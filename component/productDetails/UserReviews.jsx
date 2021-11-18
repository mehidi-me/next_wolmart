import React, { useContext, useState } from "react";
import ReactStars from "react-rating-stars-component";
import client from "../../pages/api/client";
import AppContext from "../../storeData/AppContext";
import ProgressBar from "../ProgressBar";

export default function UserReviews({ reviews, product_id, getReviews }) {
  const {
    state: { user },
  } = useContext(AppContext);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const ratingChanged = (e) => {
    setRating(e + e);
  };
  const reviewSubmit = async (e) => {
    setError({});
    e.preventDefault();
    if (user) {
      if (rating == 0) setError({ type: "rating", msg: "Select your rating" });
      if (e.target.review.value == "")
        setError({ type: "review", msg: "Enter your review" });

      const body = {
        product_id,
        user_id: user.id,
        rating,
        comment: e.target.review.value,
      };
      setLoading(true);
      try {
        const res = await fetch(client + "reviews/submit", {
          method: "post",
          body: JSON.stringify(body),
          mode: "cors",
          headers: { "Content-type": "application/json;charset=utf-8" },
        });
        const data = await res.json();
        console.log(data);
        getReviews(product_id);
      } catch (error) {
        console.log(error);
        setError({ type: "server", msg: "Server error please try again!" });
        setLoading(false);
      }
      setLoading(false);
    }
  };
  return (
    <>
      <div className="row mb-4">
        <div className="col-xl-4 col-lg-5 mb-4">
          <div className="ratings-wrapper">
            <div className="avg-rating-container">
              <h4 className="avg-mark font-weight-bolder ls-50">3.3</h4>
              <div className="avg-rating">
                <p className="text-dark mb-1">Average Rating</p>
                <div className="ratings-container">
                  <div className="ratings-full">
                    <span className="ratings" style={{ width: "60%" }} />
                    <span className="tooltiptext tooltip-top" />
                  </div>
                  <a href="#" className="rating-reviews">
                    (3 Reviews)
                  </a>
                </div>
              </div>
            </div>
            <div className="ratings-value d-flex align-items-center text-dark ls-25">
              <span className="text-dark font-weight-bold">66.7%</span>
              Recommended<span className="count">(2 of 3)</span>
            </div>
            <div className="ratings-list">
              <div className="ratings-container">
                <div className="ratings-full">
                  <span className="ratings" style={{ width: "100%" }} />
                  <span className="tooltiptext tooltip-top" />
                </div>
                <div className="progress-bar progress-bar-sm ">
                  <span />
                </div>
                <div className="progress-value">
                  <mark>70%</mark>
                </div>
              </div>
              <div className="ratings-container">
                <div className="ratings-full">
                  <span className="ratings" style={{ width: "80%" }} />
                  <span className="tooltiptext tooltip-top" />
                </div>
                <div className="progress-bar progress-bar-sm ">
                  <span />
                </div>
                <div className="progress-value">
                  <mark>30%</mark>
                </div>
              </div>
              <div className="ratings-container">
                <div className="ratings-full">
                  <span className="ratings" style={{ width: "60%" }} />
                  <span className="tooltiptext tooltip-top" />
                </div>
                <div className="progress-bar progress-bar-sm ">
                  <span />
                </div>
                <div className="progress-value">
                  <mark>40%</mark>
                </div>
              </div>
              <div className="ratings-container">
                <div className="ratings-full">
                  <span className="ratings" style={{ width: "40%" }} />
                  <span className="tooltiptext tooltip-top" />
                </div>
                <div className="progress-bar progress-bar-sm ">
                  <span />
                </div>
                <div className="progress-value">
                  <mark>0%</mark>
                </div>
              </div>
              <div className="ratings-container">
                <div className="ratings-full">
                  <span className="ratings" style={{ width: "20%" }} />
                  <span className="tooltiptext tooltip-top" />
                </div>
                <div className="progress-bar progress-bar-sm ">
                  <span />
                </div>
                <div className="progress-value">
                  <mark>0%</mark>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-lg-7 mb-4">
          <div className="review-form-wrapper">
            <h3 className="title tab-pane-title font-weight-bold mb-1">
              Submit Your Review
            </h3>

            <form onSubmit={reviewSubmit} className="review-form">
              <label htmlFor="rating">Your Rating Of This Product</label>
              <div className="rating-form">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={30}
                  isHalf={true}
                  activeColor="#f93"
                />
                {error.type == "rating" ? (
                  <p style={{ color: "red" }}>{error.msg}</p>
                ) : null}
              </div>

              <textarea
                cols={30}
                rows={6}
                placeholder="Write Your Review Here..."
                className="form-control"
                id="review"
                defaultValue={""}
              />
              {error.type == "review" ? (
                <p style={{ color: "red" }}>{error.msg}</p>
              ) : null}

              <button type="submit" className="btn btn-dark">
                Submit Review
              </button>
              <ProgressBar visible={loading} />
            </form>
          </div>
        </div>
      </div>
      <div className="tab tab-nav-boxed tab-nav-outline tab-nav-center">
        <div className="tab-content">
          <div className="tab-pane active" id="show-all">
            <ul className="comments list-style-none">
              {reviews.map((v) => (
                <li className="comment">
                  <div className="comment-body">
                    <figure className="comment-avatar">
                      <img
                        src="/assets/images/avatar.png"
                        alt="Commenter Avatar"
                        width={90}
                        height={90}
                      />
                    </figure>
                    <div className="comment-content">
                      <h4 className="comment-author">
                        <a href="">{v.user_name}</a>
                        <span className="comment-date"> {v.time}</span>
                      </h4>
                      <div className="ratings-container comment-rating">
                        <div className="ratings-full">
                          <span
                            className="ratings"
                            style={{ width: `${v.rating}0%` }}
                          />
                          <span className="tooltiptext tooltip-top" />
                        </div>
                      </div>
                      <p>{v.comment}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
