import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, List, ListItem, Typography } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { LinearProgressWithLabel } from "../../components/Progress";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { cleanAllUploads, cleanFinishedUploads, selectUploads } from "./uploadSlice";
import { useState } from "react";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CloseIcon from "@mui/icons-material/Close";

type Upload = {
  name: string
  progress: number
}

type Props = {
  uploads?: Upload[]
}

export const UploadList: React.FC<Props> = () => {
  const uploadList = useAppSelector(selectUploads)
  const dispatch = useAppDispatch();

  if (!uploadList || uploadList.length === 0) {
    return null
  }

  const handleOnClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(cleanFinishedUploads());
  };

  const handleCancelAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(cleanAllUploads());
  };

  return (
    <Box
      right={0}
      bottom={0}
      zIndex={9}
      width={"100%"}
      position={"fixed"}
      sx={{ "@media (min-width: 600px)": { width: 450 } }}
    >
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: "grey.800" }}
          aria-controls="upload-content"
        >
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>
              Uploading {uploadList.length}{" "}
              {uploadList.length > 1 ? "files" : "file"}
            </Typography>
            <Box display={"flex"} alignItems={"flex-end"}>
              <IconButton onClick={handleCancelAll}>
                <DeleteSweepIcon />
              </IconButton>

              <IconButton onClick={handleOnClose} >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-content"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {
              uploadList.map((upload, index) => (
                <Box key={index} sx={{
                  width: "100%"
                }}>
                  <Typography>{upload.field}</Typography>
                  <ListItem sx={{
                    width: "100%"
                  }}>
                    <LinearProgressWithLabel value={upload.progress} />
                  </ListItem>
                </Box>
              ))
            }
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}