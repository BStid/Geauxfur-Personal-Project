import React, { Component } from "react";
import { connect } from "react-redux";
import { getReviews, removeReview } from "../../redux/mainReducer";
import DisplayReviews from "./DisplayReviews";
import "./Reviews.css";

class Reviews extends Component {
  constructor() {
    super();
    this.state = {};
  }
  removeReview(reviewId) {
    this.props.removeReview(reviewId);
  }
  componentDidMount() {
    this.props.getReviews();
  }
  render() {
    const { reviews } = this.props.main;
    const displayReviews = reviews.map((value, index) => {
      return (
        <DisplayReviews
          key={index}
          value={value}
          removeReview={this.removeReview}
        />
      );
    });
    return (
      <div className="reviewsOuter">
        <div className="reviewsTopContainer">REVIEWS</div>
        <div className="reviewsMain">{displayReviews}</div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getReviews, removeReview }
)(Reviews);
