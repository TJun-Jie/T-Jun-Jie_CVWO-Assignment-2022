import {createStyles, makeStyles} from "@mui/styles";


const useHomeStyles = makeStyles((theme) =>
    createStyles({
        root: {
            backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(135,134,134,0.9) 100%), url(background2.jpg)',
            width: '100%',
            minHeight: 'calc(100vh - 64px) ',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            textAlign: 'center',
        },
        main: {},
        button: {
            marginTop: '2rem !important',
        }
    })
);

export default useHomeStyles;