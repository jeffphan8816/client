import { useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  addToCart,
  setIsCartOpen,
  updateCart,
} from "../../state";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Add, Remove, Delete, Close } from "@mui/icons-material";
import { FlexBox } from "../FlexBox";

export const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.quantity * item.attributes.price;
  }, 0);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      width='100%'
      height='60px'
      position='fixed'
      top='0'
      left='0'
      zIndex='2'
      color='black'
      backgroundColor='rgba(255, 255, 255, 0.95)'
    >
      <Box backgroundColor='rgba(255, 255, 255, 0.95)'>
        <FlexBox margin='0 20px'>
          <Box sx={{ flex: 1 }}>
            <Typography variant='h2'>Your Cart</Typography>
          </Box>
          <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
            <Close />
          </IconButton>
        </FlexBox>

        <Divider />

        <Box>
          {cart.map((item) => (
            <Box key={`${item.attributes.name}-${item.id}`}>
              <FlexBox width='80%' margin='auto'>
                <Box flex='1 1 30%'>
                  <img
                    src={`http://localhost:1338${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                    alt={item?.attributes.name}
                    width='123px'
                    height='164px'
                    onClick={() => {
                      dispatch(setIsCartOpen({}));
                      navigate(`/item/${item.id}`)
                    }}
                    style={{ cursor: "pointer" }}

                  />
                </Box>
                <Box flex='1 1 100%'>
                  <FlexBox>
                    <Typography variant='h3'>{item.attributes.name}</Typography>

                    <IconButton
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <Delete />
                    </IconButton>
                  </FlexBox>
                  <Typography>{item.attributes.shortDescription}</Typography>
                  <FlexBox marginTop='10px'>
                    <Box>
                      <Typography variant='h4'>Quantity</Typography>
                      <FlexBox flexDirection='row' sx={{
                        border: '1px solid black',
                        borderRadius: '15px',
                      }}>
                        <IconButton
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          <Remove />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          <Add />
                        </IconButton>
                      </FlexBox>
                    </Box>

                    <Box>
                      <Typography fontWeight='bold'>
                        ${item.attributes.price * item.quantity}
                      </Typography>
                    </Box>
                  </FlexBox>
                </Box>
              </FlexBox>
            </Box>
          ))}
        </Box>

        <Divider />
        <FlexBox id='cartMenuFooter'>
          <Typography variant='h4'>SUBTOTAL</Typography>
          <Typography variant='h4'>${totalPrice}</Typography>
        </FlexBox>
        <Box id='checkoutButton'>
          <Button onClick={() => navigate("/checkout")} variant='contained'>
            Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
