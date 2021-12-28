import BasicLayout from "../../layouts";
import { Box, List, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CelebrationIcon from "@mui/icons-material/Celebration";

const CompletedTaskPage = () => {
  const { t } = useTranslation();

  return (
    <BasicLayout>
      <div>
        <Box sx={{ height: "100px" }} />
        <Box
          sx={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "start",
          }}
        >
          <Box sx={{ ml: "26.5px", display: "flex" }}>
            <CelebrationIcon sx={{ color: "yellow" }} />
            <Typography
              sx={{ color: "secondary.light", ml: "5px", mr: "5px" }}
              variant="h5"
            >
              {t("completedTask")}
            </Typography>
            <CelebrationIcon sx={{ color: "yellow" }} />
          </Box>
          <Box>
            <List></List>
          </Box>
        </Box>
      </div>
    </BasicLayout>
  );
};

export default CompletedTaskPage;
