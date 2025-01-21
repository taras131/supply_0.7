import React, { FC } from "react";
import { ICancel, IPaid } from "models/iInvoices";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getUser } from "features/auth/model/selectors";
import { getDateInMilliseconds } from "utils/services";
import {fetchUpdateInvoiceApproved, fetchUpdateInvoiceCancel} from "features/invoices/model/actions";

interface IProps {
  id: string;
  cancel: ICancel;
  paid: IPaid;
}

const InvoiceDetailsCancel: FC<IProps> = ({ id, cancel, paid }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => getUser(state));
  const handleCancelClick = () => {
    if (cancel && cancel.isCancel) {
      dispatch(
        fetchUpdateInvoiceCancel({
          invoiceId: id,
          newCancel: {
            isCancel: false,
            date: 0,
            userId: user.uid,
          },
        }),
      );
    } else {
      dispatch(
        fetchUpdateInvoiceCancel({
          invoiceId: id,
          newCancel: {
            isCancel: true,
            date: getDateInMilliseconds(),
            userId: user.uid,
          },
        }),
      );
      dispatch(
        fetchUpdateInvoiceApproved({
          invoiceId: id,
          newApproved: {
            userId: user.uid,
            date: getDateInMilliseconds(),
            isApproved: false,
          },
        }),
      );
    }
  };
  return (
    <>
      {cancel && cancel.isCancel ? (
        <Button sx={{ width: "200px" }} variant={"outlined"} color={"secondary"} onClick={handleCancelClick}>
          Возобновить
        </Button>
      ) : (
        <Button
          sx={{ width: "200px" }}
          variant={"outlined"}
          color={"secondary"}
          onClick={handleCancelClick}
          disabled={paid.isPaid}
        >
          Отменить
        </Button>
      )}
    </>
  );
};

export default InvoiceDetailsCancel;
