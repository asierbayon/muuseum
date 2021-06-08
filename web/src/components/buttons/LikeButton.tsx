import { Icon } from '@iconify/react';
import heartOutline from '@iconify-icons/eva/heart-outline';
import heartFill from '@iconify-icons/eva/heart-fill';
import { useState } from 'react';
// material
import { Checkbox, Typography, FormControlLabel } from '@material-ui/core';
// services
import { like, unlike } from '../../services/assets-service';
// utils
import { fShortenNumber } from '../../utils/formatNumber';

interface LikeButtonProps {
  likes: number;
  likedByMe: boolean;
  id: string;
  sx: object;
}

export default function LikeButton({ likes, likedByMe, id, sx }: LikeButtonProps) {
  const [likesNumber, setLikesNumber] = useState(likes);
  const [liked, setLiked] = useState(likedByMe);

  const handleLike = async () => {
    try {
      if (liked) {
        await unlike(id);
        const newLikesNumber = likesNumber - 1;
        setLikesNumber(newLikesNumber);
      } else {
        await like(id);
        const newLikesNumber = likesNumber + 1;
        setLikesNumber(newLikesNumber);
      }
      setLiked((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormControlLabel
      sx={sx}
      control={
        <Checkbox
          onClick={handleLike}
          defaultChecked={liked}
          icon={<Icon icon={heartOutline} color="black" />}
          checkedIcon={<Icon icon={heartFill} color="red"/>}
        />
      }
      label={
        <Typography
          variant="subtitle1"
          fontWeight="fontWeightBold"
          sx={{ marginTop: '2px', color: 'black' }}
        >
          {fShortenNumber(likesNumber)}
        </Typography>
      }
    />
  );
}
