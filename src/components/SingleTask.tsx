import {
  Checkbox,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type SingleTaskProps = {
  title: string;
};

const SingleTask = ({ title }: SingleTaskProps) => {
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Checkbox />
        </ListItemIcon>
        <ListItemText>{title}</ListItemText>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default SingleTask;
