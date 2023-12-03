import { Box, LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function LinearProgressWithLabel(props: LinearProgressProps & { value?: number }) {
  return (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1, minWidth: 350 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(props.value ?? 0)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

export function LinearWithValueLabel() {
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      )
    }, 800)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box sx={{ with: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  )
}