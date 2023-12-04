import React from 'react'
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Modal,
    Box,
    Fab
  } from "@mui/material";
import './FavoriteList.scss';

export const FavoriteList = ({ favoriteList }) => {
  const unicoFavorites = favoriteList.reduce((unique, favorite) => {
    if (!unique.some(item => item.noticiaId === favorite.noticiaId)) {
      unique.push(favorite);
    }
    return unique;
  }, []);

  return (
    <div className='div-favorite-container'>
        {unicoFavorites.length > 0 ? ( // Verifica si hay elementos en la lista
            unicoFavorites.map((favorite) => (
                <Card key={favorite.noticiaId} sx={{ maxWidth: 345, background: "#0e6db0", margin: 3 }} className="card">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={favorite.Image}
                            alt={favorite.noticiaTitle}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {favorite.noticiaTitle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {favorite.noticiaSubtitle}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))
        ) : (
            <Typography variant="body1" className="no-favorites-text">
                Aún no hay favoritos
            </Typography>
        )}
    </div>
);
}
