import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add, Remove, Delete, Close } from "@mui/icons-material";
import { FlexBox } from "../FlexBox";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import { addToCart, updateCart } from "../../state";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";

export const Item = ({ item, width }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    palette: { neutral },
  } = useTheme();

  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const { name, category, price, image } = item.attributes;

  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  return (
    <Box width={width}>
      <Box
        position='relative'
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={item.name}
          width='300px'
          height='400px'
          src={`${process.env.REACT_APP_BACKEND_URL}${url}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position='absolute'
          bottom='10%'
          left='0'
          width='100%'
          padding='0 5%'
        >
          <FlexBox>
            <FlexBox backgroundColor={shades.neutral[100]} borderRadius='3px'>
              <IconButton
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              >
                <Remove />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton onClick={() => setQuantity(quantity + 1)}>
                <Add />
              </IconButton>
            </FlexBox>

            <Button
              onClick={() => dispatch(addToCart({ ...item, quantity }))}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to cart
            </Button>
          </FlexBox>
        </Box>
      </Box>
      <Box mt='3px'>
        <Typography variant='subtitle2' color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight='bold'>${price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
