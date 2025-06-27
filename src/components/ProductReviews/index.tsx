import React, { useEffect, useState } from "react";
import Heading from "../Base/Heading";
import BaseImage from "../Base/BaseImage";
import Rating from "../Rating";
import ReviewModal from "../ReviewModal";
import { uploadFile } from "@/utility";
import {
  deleteReplyProductReview,
  getSingleProduct,
  replyProductReview,
  editReviewReply,
} from "@/services/vendor";
import { showNotification } from "@/utility/snackBar";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Payload {
  product_id: string;
  comment: string;
  rating?: string;
  media: { url: string }[] | null;
}

export default function ProductReview(props: any) {
  const { id, average_rating } = props;
  const isSingle = !id;
  const [isModalOpen, setModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState<any[]>([]);
  console.log("Review Data", reviewData);
  const [image, setImage] = useState("");
  const [payload, setPayload] = useState<Payload>({
    product_id: "",
    comment: "",
    media: null,
  });

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleReplies = (reviewId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleReplySubmit = async () => {
    try {
      if (image) {
        const es: any = await uploadFile(image);
        payload.media = [{ url: es?.filename }];
      }
      const response = await replyProductReview({
        ...payload,
        comment_id: replyingTo,
      });
      console.log("Reply Product Review Response", response);
      handleGetSingleProduct();
      setModalOpen(false);
      setReplyingTo(null);
      setImage("");
      setPayload({
        product_id: "",
        comment: "",
        rating: "",
        media: [],
      });
    } catch (error: any) {
      showNotification("error", error?.message || "Error in replying review");
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    try {
      const response = await deleteReplyProductReview({ comment_id: replyId });
      console.log("Delete Reply Response", response);
      showNotification("success", "Reply deleted successfully");
      handleGetSingleProduct();
    } catch (error: any) {
      showNotification("error", error?.message || "Error in deleting reply");
    }
  };

  const handleEditReply = (reply: any) => {
    setReplyingTo(reply.id);
    setPayload({
      ...payload,
      comment: reply.comment,
      product_id: id,
    });
    setModalOpen(true);
    setIsEdit(true);
  };

  const handleEditReview = async () => {
    if (image) {
      const es: any = await uploadFile(image);
      payload.media = [{ url: es?.filename }];
    }
    try {
      const response = await editReviewReply({
        ...payload,
        comment_id: replyingTo,
      });
      console.log("Edit Review Response", response);
      showNotification("success", "Reply edited successfully");
      handleGetSingleProduct();
      setModalOpen(false);
      setReplyingTo(null);
      setImage("");
      setPayload({
        product_id: "",
        comment: "",
        rating: "",
        media: [],
      });
    } catch (error) {
      console.log("Edit Review Error", error);
    }
  };

  const handleGetSingleProduct = async () => {
    try {
      const response = await getSingleProduct(id);
      console.log("Get Single Product Response", response);
      setReviewData(response?.result?.reviews);
    } catch (error) {
      console.log("Product Review Error", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setPayload({
      ...payload,
      product_id: id,
    });
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (id) handleGetSingleProduct();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-6">
        <div className="col-span-1 px-3 pb-3 border-t">
          <Heading level={3} className="my-3">
            Overall Rating
          </Heading>
          <div className="">
            <Heading level={1} className="text-primary font-normal">
              {average_rating?.toFixed(1) || 0}
            </Heading>
            <Rating value={average_rating?.toFixed(1) || 0} />
            <Heading level={8} className="text-secondary">
              Based on {reviewData?.length?.toString() || "0"} ratings
            </Heading>
          </div>
          <div className="mt-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2 mb-2">
                <span className="w-3">{rating}</span>
                <div className="flex-grow bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{
                      width: `${
                        (reviewData?.filter((r) => Number(r.rating) === rating)
                          .length /
                          (reviewData?.length || 1)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="w-8 text-xs text-secondary">
                  {reviewData?.filter((r) => Number(r.rating) === rating)
                    .length || 0}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <div>
              <Heading level={5} className="font-medium">
                How do I review this product?
              </Heading>
              <Heading level={8} className="text-secondary font-normal">
                If you recently purchased this product from noon, you can go to
                your Orders page and click on the Submit Review button
              </Heading>
            </div>
            <div className="mt-5">
              <Heading level={5} className="font-medium">
                Where do the reviews come from?
              </Heading>
              <Heading level={8} className="text-secondary font-normal">
                Our reviews are from noon customers who purchased the product
                and submitted a review
              </Heading>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 border p-3 pt-5 sm:pt-0 mt-10 sm:mt-0 rounded-md md:rounded-tr-lg md:rounded-br-lg md:rounded-tl-none md:rounded-bl-none">
          <div className="flex justify-between items-center py-2">
            <Heading level={3}>Product reviews</Heading>
          </div>
          <div
            className={`flex flex-col items-start space-y-5 overflow-hidden ${
              reviewData?.length > 5 ? "hover:overflow-y-scroll h-[500px]" : ""
            }`}
          >
            {reviewData?.length > 0 ? (
              reviewData?.map((val, index) => {
                return (
                  <div className="w-full" key={index}>
                    <div className="flex gap-3 text-center">
                      <div>
                        <BaseImage
                          src={val?.profile_image}
                          alt="User Image"
                          width={50}
                          height={50}
                          className="rounded-full h-[50px] w-[50px] object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-start flex-grow">
                        <p className="font-bold text-secondary text-sm">
                          {val?.user_name || "User"}
                        </p>
                        <Rating
                          className="mt-1"
                          value={Number(val?.rating || 0)}
                        />
                        <p className="font-normal text-[#656565] text-sm pb-3">
                          {val?.comment}
                        </p>
                        {val?.media?.length > 0 && (
                          <div className="flex gap-3">
                            {val?.media?.map((media: any, index: number) => {
                              return (
                                <BaseImage
                                  key={index}
                                  src={
                                    media.url ||
                                    "http://137.59.222.200:4006/file/1735898179251.png"
                                  }
                                  alt="Product Image"
                                  width={100}
                                  height={100}
                                  className="rounded-md"
                                />
                              );
                            })}
                          </div>
                        )}
                        <div>
                          <button
                            onClick={() => {
                              setReplyingTo(val.id);
                              setModalOpen(true);
                            }}
                            className="text-primary text-sm hover:underline mt-2"
                          >
                            Reply
                          </button>
                          {val.replies && val.replies.length > 0 && (
                            <button
                              onClick={() => toggleReplies(val.id)}
                              className="ml-3 text-primary text-sm font-medium hover:underline"
                            >
                              {expandedReplies[val.id]
                                ? "Hide Replies"
                                : `Show Replies (${val.replies.length})`}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Display nested replies */}
                    {val.replies && val.replies.length > 0 && (
                      <>
                        {expandedReplies[val.id] && (
                          <div className="ml-16 mt-3 space-y-4">
                            {val.replies.map(
                              (reply: any, replyIndex: number) => (
                                <div key={replyIndex} className="flex gap-3">
                                  <BaseImage
                                    src={reply?.profile_image}
                                    alt="User Image"
                                    width={40}
                                    height={40}
                                    className="rounded-full h-[40px] w-[40px] object-cover"
                                  />
                                  <div className="flex flex-col items-start flex-grow">
                                    <div className="flex justify-between items-center w-full">
                                      <p className="font-bold text-secondary text-sm">
                                        {reply?.user_name || "User"}
                                      </p>
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => handleEditReply(reply)}
                                          className="text-primary hover:text-primary-800"
                                        >
                                          <FaEdit size={16} />
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleDeleteReply(reply.id)
                                          }
                                          className="text-red-600 hover:text-red-800"
                                        >
                                          <FaTrash size={16} />
                                        </button>
                                      </div>
                                    </div>
                                    <p className="font-normal text-[#656565] text-sm">
                                      {reply?.comment}
                                    </p>
                                    {reply?.media?.length > 0 && (
                                      <div className="flex gap-3 mt-2">
                                        {reply?.media?.map(
                                          (media: any, mediaIndex: number) => (
                                            <BaseImage
                                              key={mediaIndex}
                                              src={
                                                media.url ||
                                                "http://137.59.222.200:4006/file/1735898179251.png"
                                              }
                                              alt="Reply Image"
                                              width={80}
                                              height={80}
                                              className="rounded-md w-[80px] h-[80px] object-cover"
                                            />
                                          )
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="inline-flex gap-3 text-center items-center">
                <Rating className="mb-3" value={0} />
                <p className="font-normal text-[#656565] text-sm pb-3">
                  No reviews
                </p>
              </div>
            )}
          </div>
          {isModalOpen && (
            <ReviewModal
              onClose={() => {
                setModalOpen(false);
                setReplyingTo(null);
              }}
              setPayload={setPayload}
              payload={payload}
              setImage={setImage}
              handleSubmit={!isEdit ? handleReplySubmit : handleEditReview}
              isReply={!!replyingTo}
            />
          )}
        </div>
      </div>
    </div>
  );
}
