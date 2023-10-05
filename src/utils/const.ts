import {IGuideCategory} from "../models/iGuide";

export enum GUIDE_ITEM_TYPE {
    question = "question",
    result = "result"
}

export enum GUIDE_MODE {
    viewing = "viewing",
    editing = "editing",
    new_guide = "new_guide"
}

export enum MESSAGE_SEVERITY {
    error = "error",
    warning = "warning",
    info = "info",
    success = "success"
}

export const ALL_CATEGORIES: IGuideCategory = {
    id: "all_categories",
    categoryName: "Все"
};

export const EDITION_GUIDE_ID = "edition_guide_id"
export const NEW_GUIDE = "new_guide"
export const OUTLINED = "outlined"
export const CENTER = "center"
export const SPACE_BETWEEN = "space-between"
export const SPACE_AROUND = "space-around"
export const H3 = "h3"
export const H4 = "h4"
export const H5 = "h5"
export const H6 = "h6"
export const START = "start"
export const END = "end"
export const LEFT = "left"
export const RIGHT = "right"
export const COLUMN = "column"
export const ROW = "row"
export const HIDDEN = "hidden"
export const PRIMARY = "primary"
export const DIV = "div"
export const CONTAINED = "contained"
export const SMALL = "small"
export const FORM_CONTROL_HEIGHT_PX = "80px"
export const TEXT_FIELD_MAX_WIDTH_PX = "390px"
export const STRING_EMPTY = ""
export const STRING_WITH_SPACE = " "
export const ADD_BUTTON_TEXT = "Добавить"
export const EMPTY_EXISTING_VALUES_TEXT = "Существующих значений пока нет"
export const ADD_CATEGORY_TITLE = "Добавление категории."
export const ADD_CATEGORY_LABEL = "Новая категория"
export const ADD_CATEGORY_SUBHEADER_TEXT = "Существующие категории"
export const ADD_OPTION_TITLE = "Добавление варианта ответа."
export const ADD_OPTION_LABEL = "Новый вариант ответа"
export const ADD_OPTION_SUBHEADER_TEXT = "Существующие варианты"
export const GUIDE_STEPS_COUNT_TITLE = "Количество шагов:"
export const EMPTY_GUIDE_ITEM_MESSAGE = "Эта часть гайда пока не наполнена, если вы являетесь автором, " +
    "перейдите в режим редактирования для заполнения"
export const NONE = "none"
export const WHITE = "white"
export const INHERIT = "inherit"
export const STATIC = "static"
export const SECONDARY_TEXT_COLOR = "text.secondary";









