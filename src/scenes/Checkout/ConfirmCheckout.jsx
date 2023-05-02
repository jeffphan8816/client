import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const CheckoutConfirmation = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const data = useLoaderData();
  console.log("🚀 ~ file: ConfirmCheckout.jsx:8 ~ CheckoutConfirmation ~ data:", data)
  return <div>
    <Box>
      <Typography variant="h4">Checkout Confirmation</Typography>
      <Typography variant="h6">Thank you for your order!</Typography>
      

    </Box>
  </div>;
};

export default CheckoutConfirmation;
