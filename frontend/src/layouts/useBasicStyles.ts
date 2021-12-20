import {createStyles, makeStyles} from "@mui/styles";

const useBasicStyles = makeStyles((theme) =>
    createStyles({
        root: {
            minHeight: '100vh',
            backgroundColor: '#fff',
            width: '100%',
        },
        content: {},
        main: {
            backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(135,134,134,0.95) 100%), url(background2.jpg)',
            width: '100%',
            minHeight: 'calc(100vh - 64px) ',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            textAlign: 'center',
        },
        button: {
            marginTop: '2rem !important',
        }
    })
);

export default useBasicStyles;