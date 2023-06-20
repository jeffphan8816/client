import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import AddressForm from "../../components/Forms/AddressForm";

const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  return (
    <Box m="10px 0">
      <Box>
        <Typography>Billing Information</Typography>
        <AddressForm
          type={"billingAddress"}
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>
      <Box>
        <FormControlLabel
          label="Same as Billing Address"
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAsBilling}
              onChange={() => {
                setFieldValue(
                  "shippingAddress.isSameAsBilling",
                  !values.shippingAddress.isSameAsBilling
                );
              }}
            />
          }
        />
      </Box>

      {/* Shipping Address */}
      {!values.shippingAddress.isSameAsBilling && (
        <Box>
          <Typography>Shipping Information</Typography>
          <AddressForm
            type={"shippingAddress"}
            values={values.shippingAddress}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
