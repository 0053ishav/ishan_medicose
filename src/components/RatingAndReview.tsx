import React, { useState, useEffect } from "react";
import { fetchReviews, submitReview } from "@/lib/appwrite";
import { useToast } from "@/Hooks/use-toast";

interface Review {
  rating: number;
  reviewText: string;
  userId: string;
  createdAt: string;
  id?: string;
}

interface RatingAndReviewProps {
  productId: string;
}

const RatingAndReview: React.FC<RatingAndReviewProps> = ({ productId }) => {
  const { toast } = useToast();

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchReviewsDetails = async () => {
      try {
        const reviewData = await fetchReviews(productId);
        const sortedReviews = reviewData.sort((a: Review, b: Review) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setReviews(sortedReviews);

        const totalRating = reviewData.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = reviewData.length > 0 ? totalRating / reviewData.length : 0;
        setAverageRating(avgRating);
        setTotalReviews(reviewData.length);

      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviewsDetails();
  }, [productId]);

  const handleSubmitReview = async () => {
    if (rating === 0 || reviewText.trim() === "") {
      toast({
        title: "",
        description: "Please provide a rating and a review.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const userId = "userId_placeholder";// To do: add user id
      await submitReview(productId, rating, reviewText, userId);

      const newReview: Review = {
        rating,
        reviewText,
        userId, // Todo: Add user id
        createdAt: new Date().toISOString(),
      };

      setReviews((prevReviews) => [newReview, ...prevReviews]);

      const updatedTotalRating = reviews.reduce((sum, review) => sum + review.rating, 0) + rating;
      const updatedAvgRating = updatedTotalRating / (reviews.length + 1);
      setAverageRating(updatedAvgRating);

      setRating(0);
      setReviewText("");

      toast({
        title: "Review Submitted",
        description: "Your review has been successfully submitted.",
        variant: "default"
      });

    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Review Submission Failed",
        description: "There was an error while submitting your review.",
        variant: "destructive"
      });
    }
    setIsSubmitting(false);
  };

  const toggleReviewVisibility = () => {
    setShowAllReviews(!showAllReviews);
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 5);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold">Rate and Review</h2>

      <div className="flex items-center">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer ${star <= averageRating ? "text-yellow-400" : "text-gray-400"}`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="ml-2 text-lg text-gray-600">{averageRating.toFixed(1)} / 5</span>
        <span className="ml-4 text-sm text-gray-600">({totalReviews} reviews)</span>
      </div>

      <div className="flex gap-1 mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-400"}`}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        className="mt-4 w-full p-2 border rounded-md"
        placeholder="Write your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

 
      <button
        onClick={handleSubmitReview}
        disabled={isSubmitting}
        className="mt-4 px-6 py-2 bg-pharma-emerald hover:bg-pharma-emerald-dark text-white rounded-md disabled:bg-gray-400"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Reviews</h3>

    
        {displayedReviews.length > 0 ? (
          displayedReviews.map((review) => (
            <div key={review.id || review.createdAt} className="border-b py-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  {new Date(review.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 px-2">{review.reviewText}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
        )}

        {reviews.length > 5 && (
          <button
            onClick={toggleReviewVisibility}
            className="mt-4 text-pharma-emerald hover:text-pharma-emerald-dark"
          >
            {showAllReviews ? "See Less Reviews" : "See All Reviews"}
          </button>
        )}
      </div>
    </div>
  );
};

export default RatingAndReview;
