import React, { useCallback, useEffect, useState } from "react";
import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Box,
  ButtonGroup,
  Badge,
} from "@mui/material";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import corsetImg from "../../images/corset.jpg";
import "./Product.css";
import { useTelegram } from "../../hooks/useTelegram";
import { useSpring, animated, useTransition, useSpringRef, useChain } from "react-spring";

const staticImg = corsetImg;

const products = [
  {
    id: 1,
    title: "Корсет с чашками (чорний)",
    price: 2470,
    img: staticImg,
    count: 0,
  },
  {
    id: 2,
    title: "Корсет с чашками (бежевий)",
    price: 2470,
    img: staticImg,
    count: 0,
  },
  {
    id: 3,
    title: "Корсет с чашками (білий)",
    price: 2470,
    img: staticImg,
    count: 0,
  },
  {
    id: 4,
    title: "Корcет підгрудний (чорний)",
    price: 1775,
    oldprice: 2220,
    img: staticImg,
    count: 0,
  },
  {
    id: 5,
    title: "Корcет підгрудний (бежевий)",
    price: 1775,
    oldprice: 2220,
    img: staticImg,
    count: 0,
  },
  {
    id: 6,
    title: "Корcет підгрудний (білий)",
    price: 1775,
    oldprice: 2220,
    img: staticImg,
    count: 0,
  },
];

export const ProductList = () => {
  const { telegram, queryId } = useTelegram();
  const [productsItems, setProductsItems] = useState(products);
  const [xsCols, setXsCols] = useState(true);
  const isCartNotEmpty = productsItems.some((item) => item.count !== 0);
  const totalPrice = productsItems.reduce((acc, curItem) => {
    const curItemPrice = curItem.count * curItem.price;
    return (acc += curItemPrice);
  }, 0);

  if (isCartNotEmpty) {
    telegram.MainButton.show();
    telegram.MainButton.setParams({
      text: `Замовити! Загальна сумма: ${totalPrice} грн`,
    });
  } else {
    telegram.MainButton.hide();
  }

  const onAddHandler = (id) => {
    const updatedItems = productsItems.map((product) => {
      if (product.id === id) {
        product.count += 1;
      }
      return product;
    });
    setProductsItems(updatedItems);
  };

  const onDeleteHandler = (id) => {
    const updatedItems = productsItems.map((product) => {
      if (product.id === id) {
        product.count -= 1;
      }
      return product;
    });
    setProductsItems(updatedItems);
  };

  const onSendData = useCallback(() => {
    const itemsInCart = productsItems.filter((product) => product.count > 0);
    const data = {
      order: itemsInCart,
      totalPrice,
      // queryId: queryId || '',
      queryId,
    };
    //https://5mood-tg-bot.azurewebsites.net/web-data
    //http://localhost:8000/web-data
    fetch("https://5mood-tg-bot.azurewebsites.net/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.log("error: ", error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsItems]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);
    return () => {
      telegram.offEvent("mainButtonClicked", onSendData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSendData]);

  const toggleXsCols = () => {
    setXsCols(!xsCols);
  };

  const transApi = useSpringRef();
  const transition = useTransition(productsItems, {
    ref: transApi,
    trail: 400 / productsItems.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 }
  });

  useChain([transApi], [0, 0.6])

  const gridBtnStyles = useSpring({
    from: { right: -150 },
    to: { right: 0 },
  });

  return (
    <>
      {/* <Button onClick={onSendData}>Test Post</Button> */}
      <Box padding={1} display="flex" justifyContent="flex-end">
        <animated.div
          style={{
            position: "relative",
            ...gridBtnStyles,
          }}
        >
          <IconButton onClick={toggleXsCols}>
            {xsCols ? <ViewColumnIcon /> : <ViewAgendaIcon />}
          </IconButton>
        </animated.div>
      </Box>
      <Grid container spacing={2}>
        {transition((style, { id, title, price, oldprice, img, count }) => {
          const isMoreThanZero = count > 0;
          return (
            <Grid item xs={xsCols ? 12 : 6} md={4} key={id}>
              <animated.div style={{ ...style }}>
                <Box position="relative">
                  <Card>
                    <Box position="absolute" right="0" top="-10px">
                      <Badge badgeContent={count} color="primary" />
                    </Box>
                    <CardMedia
                      component="img"
                      height="175"
                      image={img}
                      alt={title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="p">
                        {title}
                      </Typography>
                      {oldprice && (
                        <Typography variant="body2" color="text.secondary">
                          <span
                            style={{
                              textDecoration: "line-through",
                            }}
                          >
                            {oldprice} грн.
                          </span>
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary">
                        <strong>{price} грн.</strong>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {isMoreThanZero ? (
                          <>
                            <ButtonGroup>
                              <Button onClick={() => onDeleteHandler(id)}>
                                <RemoveIcon fontSize="medium" />
                              </Button>
                              <Button onClick={() => onAddHandler(id)}>
                                <AddIcon fontSize="medium" />
                              </Button>
                            </ButtonGroup>
                          </>
                        ) : (
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() => onAddHandler(id)}
                          >
                            Додати
                          </Button>
                        )}
                      </Box>
                    </CardActions>
                  </Card>
                </Box>
              </animated.div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
