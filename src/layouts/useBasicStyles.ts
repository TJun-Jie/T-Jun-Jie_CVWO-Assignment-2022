import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@material-ui/core";

const useBasicStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '100vh',
            backgroundColor: '#fff',
            width: '100%',
        },
        content: {},
        main: {},
    })
);

export default useBasicStyles;