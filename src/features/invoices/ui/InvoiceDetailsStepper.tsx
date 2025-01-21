import React, { FC, useEffect, useState } from "react";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { convertMillisecondsToDate } from "utils/services";
import { IInvoice } from "models/iInvoices";
import { useAppSelector } from "hooks/redux";
import Box from "@mui/material/Box";
import {getUserFullNameById} from "../../users/model/selectors";
import {IShipments} from "../../../models/iShipments";

interface IProps {
  invoice: IInvoice;
  shipment: IShipments | false;
}

const InvoiceDetailsStepper: FC<IProps> = ({ invoice, shipment }) => {
  const { approved, paid, author, cancel } = invoice;
  const [activeStep, setActiveStep] = useState(0);
  const delay = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
  useEffect(() => {
    setActiveStep(0);
    delay(400)
      .then(() => {
        if (approved.isApproved) {
          setActiveStep(1);
        }
        return delay(400);
      })
      .then(() => {
        if (paid.isPaid) {
          setActiveStep(2);
        }
        return delay(400);
      })
      .then(() => {
        if (shipment && shipment.author.dateCreating) {
          setActiveStep(3);
        }
        return delay(400);
      })
      .then(() => {
        if (shipment && shipment.receiving && shipment.receiving.isReceived) {
          setActiveStep(4);
        }
      });
  }, [approved, paid, author, cancel]);

  const authorInvoiceFullName = useAppSelector((state) => {
    if (author && author.userId) {
      return getUserFullNameById(state, +author.userId);
    } else {
      return "";
    }
  });
  const approvedAuthorFullName = useAppSelector((state) => {
    if (approved && approved.userId) {
      return getUserFullNameById(state, +approved.userId);
    } else {
      return "";
    }
  });
  const paidAuthorFullName = useAppSelector((state) => {
    if (paid && paid.userId) {
      return getUserFullNameById(state, paid.userId);
    } else {
      return "";
    }
  });
  const cancelAuthorFullName = useAppSelector((state) => {
    if (cancel && cancel.userId) {
      return getUserFullNameById(state, cancel.userId);
    } else {
      return "";
    }
  });
  const shipmentAuthorFullName = useAppSelector((state) => {
    if (shipment && shipment.author && shipment.author.userId) {
      return getUserFullNameById(state, shipment.author.userId);
    } else {
      return "";
    }
  });
  const receivingAuthorFullName = useAppSelector((state) => {
    if (shipment && shipment.receiving && shipment.receiving.userId) {
      return getUserFullNameById(state, shipment.receiving.userId);
    } else {
      return "";
    }
  });
  const createdDate = author && author.date ? convertMillisecondsToDate(author.date) : "";
  const approvedDate = approved && approved.date ? convertMillisecondsToDate(approved.date) : "";
  const paidDate = paid && paid.date ? convertMillisecondsToDate(paid.date) : "";
  const cancelDate = cancel && cancel.date ? convertMillisecondsToDate(cancel.date) : "";
  const shipmentDate =
    shipment && shipment.author.dateCreating ? convertMillisecondsToDate(shipment.author.dateCreating) : "";
  const receivingDate =
    shipment && shipment.receiving && shipment.receiving.dateCreating
      ? convertMillisecondsToDate(shipment.author.dateCreating)
      : "";
  return (
    <Stepper activeStep={activeStep} orientation={"vertical"} sx={{ height: "100%" }}>
      <Step key={"Добавлен"}>
        <StepLabel>
          <Box ml={2}>
            <Typography fontSize={"16px"} fontWeight={550}>
              {`Добавлен ${createdDate}`}
            </Typography>
            <Typography fontSize={"16px"} fontWeight={500}>
              {authorInvoiceFullName}
            </Typography>
          </Box>
        </StepLabel>
      </Step>
      <Step key={"Одобрен"}>
        <StepLabel error={cancel && cancel.isCancel}>
          <Box ml={2}>
            <Typography fontSize={"16px"} fontWeight={550}>
              {cancel && cancel.isCancel ? `Отменён ${cancelDate}` : `Одобрен ${approvedDate}`}
            </Typography>
            <Typography fontSize={"16px"} fontWeight={500}>
              {cancel && cancel.isCancel ? cancelAuthorFullName : approvedAuthorFullName}
            </Typography>
          </Box>
        </StepLabel>
      </Step>
      <Step key={"Оплачен"}>
        <StepLabel>
          <Box ml={2}>
            <Typography fontSize={"16px"} fontWeight={550}>
              {`Оплачен ${paidDate}`}
            </Typography>
            <Typography fontSize={"16px"} fontWeight={500}>
              {paidAuthorFullName}
            </Typography>
          </Box>
        </StepLabel>
      </Step>
      <Step key={"Отгружен"}>
        <StepLabel>
          <Box ml={2}>
            <Typography fontSize={"16px"} fontWeight={550}>
              {`Отгружен ${shipmentDate}`}
            </Typography>
            <Typography fontSize={"16px"} fontWeight={500}>
              {shipmentAuthorFullName}
            </Typography>
          </Box>
        </StepLabel>
      </Step>
      <Step key={"Получен"}>
        <StepLabel>
          <Box ml={2}>
            <Typography fontSize={"16px"} fontWeight={550}>
              {`Получен ${receivingDate}`}
            </Typography>
            <Typography fontSize={"16px"} fontWeight={500}>
              {receivingAuthorFullName}
            </Typography>
          </Box>
        </StepLabel>
      </Step>
    </Stepper>
  );
};
export default InvoiceDetailsStepper;
