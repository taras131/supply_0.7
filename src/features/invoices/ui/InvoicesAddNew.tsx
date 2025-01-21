import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { emptyInvoice } from "models/iInvoices";
import { getDateInMilliseconds } from "utils/services";
import { getUser } from "features/auth/model/selectors";
import PageHeaderWithTitleAndTwoButtons from "components/PageHeaderWithTitleAndTwoButtons";
import { routes } from "utils/routes";
import { useNavigate } from "react-router-dom";
import OrdersList from "features/orders/ui/OrdersList";
import PageLayout from "components/PageLayout";
import InvoicesAddNewInputFields from "features/invoices/ui/InvoicesAddNewInputFields";
import {getOrders} from "features/orders/model/selectors";
import {getSelectedOrderPosition} from "features/invoices/model/selectors";
import {resetSelectedOrderPosition} from "features/invoices/model/slice";
import {fetchAddInvoice, fetchRemoveFile, fetchUploadFile} from "features/invoices/model/actions";

const InvoicesAddNew: FC = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState({
    amount: 0,
    number: "",
  });
  const forSelectPositionsOrders = useAppSelector((state) => getOrders(state, true, false));
  const allOrders = useAppSelector((state) => getOrders(state, false));
  const navigate = useNavigate();
  const [isWithVAT, setIsWithVAT] = useState(true);
  const user = useAppSelector((state) => getUser(state));
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [isUploadFileLoading, setIsUploadFileLoading] = useState(false);
  const selectedPosition = useAppSelector(getSelectedOrderPosition);
  const [fileName, setFileName] = useState("");
  const [filePatch, setFilePatch] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (selectedSupplierId && filePatch && inputValue.amount && inputValue.number) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedSupplierId, filePatch, inputValue.amount, inputValue.number]);
  const updateFile = (name: string, filePatch: string) => {
    setFileName(name);
    setFilePatch(filePatch);
  };

  const handleAddClick = async () => {
    dispatch(
      fetchAddInvoice({
        invoice: {
          ...emptyInvoice,
          author: { ...emptyInvoice.author, date: getDateInMilliseconds(), userId: user.id },
          isWithVAT: isWithVAT,
          supplierId: selectedSupplierId,
          number: inputValue.number,
          amount: +inputValue.amount,
          invoiceFileLink: filePatch,
        },
        orders: allOrders,
        selectedPosition: selectedPosition,
      }),
    );
    setInputValue({
      amount: 0,
      number: "",
    });
    setIsWithVAT(true);
    setFileName("");
    setFilePatch("");
    setDisabled(true);
    setSelectedSupplierId("");
    navigate(routes.invoices);
    dispatch(resetSelectedOrderPosition());
  };
  const handleChangeInputFile = (e: any) => {
    setIsUploadFileLoading(true);
    if (filePatch) {
      dispatch(fetchRemoveFile(fileName));
    }
    dispatch(
      fetchUploadFile({
        file: e.target.files[0],
        updateFile: updateFile,
        setIsUpdateFileLoading: setIsUploadFileLoading,
      }),
    );
    setFileName(e.target.files[0].name);
  };
  const handleBackClick = () => {
    navigate(routes.invoices);
  };
  return (
    <PageLayout maxWidth={1000}>
      <PageHeaderWithTitleAndTwoButtons
        leftButtonText={"Назад"}
        rightButtonText={"Сохранить"}
        title={"Новый счёт:"}
        handleLeftButtonClick={handleBackClick}
        handleRightButtonClick={handleAddClick}
        isRightButtonDisabled={disabled}
      />
      <InvoicesAddNewInputFields
        inputValue={inputValue}
        setInputValue={setInputValue}
        fileName={fileName}
        selectedSupplierId={selectedSupplierId}
        setIsWithVAT={setIsWithVAT}
        isWithVAT={isWithVAT}
        setSelectedSupplierId={setSelectedSupplierId}
        handleChangeInputFile={handleChangeInputFile}
        isUploadFileLoading={isUploadFileLoading}
      />
      <Stack spacing={2} sx={{ maxWidth: 1350, width: "100%" }}>
        <Typography fontSize={"16px"} fontWeight={600}>
          Отметьте в заявках, входящие в счёт позиции:
        </Typography>
        <OrdersList isSelectPositionMode orders={forSelectPositionsOrders} />
      </Stack>
    </PageLayout>
  );
};

export default InvoicesAddNew;
