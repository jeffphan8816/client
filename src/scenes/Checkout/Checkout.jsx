import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MwbYWDZhLa238hLQgae6bzkliuSe01YV3cJ0OP7ic3i6ZiFoakMFkzRdMvaof6eLr1hGrewZCn84IEITXzppYev0011fZFAuz"
);
const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },
  shippingAddress: {
    isSameAsBilling: true,
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },
  email: "",
  phone: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      address: yup.string().required("Required"),
      address2: yup.string(),
      city: yup.string().required("Required"),
      state: yup.string().required("Required"),
      zip: yup.string().required("Required"),
      country: yup.string().required("Required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAsBilling: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAsBilling", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
      address: yup.string().when("isSameAsBilling", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
      address2: yup.string(),
      city: yup.string().when("isSameAsBilling", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
      state: yup.string().when("isSameAsBilling", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
      zip: yup.string().when("isSameAsBilling", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
      country: yup.string().when("isSameAsBilling", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    phone: yup.string().required("Required"),
  }),
];

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  async function makePayment(values) {
    const stripe = await stripePromise;

    const requestBody = {
      userName: [values.billingAddress.firstName, values.billingAddress.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, quantity }) => ({
        id,
        quantity,
      })),
    };

    const response = await fetch("http://localhost:1338/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const session = await response.json();
    console.log("🚀 ~ file: checkout.jsx:123 ~ makePayment ~ session:", session)
    await stripe.redirectToCheckout({ sessionId: session.id});
  }

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);
    // this copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  return (
    <Box>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Shipping</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              )}

              <Box>
                {!isFirstStep && (
                  <Button onClick={() => setActiveStep(activeStep - 1)}>
                    <Typography>Back</Typography>
                  </Button>
                )}
                <Button type='submit'>
                  <Typography>
                    {isSecondStep ? "Place Order" : "Next"}
                  </Typography>
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
