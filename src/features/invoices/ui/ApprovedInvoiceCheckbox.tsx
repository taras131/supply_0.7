import React, { FC, useId, useState } from "react";
import { Checkbox, useMediaQuery } from "@mui/material";
import { IInvoice } from "models/iInvoices";
import { getDateInMilliseconds } from "utils/services";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getUser } from "features/auth/model/selectors";
import MessageWindow from "components/MessageWindow";
import { userRoles } from "utils/const";
import {fetchUpdateInvoiceApproved} from "features/invoices/model/actions";

interface IProps {
  invoice: IInvoice;
}

const errorMessage = "Только руководитель может одобрять счета на оплату. Если вы не вошли в систему, авторизируйтесь.";

const ApprovedInvoiceCheckbox: FC<IProps> = ({ invoice }) => {
  const checkboxId = useId();
  const dispatch = useAppDispatch();
  const [isOpenErrorMessageWindow, setIsOpenErrorMessageWindow] = useState(false);
  const matches_470 = useMediaQuery("(min-width:470px)");
  const user = useAppSelector((state) => getUser(state));
  const toggleIsOpenErrorMessageWindow = () => {
    setIsOpenErrorMessageWindow((prev) => !prev);
  };
  const handleApprovedChange = () => {
    if (user && user.role === userRoles.boss) {
      dispatch(
        fetchUpdateInvoiceApproved({
          invoiceId: invoice.id,
          newApproved: {
            userId: user.id,
            date: getDateInMilliseconds(),
            isApproved: !invoice.approved.isApproved,
          },
        }),
      );
    } else {
      toggleIsOpenErrorMessageWindow();
    }
  };
  return (
    <>
      <Checkbox
        checked={invoice.approved.isApproved}
        onChange={handleApprovedChange}
        sx={{ "& .MuiSvgIcon-root": { fontSize: matches_470 ? 38 : 24 }, margin: 0, padding: 0 }}
        id={checkboxId}
      />
      <MessageWindow
        isOpenModal={isOpenErrorMessageWindow}
        handleToggleOpen={toggleIsOpenErrorMessageWindow}
        message={errorMessage}
      />
    </>
  );
};

export default ApprovedInvoiceCheckbox;
