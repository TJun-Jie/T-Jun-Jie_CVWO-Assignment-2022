import {createStyles, makeStyles} from "@mui/styles";

const useBasicStyles = makeStyles((theme) =>
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