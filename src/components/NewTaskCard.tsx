import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

const TextFieldStyles = {
  marginBottom: "0.5rem",

  "& .MuiInputLabel-root": {
    color: "secondary.light",
  },
  "& input": {
    color: "secondary.light",
  },
};

const SelectFieldStyles = {
  "& .MuiSelect-select": {
    color: "secondary.light",
  },
};

type NewTaskCardProps = {
  setShowTaskCard: (state: boolean) => void;
};

const NewTaskCard = ({ setShowTaskCard }: NewTaskCardProps) => {
  const [label, setLabel] = useState("test");

  return (
    <Box
      sx={{
        marginTop: "2rem",
        marginLeft: "26.5px",
      }}
    >
      <Card
        sx={{
          backgroundColor: "secondary.main",
          textAlign: "start",
        }}
      >
        <CardContent>
          <TextField
            sx={TextFieldStyles}
            fullWidth
            label="Title"
            variant="outlined"
          />
          <TextField
            sx={TextFieldStyles}
            fullWidth
            label="Description"
            variant="outlined"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Select
              sx={SelectFieldStyles}
              value={label}
              label="Labels"
              onChange={(e) => setLabel(e.target.value)}
            >
              <MenuItem value="test">Test</MenuItem>
            </Select>
            <Box>
              <Button sx={{ mr: "1rem", mt: "15px" }} variant="outlined">
                Add Task
              </Button>
              <Button
                sx={{ mr: "1rem", mt: "15px" }}
                variant="outlined"
                onClick={() => setShowTaskCard(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewTaskCard;
