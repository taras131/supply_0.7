import React from "react";
import PageLayout from "../components/PageLayout";
import PageHeaderWithTitleAndTwoButtons from "../components/PageHeaderWithTitleAndTwoButtons";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";

const MachineryAddNew = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(location.state && location.state.from ? location.state.from : routes.machinery);
    };
    return (
        <PageLayout>
            <PageHeaderWithTitleAndTwoButtons
                leftButtonText={"Назад"}
                rightButtonText={"Сохранить"}
                title={"Новая техника"}
                handleLeftButtonClick={handleBackClick}
                handleRightButtonClick={handleBackClick}/>
            MachineryAddNew
        </PageLayout>
    );
};

export default MachineryAddNew;