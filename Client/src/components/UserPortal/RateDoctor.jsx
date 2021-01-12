import React, { useState } from "react";
import StarRatings from "react-star-ratings";

export default function RateDoctor(props) {
  const [rating, setRating] = useState();

  const markRating = (rating) => {
    console.log("NewwwwwRating : ", rating);
  };
  console.log("props of rating : ", props);
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#ffd56b"
      starHoverColor="#0d335d"
      changeRating={markRating}
      numberOfStars={5}
      name="rating"
    />
  );
}
