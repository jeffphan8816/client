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
import { shades } from "../../theme";

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
      // overflow='auto'
      height='100%'
      position='fixed'
      top='0'
      left='0'
      zIndex={1000}
      color='black'
      backgroundColor="rgba(225, 225, 225, 0.3)"
    >
      <Box
        position='fixed'
        right='0'
        top='0'
        width='max(400px,35%)'
        height='100%'
        backgroundColor='white'
      >
        <Box padding='30px' height='100%' overflow='auto'>
          <FlexBox mb='15px'>
            <Typography variant='h2'>Your Cart</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <Close />
            </IconButton>
          </FlexBox>

          <Divider />

          <Box>
            {cart.map((item) => (
              <Box key={`${item.attributes.name}-${item.id}`}>
                <FlexBox p='15px 0' id='test'>
                  <Box flex='1 1 40%'>
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                      alt={item?.attributes.name}
                      width='123px'
                      height='164px'
                      onClick={() => {
                        dispatch(setIsCartOpen({}));
                        navigate(`/item/${item.id}`);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                  <Box flex='1 1 60%'>
                    <FlexBox mb='5px'>
                      <Typography variant='h3'>
                        {item.attributes.name}
                      </Typography>

                      <IconButton
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <Delete />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.attributes.shortDescription}</Typography>
                    <FlexBox m='10px 0'>
                      <Box
                        display='flex'
                        alignItems='center'
                        // border={`1px solid ${shades.neutral[500]}`}
                      >
                        <Typography variant='h4' p='0 5px'>
                          Quantity
                        </Typography>
                        <FlexBox
                          flexDirection='row'
                          sx={{
                            border: "1px solid black",
                            borderRadius: "15px",
                          }}
                        >
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
                <Divider />
              </Box>
            ))}
          </Box>

          <Box margin='20px 0'>
            <FlexBox m='10px 0'>
              <Typography variant='h4'>SUBTOTAL</Typography>
              <Typography variant='h4'>${totalPrice}</Typography>
            </FlexBox>

            <Button
              sx={{
                // position: "relative",
                // right: "0",
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                if (cart.length > 0) {
                  dispatch(setIsCartOpen({}));
                  navigate("/checkout");
                } else {
                  alert("Your cart is empty");
                }
              }}
              variant='contained'
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart.cart);
//   const isCartOpen = useSelector((state) => state.cart.isCartOpen);

//   const totalPrice = cart.reduce((total, item) => {
//     return total + item.count * item.attributes.price;
//   }, 0);

//   return (
//     <Box
//       display={isCartOpen ? "block" : "none"}
//       backgroundColor="rgba(0, 0, 0, 0.4)"
//       position="fixed"
//       zIndex={10}
//       width="100%"
//       height="100%"
//       left="0"
//       top="0"
//       overflow="auto"
//     >
//       <Box
//         position="fixed"
//         right="0"
//         bottom="0"
//         width="max(400px, 30%)"
//         height="100%"
//         backgroundColor="white"
//       >
//         <Box padding="30px" overflow="auto" height="100%">
//           {/* HEADER */}
//           <FlexBox mb="15px">
//             <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
//             <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
//               <Close />
//             </IconButton>
//           </FlexBox>

//           {/* CART LIST */}
//           <Box>
//             {cart.map((item) => (
//               <Box key={`${item.attributes.name}-${item.id}`}>
//                 <FlexBox p="15px 0">
//                   <Box flex="1 1 40%">
//                     <img
//                       alt={item?.name}
//                       width="123px"
//                       height="164px"
//                       src={`http://localhost:1338${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
//                     />
//                   </Box>
//                   <Box flex="1 1 60%">
//                     <FlexBox mb="5px">
//                       <Typography fontWeight="bold">
//                         {item.attributes.name}
//                       </Typography>
//                       <IconButton
//                         onClick={() =>
//                           dispatch(removeFromCart({ id: item.id }))
//                         }
//                       >
//                         <Close />
//                       </IconButton>
//                     </FlexBox>
//                     <Typography>{item.attributes.shortDescription}</Typography>
//                     <FlexBox m="15px 0">
//                       <Box
//                         display="flex"
//                         alignItems="center"
//                         border={`1.5px solid ${shades.neutral[500]}`}
//                       >
//                         <IconButton
//                           onClick={() =>
//                             dispatch(decreaseQuantity({ id: item.id }))
//                           }
//                         >
//                           <Remove />
//                         </IconButton>
//                         <Typography>{item.count}</Typography>
//                         <IconButton
//                           onClick={() =>
//                             dispatch(increaseQuantity({ id: item.id }))
//                           }
//                         >
//                           <Add />
//                         </IconButton>
//                       </Box>
//                       <Typography fontWeight="bold">
//                         ${item.attributes.price}
//                       </Typography>
//                     </FlexBox>
//                   </Box>
//                 </FlexBox>
//                 <Divider />
//               </Box>
//             ))}
//           </Box>

//           {/* ACTIONS */}
//           <Box m="20px 0">
//             <FlexBox m="20px 0">
//               <Typography fontWeight="bold">SUBTOTAL</Typography>
//               <Typography fontWeight="bold">${totalPrice}</Typography>
//             </FlexBox>
//             <Button
//               sx={{
//                 backgroundColor: shades.primary[400],
//                 color: "white",
//                 borderRadius: 0,
//                 minWidth: "100%",
//                 padding: "20px 40px",
//                 m: "20px 0",
//               }}
//               onClick={() => {
//                 navigate("/checkout");
//                 dispatch(setIsCartOpen({}));
//               }}
//             >
//               CHECKOUT
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };