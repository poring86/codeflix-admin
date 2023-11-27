import { Box, Typography } from "@mui/material"

export type Rating = 'L' | '10' | '12' | '14' | '16' | '18'

type Props = {
  rating: Rating
}

const backgroundColors = {
  L: "#39B549",
  "10": "#20A3D4",
  "12": "#E79738",
  "14": "#E35E00",
  "16": "#d00003",
  "18": "#000000",
};

export function Rating(props: Props) {
  return (
    <Box sx={{
      "& > :first-of-type": {
        mr: 0,
      },
      width: 40,
      height: 40,
      borderRadius: "4px",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: backgroundColors[props.rating]
    }}>
      <Typography>{props.rating}</Typography>
    </Box>
  )
}