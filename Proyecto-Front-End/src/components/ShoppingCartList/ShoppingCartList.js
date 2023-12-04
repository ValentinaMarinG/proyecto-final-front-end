import React from "react";
import { Fab } from "@mui/material";
import { pink } from '@mui/material/colors';
import "./ShoppingCartList.scss";
import Checkbox from "@mui/material/Checkbox";

export const ShoppingCartList = ({ shoppingList }) => {
  const itemCounts = {};

  shoppingList.forEach((item) => {
    const itemId = item.noticiaId;
    if (itemCounts[itemId]) {
      itemCounts[itemId] += 1;
    } else {
      itemCounts[itemId] = 1;
    }
  });

  const unicoShoppingCartList = shoppingList.reduce((unique, item) => {
    if (!unique.some((uniqueItem) => uniqueItem.noticiaId === item.noticiaId)) {
      unique.push(item);
    }
    return unique;
  }, []);

  return (
    <div>
      {shoppingList.length > 0 ? (
        unicoShoppingCartList.map((item) => (
          <div key={item.noticiaId} className="row-container">
            <div className="img-content-grid">
              <img
                className="img-shopping-cart"
                src={item.Image}
                alt={item.noticiaTitle}
              />
            </div>
            <div className="text-content-grid">
              <p>{item.noticiaTitle}</p>
              <p>{item.noticiaDescription}</p>
            </div>
            <div className="text-content-grid-box">
              <p>Cantidad: {itemCounts[item.noticiaId]}</p>
              <Fab>
                <Checkbox
                  defaultChecked
                  sx={{
                    backgroundColor: 'transparent',
                  }}
                  icon={<span style={{ backgroundColor: 'transparent' }} />}
                />
              </Fab>
            </div>
          </div>
        ))
      ) : (
        <p>No hay servicios</p>
      )}
    </div>
  );
};
