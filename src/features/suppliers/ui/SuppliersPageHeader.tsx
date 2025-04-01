import React, {ChangeEvent, FC} from "react";
import {Button, SelectChangeEvent, Stack, Typography, useMediaQuery} from "@mui/material";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import SearchTextField from "../../../components/common/SearchTextField";

interface IProps {
    suppliersFilter: {
        name: string,
    };
    handleAddClick: () => void;
    filterChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => void;
}

const SuppliersPageHeader:FC<IProps> = ({handleAddClick, suppliersFilter, filterChangeHandler}) => {
    const matches_850 = useMediaQuery("(max-width:850px)");

    return (
      <Card>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <Typography fontSize={matches_850 ? "1.5rem" : "2rem"} variant="h4">Поставщики</Typography>
              <Button
                  onClick={handleAddClick}
                  startIcon={<AddIcon/>}
                  variant="contained"
              >
                  Добавить
              </Button>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" mt={2} sx={{flexWrap: "wrap"}}>
              <SearchTextField value={suppliersFilter.name}
                               label="Поиск по названию"
                               name="name"
                               onChange={filterChangeHandler}/>
          </Stack>
      </Card>
  );
};

export default SuppliersPageHeader;
