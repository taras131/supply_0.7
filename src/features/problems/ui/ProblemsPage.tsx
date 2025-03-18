import React from "react";
import {useAppSelector} from "../../../hooks/redux";
import {getProblems} from "../model/selectors";
import Problems from "./Problems";

const ProblemsPage = () => {
    const problems = useAppSelector(getProblems);
    return (
        <Problems problems={problems} isMachineryMode={false}/>
    );
};

export default ProblemsPage;