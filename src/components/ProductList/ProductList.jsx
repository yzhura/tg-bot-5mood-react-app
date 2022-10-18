import React, { useState } from "react";
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
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import corsetImg from "../../images/corset.jpg";
import "./Product.css";
import { useTelegram } from "../../hooks/useTelegram";

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
  const { telegram } = useTelegram();
  const [addedItems, setAddedItems] = useState(products);
  const isCartNotEmpty = addedItems.some((item) => item.count !== 0);
  const totalPrice = addedItems.reduce((acc, curItem) => {
    const curItemPrice = curItem.count * curItem.price;
    return acc += curItemPrice;
  }, 0)
  
  console.log('totalPrice: ', totalPrice);
  if (isCartNotEmpty) {
    telegram.MainButton.show();
    telegram.MainButton.setParams({
      text: `Замовити! Загальна сумма: ${totalPrice} грн`
    })
  } else {
    telegram.MainButton.hide();
  }

  const onAddHandler = (id) => {
    const updatedItems = addedItems.map((product) => {
      if (product.id === id) {
        product.count += 1;
      }
      return product;
    });
    setAddedItems(updatedItems);
  };

  const onDeleteHandler = (id) => {
    const updatedItems = addedItems.map((product) => {
      if (product.id === id) {
        product.count -= 1;
      }
      return product;
    });
    setAddedItems(updatedItems);
  };

  return (
    <Grid container spacing={2}>
      {addedItems.map(({ id, title, price, oldprice, img, count }) => {
        const isMoreThanZero = count > 0;
        return (
          <Grid item xs={6} md={4} key={id}>
            <Card>
              <CardMedia component="img" height="175" image={img} alt={title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                {oldprice && (
                  <Typography variant="body2" color="text.secondary">
                    Стара ціна:{" "}
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
                  Ціна: {price} грн.
                </Typography>
              </CardContent>
              <CardActions>
                <Box width="100%" display="flex" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={() => onDeleteHandler(id)}>
                      {isMoreThanZero && (
                        <>
                          <RemoveCircleOutlineIcon />
                        </>
                      )}
                    </IconButton>
                    <Typography>{isMoreThanZero && count}</Typography>
                  </Box>
                  <Button size="small" onClick={() => onAddHandler(id)}>
                    Замовити
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
