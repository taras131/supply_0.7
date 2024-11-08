import React, { FC, useId } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { CENTER, StyledTextField } from "styles/const";
import LoadingButton from "@mui/lab/LoadingButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Typography from "@mui/material/Typography";
import { selectSuppliers } from "store/reducers/suppliers";
import { useAppSelector } from "hooks/redux";

interface IInputValue {
  amount: number;
  number: string;
}

interface IProps {
  inputValue: IInputValue;
  setInputValue: (newInputValue: IInputValue) => void;
  selectedSupplierId: string;
  setSelectedSupplierId: (string: any) => void;
  setIsWithVAT: (isWithVAT: boolean) => void;
  isWithVAT: boolean;
  fileName: string;
  isUploadFileLoading: boolean;
  handleChangeInputFile: (e: any) => void;
}

const InvoicesAddNewInputFields: FC<IProps> = ({
  inputValue,
  setInputValue,
  setSelectedSupplierId,
  setIsWithVAT,
  selectedSupplierId,
  isWithVAT,
  fileName,
  isUploadFileLoading,
  handleChangeInputFile,
}) => {
  const matches_500 = useMediaQuery("(min-width:500px)");
  const selectLabelId = useId();
  const selectId = useId();
  const selectSupplier = useId();
  const checkboxId = useId();
  const suppliers = useAppSelector(selectSuppliers);
  const suppliersList = suppliers.map((supplier) => (
    <MenuItem
      key={`${supplier.id}_${supplier.name}`}
      value={supplier.id}
    >{`${supplier.name} - ${supplier.INN}`}</MenuItem>
  ));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const handleSupplierChange = (e: SelectChangeEvent) => {
    setSelectedSupplierId(e.target.value as string);
  };
  const handleIsWithVATSelected = () => {
    setIsWithVAT((prev) => !prev);
  };
  return (
    <Stack spacing={2} sx={{ width: "100%", paddingLeft: "-12px", paddingRight: "-12px" }}>
      <Grid container spacing={matches_500 ? 3 : 1} sx={{ width: "100%" }}>
        <Grid xs={matches_500 ? 6 : 12}>
          <FormControl fullWidth>
            <InputLabel id={selectLabelId}>Поставщик</InputLabel>
            <Select
              id={selectId}
              name={selectSupplier}
              labelId={selectLabelId}
              defaultValue={""}
              value={selectedSupplierId}
              label={"Поставщик"}
              onChange={handleSupplierChange}
              sx={{ overflow: "hidden" }}
            >
              {suppliersList}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={matches_500 ? 6 : 12}>
          <TextField
            value={inputValue.number}
            onChange={handleInputChange}
            name="number"
            label="Номер счёта"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={matches_500 ? 3 : 1} sx={{ maxWidth: "1374px", width: "100%" }}>
        <Grid xs={matches_500 ? 4 : 6}>
          <StyledTextField
            value={inputValue.amount}
            onChange={handleInputChange}
            name="amount"
            type={"number"}
            label="Сумма"
          />
        </Grid>
        <Grid xs={matches_500 ? 4 : 6} pl={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isWithVAT}
                onChange={handleIsWithVATSelected}
                id={checkboxId}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 38 } }}
              />
            }
            label="C НДС"
          />
        </Grid>
        <Grid xs={matches_500 ? 4 : 12}>
          <Stack sx={{ width: "100%" }} spacing={1} alignItems={CENTER}>
            <LoadingButton
              variant="outlined"
              component="label"
              loading={isUploadFileLoading}
              fullWidth
              startIcon={fileName ? <AutorenewIcon /> : <AttachFileIcon />}
            >
              {fileName ? "Заменить счёт" : "Прикрепить счёт"}
              <input type="file" hidden onChange={handleChangeInputFile} />
            </LoadingButton>
            {fileName && <Typography>Файл: {fileName.split("-")[1]}</Typography>}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default InvoicesAddNewInputFields;
