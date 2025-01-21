import React, {ChangeEvent, FC} from "react";
import CommentsItem from "./CommentsItem";
import {IComment} from "../../../models/iComents";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import {CENTER} from "../../../styles/const";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

interface IProps {
    comments: IComment[] | null;
    addComment: (text: string) => void;
    deleteComment: (comment_id: number) => void;
    updateComment: (comment: IComment) => void;
}

const CommentsContainer = styled("div")(({ theme }) => ({
    padding: theme.spacing(3),
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
}));

const CommentFormPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
}));

const Comments: FC<IProps> = ({comments, addComment, deleteComment, updateComment}) => {
    const [text, setText] = React.useState("");
    const sortedComments = comments?.slice().sort((a, b) => {
        return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
    });
    const commentsList = sortedComments?.map(comment => (<CommentsItem key={comment.id}
                                                                       comment={comment}
                                                                       deleteComment={deleteComment}
                                                                       updateComment={updateComment}/>)) || null;
    const textChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
    const addCommentHandler = () => {
        addComment(text);
        setText("");
    };

    return (
        <CommentsContainer>
            <CommentFormPaper elevation={0}>
                <Grid container spacing={2} alignItems={CENTER} justifyContent={CENTER}>
                    <Grid xs={8}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Добавьте заметку"
                            multiline
                            fullWidth
                            maxRows={4}
                            onChange={textChangeHandler}
                            value={text}
                            onSubmit={addCommentHandler}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                },
                            }}
                        />
                    </Grid>
                    <Grid>
                        <Button
                            type="submit"
                            onClick={addCommentHandler}
                            variant="contained"
                            disabled={!text}
                            sx={{
                                borderRadius: "8px",
                                textTransform: "none",
                                padding: "10px 20px",
                            }}
                        >
                            Добавить
                        </Button>
                    </Grid>
                </Grid>
            </CommentFormPaper>

            {commentsList && commentsList}
        </CommentsContainer>
    );
};

export default Comments;