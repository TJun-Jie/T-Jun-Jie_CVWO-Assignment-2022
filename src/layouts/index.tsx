import {ReactElement, ReactNode} from "react";
import useBasicStyles from "./useBasicStyles";


export type DefaultLayoutProps = {
    children: ReactElement | ReactNode | null;
};


const BasicLayout = ({children} : DefaultLayoutProps) : ReactElement => {
    const classes = useBasicStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <main className={classes.main}>{children}</main>
            </div>
        </div>
    )

}

export default BasicLayout;