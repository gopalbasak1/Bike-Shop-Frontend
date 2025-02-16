import { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Review.css";
import { StarIcon } from "lucide-react";
import {
  useCreateReviewMutation,
  useGetReviewQuery,
} from "@/redux/features/Users/users.api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Review } from "@/types";

const ReviewPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: reviews, isLoading } = useGetReviewQuery(undefined);
  const [createReview] = useCreateReviewMutation();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    if (!rating || !comment) return toast.error("Please fill out all fields");
    try {
      await createReview({ product: productId, rating, comment }).unwrap();
      setRating(0);
      setComment("");
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Customer Reviews</h2>

      {isLoading ? (
        <p>Loading reviews...</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="mt-4"
        >
          {reviews?.data?.map((review: Review) => (
            <SwiperSlide key={review._id}>
              <div className="border p-4  flex items-start space-x-4 rounded-2xl">
                {/* User Image */}
                {review.user.image ? (
                  <img
                    src={review.user.image}
                    alt={review.user.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                    {review.user.fullName.charAt(0)}
                  </div>
                )}

                {/* Review Content */}
                <div>
                  <p className="font-semibold">{review.user.fullName}</p>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold">Write a Review</h3>
        <div className="flex space-x-2 mt-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              size={24}
              className={
                i < rating
                  ? "text-yellow-500 cursor-pointer"
                  : "text-gray-300 cursor-pointer"
              }
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>
        <Textarea
          className="w-full mt-2 rounded-xl border-2 border-slate-300"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className="mt-4 rounded-2xl hover:bg-black hover:text-white"
          onClick={handleSubmit}
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewPage;
