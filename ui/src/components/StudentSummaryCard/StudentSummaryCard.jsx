import { UserAvatar } from "../UserAvatar/UserAvatar";
import {StudentTradingInfo} from "../StudentTradingInfo/StudentTradingInfo"
import {
  Card,
  Box,
  Typography,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { useState } from "react";

export const StudentSummaryCard = ({ username, tradeHistory }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        key={`${username}ResumeCard`}
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          minWidth: { xs: "200px", md: "250px", lg: "300px", xl: "300px" },
          py: "30px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "22% 78%",
            gap: 0,
            marginBottom: 2,
          }}
        >
          <Box sx={{ gridColumn: 1, display: "grid", placeContent: "left" }}>
            <UserAvatar username={username} />
          </Box>
          <Typography
            level="h2"
            component="h2"
            sx={{ gridColumn: 2, textAlign: "left" }}
          >
            {username}
          </Typography>
        </Box>
        <Typography level="p" component="p" sx={{ mx: "7px" }}>
          {`Transacciones: ${tradeHistory.length}`}
        </Typography>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <StudentTradingInfo info={tradeHistory} username={username}/>
        </ModalDialog>
      </Modal>
    </>
  );
};
