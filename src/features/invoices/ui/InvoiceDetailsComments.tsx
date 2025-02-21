import React, {FC, useState} from "react";
import {FormControl} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {commentPanelId, STRING_EMPTY, STRING_WITH_SPACE} from "utils/const";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {getDateInMilliseconds, validateText} from "utils/services";
import SendIcon from "@mui/icons-material/Send";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "utils/routes";
import AccordionWithTitleCounterIcon from "components/AccordionWithTitleCounterIcon";
import {getCommentsIsLoading} from "store/selectors/coments";
import {getUser} from "features/auth/model/selectors";
import InvoiceDetailsCommentsItem from "features/invoices/ui/InvoiceDetailsCommentsItem";
import {fetchAddComment} from "store/actionsCreators/comments";
import Divider from "@mui/material/Divider";
import {CENTER, FORM_CONTROL_HEIGHT_PX, PRIMARY, SECONDARY_TEXT_COLOR, START} from "styles/const";
import {selectCommentsByInvoiceId} from "store/reducers/coments";

interface IProps {
    invoiceId: string;
    expanded: string | false;
    handleExpandedChange: any;
}

const InvoiceDetailsComments: FC<IProps> = ({invoiceId, expanded, handleExpandedChange}) => {
    const navigate = useNavigate();
    const location: any = useLocation();
    const dispatch = useAppDispatch();
    const [newCommentText, setNewCommentText] = useState(STRING_EMPTY);
    const [errorCommentText, setErrorCommentText] = useState(STRING_WITH_SPACE);
    const comments = useAppSelector(selectCommentsByInvoiceId(invoiceId));
    const isLoading = useAppSelector((state) => getCommentsIsLoading(state));
    const user = useAppSelector((state) => getUser(state));
    const commentsList = comments.map((comment) => (
        <InvoiceDetailsCommentsItem key={comment.id} {...comment} userId={user.id}/>
    ));
    const handleLoginClick = () => {
        navigate(routes.login, {state: {from: location.pathname}});
    };
    const handleRegisterClick = () => {
        navigate(routes.register, {state: {from: location.pathname}});
    };
    const handleNewCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateText(e.target.value, setErrorCommentText, [], 10);
        setNewCommentText(e.target.value);
    };
    const handleAddCommentClick = () => {
        dispatch(
            fetchAddComment({
                authorId: user.id,
                invoiceId: invoiceId,
                text: newCommentText,
                dateCreation: getDateInMilliseconds(),
            }),
        );
        setNewCommentText(STRING_EMPTY);
        setErrorCommentText(STRING_WITH_SPACE);
    };
    return (
        <AccordionWithTitleCounterIcon
            title={"Комментарии"}
            count={comments.length}
            expanded={expanded}
            panelId={commentPanelId}
            handleExpandedChange={handleExpandedChange}
            icon={<ChatBubbleOutlineIcon color={PRIMARY}/>}
        >
            <Stack spacing={3}>
                <Divider/>
                {!user?.id && (
                    <Typography color={SECONDARY_TEXT_COLOR} fontSize={"16px"} fontWeight={500} mt={4} mb={4}>
            <span onClick={handleLoginClick} style={{cursor: "pointer", color: "purple"}}>
              Войдите{" "}
            </span>
                        или
                        <span onClick={handleRegisterClick} style={{cursor: "pointer", color: "purple"}}>
              {" "}
                            зарегистрируйтесь{" "}
            </span>
                        , чтобы писать комментарии.
                    </Typography>
                )}
                {user?.id && (
                    <FormControl sx={{minHeight: FORM_CONTROL_HEIGHT_PX}}>
                        <Grid container alignItems={START} spacing={2}>
                            <Grid xs={12} sm={8} md={9}>
                                <TextField
                                    value={newCommentText}
                                    onChange={handleNewCommentTextChange}
                                    fullWidth
                                    helperText={errorCommentText}
                                />
                            </Grid>
                            <Grid xs={12} sm={4} md={3}>
                                <Button
                                    fullWidth
                                    disabled={!user?.id || !!errorCommentText}
                                    variant={"outlined"}
                                    onClick={handleAddCommentClick}
                                    sx={{height: "56px", textAlign: "center"}}
                                >
                                    <Grid container alignItems={CENTER} justifyContent={CENTER}>
                                        <SendIcon/>
                                        <Typography ml={2}>Отправить</Typography>
                                    </Grid>
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                )}
                {isLoading && <Typography>...Загрузка</Typography>}
                {commentsList.length > 0 ? commentsList : <Typography mt={5}>Комментариев пока нет</Typography>}
            </Stack>
        </AccordionWithTitleCounterIcon>
    );
};

export default InvoiceDetailsComments;
