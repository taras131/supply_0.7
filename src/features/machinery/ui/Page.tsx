import React from "react";
import {Drawer, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import {IMachinery} from "../../../models/iMachinery";
import {useAppSelector} from "../../../hooks/redux";
import {getMachinery} from "../model/selectors";
import MachineryTable from "./MachineryTable";
import MachineryAddNew from "./MachineryAddNew";


const Page = () => {
    const page = 0;
    const rowsPerPage = 5;
    const [isOpen, setIsOpen] = React.useState(false);
    const machinery = useAppSelector(getMachinery);
    const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return;
        }
        setIsOpen(isOpen);
    };
    const paginatedMachinery = applyPagination(machinery, page, rowsPerPage);
    return (
        <Stack spacing={3} sx={{height: "100%"}}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={1} sx={{flex: "1 1 auto"}}>
                    <Typography variant="h4">Техника</Typography>
                    <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                        <Button color="inherit" sx={{fontSize: "var(--icon-fontSize-md)"}} startIcon={<UploadIcon/>}>
                            Import
                        </Button>
                        <Button color="inherit" sx={{fontSize: "var(--icon-fontSize-md)"}} startIcon={<DownloadIcon/>}>
                            Export
                        </Button>
                    </Stack>
                </Stack>
                <div>
                    <Button
                        onClick={toggleDrawer(true)}
                        startIcon={<AddIcon sx={{fontSize: "var(--icon-fontSize-md)"}}/>}
                        variant="contained">
                        Добавить
                    </Button>
                </div>
            </Stack>
            {/* <CustomersFilters />*/}
            <MachineryTable
                count={paginatedMachinery.length}
                page={page}
                rows={paginatedMachinery}
                rowsPerPage={rowsPerPage}
            />
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                <MachineryAddNew/>
            </Drawer>
        </Stack>
    );
};

function applyPagination(rows: IMachinery[], page: number, rowsPerPage: number): IMachinery[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

export default Page;
