import BasicLayout from "../../layouts";
import { useTranslation } from "react-i18next";
import useHomeStyles from "./useHomeStyles";
import NewTaskCard from "../../components/NewTaskCard";
import { Box, Button, List, Typography } from "@mui/material";
import { useState } from "react";
import SingleTask from "../../components/SingleTask";

const HomePage = () => {
  const { t } = useTranslation();
  const styles = useHomeStyles();

  const [showTaskCard, setShowTaskCard] = useState(false);
  return (
    <BasicLayout>
      <div className={styles.root}>
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
            <Typography sx={{ ml: "26.5px" }} variant="h5">
              {t("currentTask")}
            </Typography>
            <Box>
              <List>
                <SingleTask title="first task"></SingleTask>
              </List>
            </Box>
            {!showTaskCard && (
              <Button
                className={styles.button}
                color="secondary"
                variant="contained"
                onClick={() => setShowTaskCard(true)}
                sx={{ ml: "26.5px" }}
              >
                Add Task
              </Button>
            )}

            {showTaskCard && <NewTaskCard setShowTaskCard={setShowTaskCard} />}
          </Box>
        </div>
      </div>
    </BasicLayout>
  );
};

export default HomePage;
