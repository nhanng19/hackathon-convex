import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Fade } from "@mui/material";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  bgcolor: "black",
  boxShadow: 24,
  borderRadius: "3rem",
  border: "1px solid #333",
  p: "4rem 3rem",
};

export default function Reviews(props: any) {
  const { open, handleClose, alias } = props;
  const fetchReviews = useAction(api.yelp.fetchReviews);
  const [reviews, setReviews] = useState<any>();

  useEffect(() => {
    if (alias) {
      const handleFetchReviews = async () => {
        const data = await fetchReviews({
          alias: alias,
        });
        console.log(data);
        setReviews(data.reviews);
      };
      handleFetchReviews();
    }
  }, [alias]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant={"h4"} color="white">
              Reviews:
            </Typography>
            {reviews?.map((review: any) => {
              return (
                <div
                  key={review?.user?.id}
                  className="w-full mx-auto rounded-lg bg-gray-900  p-5 text-light-2 font-light mt-6"
                >
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50">
                      <img src={review.user.image_url} alt="" />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-sm uppercase text-gray-200">
                        {review?.user?.name}
                      </h6>
                      <div className="flex flex-row">
                        {[...Array(review.rating)].map((_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-0.5 h-5 w-5 text-yellow-300"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight">
                      <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      {review?.text}
                      <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
