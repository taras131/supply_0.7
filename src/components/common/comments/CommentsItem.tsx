import React, {ChangeEvent, FC} from "react";
import {IComment} from "../../../models/iComents";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import {CENTER} from "../../../styles/const";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CloseIcon from "@mui/icons-material/Close";
import {styled} from "@mui/material/styles";

interface IProps {
    comment: IComment;
    deleteComment: (comment_id: number) => void;
    updateComment: (comment: IComment) => void;
}

const CommentBox = styled(Box)(({theme}) => ({
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    borderRadius: "12px",
    boxShadow: theme.shadows[1],
    transition: "box-shadow 0.3s ease",
    "&:hover": {
        boxShadow: theme.shadows[3],
    },
    padding: theme.spacing(1), // Уменьшенный отступ
}));

const CommentAvatar = styled(Avatar)(({theme}) => ({
    width: 50,
    height: 50,
    backgroundColor: theme.palette.primary.main,
    fontWeight: "bold",
}));

const CommentText = styled(Typography)(({theme}) => ({
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
}));

const ActionButton = styled(IconButton)(({theme}) => ({
    padding: 8,
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const CommentsItem: FC<IProps> = ({comment, deleteComment, updateComment}) => {
    const [text, setText] = React.useState(comment.text);
    const [isEditMode, setIsEditMode] = React.useState(false);

    const toggleIsEditMode = () => {
        setIsEditMode(prev => !prev);
    };

    const onTextChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const deleteCommentHandler = () => {
        deleteComment(comment.id);
    };

    const updateCommentHandler = () => {
        updateComment({...comment, text: text});
        toggleIsEditMode();
    };

    const cancelUpdateCommentHandler = () => {
        setText(comment.text);
        toggleIsEditMode();
    };

    const addLikeHandler = () => {
        updateComment({...comment, rating: [...comment.rating, 1]});
    };

    return (
        <CommentBox>
            <Grid container spacing={2} alignItems={CENTER} justifyContent="space-between" sx={{padding: 0}}>
                <Grid>
                    <CommentAvatar>{comment.author_id}</CommentAvatar>
                </Grid>
                <Grid  xs={7}>
                    {isEditMode ? (
                        <TextField
                            fullWidth
                            variant="standard"
                            value={text}
                            onChange={onTextChangeHandler}
                            autoFocus
                            sx={{
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "primary.main",
                                },
                            }}
                        />
                    ) : (
                        <CommentText>{comment.text}</CommentText>
                    )}
                </Grid>
                <Grid xs={2} sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                    {isEditMode ? (
                        <>
                            <ActionButton color="error" onClick={cancelUpdateCommentHandler}>
                                <CloseIcon/>
                            </ActionButton>
                            <ActionButton color="success" onClick={updateCommentHandler}>
                                <SaveIcon/>
                            </ActionButton>
                        </>
                    ) : (
                        <>
                            <Typography variant="body2" sx={{marginRight: 1}}>
                                {comment.rating ? comment.rating.length : 0}
                            </Typography>
                            <ActionButton color="primary" onClick={addLikeHandler}>
                                <ThumbUpIcon/>
                            </ActionButton>
                            <ActionButton color="primary" onClick={toggleIsEditMode}>
                                <EditNoteIcon/>
                            </ActionButton>
                            <ActionButton color="error" onClick={deleteCommentHandler}>
                                <DeleteIcon/>
                            </ActionButton>
                        </>
                    )}
                </Grid>
            </Grid>
        </CommentBox>
    );
};

export default CommentsItem;
