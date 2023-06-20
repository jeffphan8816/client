import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { updateCart } from "../../state";

const CheckoutConfirmation = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const data = useLoaderData();
  console.log(
    "🚀 ~ file: ConfirmCheckout.jsx:8 ~ CheckoutConfirmation ~ data:",
    data
  );
  
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(updateCart([]));
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Box m='90px auto' width='80%' height='50vh'>
      <Alert severity='success'>
        <AlertTitle
          sx={{
            fontSize: "1.2rem",
          }}
        >
          Success
        </AlertTitle>
        <strong
          fontSize='0.8rem'
        >
          Congrats on Making your Purchase
        </strong>
        <br />
        You have successfully made an Order - {' '}
        <strong>Check your email for more details</strong>
      </Alert>
    </Box>
  );
};

export default CheckoutConfirmation;
