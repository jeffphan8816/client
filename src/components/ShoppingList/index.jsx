import { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography, useMediaQuery } from "@mui/material";
import { Item } from "../Item";
import { useDispatch, useSelector } from "react-redux";
import { setItems, updateCart, addToCart } from "../../state";
import { useLoaderData } from "react-router-dom";

const GRID_COLUMN_WIDTH = "300px";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useLoaderData();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );

  return (
    <Box className='shopping-list' width='80%' margin='50px auto'>
      <Typography variant='h3' textAlign={'center'}>Shopping List</Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
        variant={isMobile ? "fullWidth" : "standard"}
        scrollButtons='auto'
      >
        <Tab
          label='All'
          value='all'
          sx={{
            minWidth: "75px",
          }}
        />
        <Tab
          label='NEW ARRIVALS'
          value='newArrivals'
          sx={{
            minWidth: "75px",
          }}
        />
        <Tab
          label='BEST SELLERS'
          value='bestSellers'
          sx={{
            minWidth: "75px",
          }}
        />
        <Tab
          label='TOP RATED'
          value='topRated'
          sx={{
            minWidth: "75px",
          }}
        />
      </Tabs>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, ${GRID_COLUMN_WIDTH})`,
          justifyContent: "space-around",
          margin: "0 auto",
        }}
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
