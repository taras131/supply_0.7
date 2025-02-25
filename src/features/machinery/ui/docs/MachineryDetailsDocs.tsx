import React, {FC} from "react";
import MachineryDetailsDocsItem from "./MachineryDetailsDocsItem";
import Box from "@mui/material/Box";
import MachineryDetailsDocsAddNew from "./MachineryDetailsDocsAddNew";
import {useAppSelector} from "../../../../hooks/redux";
import {getCurrentMachineryDocs} from "../../model/selectors";

const MachineryDetailsDocs: FC = () => {
    const docs = useAppSelector(getCurrentMachineryDocs);
    const docList = docs?.map(doc => (<MachineryDetailsDocsItem key={doc.id} doc={doc}/>)) || null;
    return (
        <div style={{width: "100%"}}>
            {docList && (<Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(225px, 100%), 1fr))",
                    gap: "16px",
                }}
            >
                <MachineryDetailsDocsAddNew/>
                {docList}
            </Box>)}
        </div>
    );
};

export default MachineryDetailsDocs;