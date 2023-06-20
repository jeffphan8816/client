import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const item = useLoaderData();

  async function fetchItem() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/items/${itemId}?populate=image`,
      { method: "GET" }
    );
    const data = await response.json();
    console.log("🚀 ~ file: index.jsx:29 ~ fetchItem ~ data:", data);
    setItem(JSON.parse(JSON.stringify(data.data)));
  }

  async function fetchItems() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/items?populate=image`,
      { method: "GET" }
    );
    const data = await response.json();
    console.log("🚀 ~ file: index.jsx:35 ~ fetchItems ~ data:", data);
    setItems(JSON.parse(JSON.stringify(data.data)));
  }

  useEffect(() => {
    fetchItem();
    fetchItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width='80%' m='80px auto'>
      <Box display='flex' flexWrap='wrap' columnGap='40px'>
        {/* IMAGES */}
        <Box flex='1 1 40%' mb='40px'>
          <img
            alt={item?.name}
            width='100%'
            height='100%'
            src={`${process.env.REACT_APP_BACKEND_URL}${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex='1 1 50%' mb='40px'>
          <Box display='flex' justifyContent='space-between'>
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m='65px 0 25px 0'>
            <Typography variant='h3'>{item?.attributes?.name}</Typography>
            <Typography>${item?.attributes?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          <Box display='flex' alignItems='center' minHeight='50px'>
            <Box
              display='flex'
              alignItems='center'
              border={`1.5px solid ${shades.neutral[300]}`}
              mr='20px'
              p='2px 5px'
            >
              <IconButton
                onClick={() => setQuantity(Math.max(quantity - 1, 0))}
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{quantity}</Typography>
              <IconButton onClick={() => setQuantity(quantity + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ ...item, quantity }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m='20px 0 5px 0' display='flex'>
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>
              CATEGORIES:{" "}
              {item?.attributes?.category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m='20px 0'>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='DESCRIPTION' value='description' />
          <Tab label='REVIEWS' value='reviews' />
        </Tabs>
      </Box>
      <Box display='flex' flexWrap='wrap' gap='15px'>
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt='50px' width='100%'>
        <Typography variant='h3' fontWeight='bold'>
          Related Products
        </Typography>
        <Box
          mt='20px'
          display='flex'
          flexWrap='wrap'
          columnGap='1.33%'
          justifyContent='space-between'
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
