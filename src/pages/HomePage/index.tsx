import BasicLayout from "../../layouts";
import {useTranslation} from "react-i18next";

const HomePage = () => {
    const {t} = useTranslation();
    return (<BasicLayout>
        <div>{t("test")}</div>
    </BasicLayout>)
}

export default HomePage;
