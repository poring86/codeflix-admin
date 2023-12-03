import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, Typography } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { LinearProgressWithLabel } from "../../components/Progress";
import { useAppSelector } from "../../app/hooks";
import { selectUploads } from "./uploadSlice";

type Upload = {
  name: string
  progress: number
}

type Props = {
  uploads?: Upload[]
}

export const UploadList: React.FC<Props> = () => {
  const uploadList = useAppSelector(selectUploads)

  if (!uploadList || uploadList.length === 0) {
    return null
  }
  return (
    <Box sx={{
      width: "100%",
      position: "fixed",
      bottom: 0,
      right: 0,
      zIndex: 9,
      "@media (min-width: 600px)": {
        width: 450
      }
    }}>
      <Accordion>
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