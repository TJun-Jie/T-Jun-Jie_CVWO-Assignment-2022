import {ReactElement, ReactNode} from "react";
import useBasicStyles from "./useBasicStyles";
import Header from "./Header";


export type DefaultLayoutProps = {
    children: ReactElement | ReactNode | null;
};


const BasicLayout = ({children} : DefaultLayoutProps) : ReactElement => {
    const classes = useBasicStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Header/>
                <main className={classes.main}>{children}</main>
            </div>
        </div>
    )

}

export default BasicLayout;