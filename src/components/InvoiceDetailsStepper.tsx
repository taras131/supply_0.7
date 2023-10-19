import React, {FC} from "react";
import Box from "@mui/material/Box";
import {Stack, Step, StepLabel, Stepper, Typography} from "@mui/material";
import {convertMillisecondsToDate} from "../utils/services";
import {IInvoice} from "../models/iInvoices";

const InvoiceDetailsStepper: FC<IInvoice> = ({approved, paid, author, cancel}) => {
    let activeStep = 0;
    if (approved.isApproved) {
        activeStep = 1;
    }
    if (paid.isPaid) {
        activeStep = 2;
    }
    return (
        <Box sx={{maxWidth: "1200px", width: "100%", paddingTop: "60px"}}>
            <Stepper activeStep={activeStep} alternativeLabel>
                <Step key={1}>
                    <StepLabel>
                        <Stack spacing={1}>
                            <Typography fontSize={16} fontWeight={600}>
                                Добавлен {convertMillisecondsToDate(author.date)}
                            </Typography>
                            <Typography>{author.userId}</Typography>
                        </Stack>
                    </StepLabel>
                </Step>
                <Step key={2}>
                    <StepLabel error={cancel && cancel.isCancel}>
                        <Stack spacing={1}>
                            {cancel && cancel.isCancel
                            ?(
                                    <Typography fontSize={16} fontWeight={600}>
                                        Отменён {cancel.isCancel && (
                                        " " + convertMillisecondsToDate(cancel.date)
                                    )}
                                    </Typography>
                                )
                            :(
                                    <Typography fontSize={16} fontWeight={600}>
                                        Одобрен
                                        {approved.isApproved && (
                                            " " + convertMillisecondsToDate(approved.date)
                                        )}
                                    </Typography>
                                )}


                            <Typography>{paid.userId}</Typography>
                        </Stack>
                    </StepLabel>
                </Step>
                <Step key={3}>
                    <StepLabel>
                        <Stack>
                            <Typography fontSize={16} fontWeight={600}>
                                Оплачен
                                {paid.isPaid && (
                                    " " + convertMillisecondsToDate(paid.date)
                                )}
                            </Typography>
                            <Typography>{paid.userId}</Typography>
                        </Stack>
                    </StepLabel>
                </Step>
            </Stepper>
        </Box>
    );
};

export default InvoiceDetailsStepper;