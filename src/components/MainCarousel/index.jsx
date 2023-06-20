import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { shades } from "../../theme";

//imports all the images
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../../public/assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box width='70%' margin='0 auto'>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              color: "white",
              padding: "5px",
              zIndex: "10",
            }}
          >
            <NavigateBefore />
          </IconButton>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              color: "white",
              padding: "5px",
              zIndex: "10",
            }}
          >
            <NavigateNext />
          </IconButton>
        )}
      >
        {Object.values(heroTextureImports).map((texture, index) => (
          <Box key={`carousel-image-${index}`}>
            <img
              alt={`carousel-${index}`}
              src={texture}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                backgroundAttachment: "fixed",
              }}
            />
            <Box 
              color="white"
              padding="20px"
              borderRadius="1px"
              textAlign="left"
              backgroundColor="rgb(0, 0, 0, 0.4)"
              position="absolute"
              bottom="5%"
              left="5%"

              margin={!isMobile ? undefined : "0 auto"}
              maxWidth={!isMobile ? undefined : "240px"}
            >
              <Typography
                variant='h1'
                color='white'
                textAlign={"center"}
              >
                {isMobile ? "Welcome to" : "Welcome to the"}
                <br />
                {isMobile ? "Boutique" : "Boutique"}
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default MainCarousel;
