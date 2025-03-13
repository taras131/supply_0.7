import {INewProblem, IProblem} from "../../../models/IProblems";
import {INewTask, ITask, ITaskPriority, ITaskStatus} from "../../../models/ITasks";
import {ICurrentMachinery, INewMachinery} from "../../../models/iMachinery";
import {MachineryStatus} from "../../../utils/const";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import WarningIcon from '@mui/icons-material/Warning';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

export const engineTypes = [
    {id: 0, title: "Дизельный"},
    {id: 1, title: "Бензиновый"},
    {id: 4, title: "Электрический"},
    {id: 5, title: "Гибридный"},
];

export const tractionTypes = [
    {id: 0, title: "Колёсный"},
    {id: 1, title: "Гусенечный"},
    {id: 4, title: "Стационарный"},
    {id: 5, title: "Шагающий"},
];

export const transmissionTypes = [
    {id: 0, title: "Механическая"},
    {id: 1, title: "Гидростатическая"},
];

export const operatingTypes = [
    {id: 0, title: "Час"},
    {id: 1, title: "Километр"},
];

export const machineryTypes = [
    {id: 0, title: "Легковые а/м"},
    {id: 1, title: "Грузовые а/м"},
    {id: 4, title: "Асфальтоукладчики"},
    {id: 5, title: "Беспилотная/роботизированная платформа"},
    {id: 6, title: "Бетоносмеситель"},
    {id: 7, title: "Бульдозер"},
    {id: 8, title: "Бульдозер для мусора"},
    {id: 9, title: "Буровой станок"},
    {id: 10, title: "Вибропогружатель"},
    {id: 11, title: "Генератор электрический"},
    {id: 12, title: "Грефер телескопический"},
    {id: 13, title: "Драглайн (экскаватор тросовый)"},
    {id: 14, title: "Драга"},
    {id: 15, title: "Дробилка передвижная"},
    {id: 16, title: "Земснаряд"},
    {id: 17, title: "Каток дорожный"},
    {id: 18, title: "Комбайн сельскохозяйственный"},
    {id: 19, title: "Кран самоходный"},
    {id: 20, title: "Планировщики холодного типа"},
    {id: 21, title: "Погрузчик вилочный"},
    {id: 22, title: "Погрузчик стреловой (перегружатель)"},
    {id: 23, title: "Погрузчик с бортовым поворотом"},
    {id: 24, title: "Погрузчик с телескопической стрелой"},
    {id: 25, title: "Погрузчик со сменным оборудованием"},
    {id: 26, title: "Погрузчик фронтальный"},
    {id: 27, title: "Погрузчик-экскаватор (бахалодер)"},
    {id: 28, title: "Самосвал внедорожный"},
    {id: 29, title: "Самосвал с шарнирной рамой"},
    {id: 30, title: "Сваебойки (коппер)"},
    {id: 31, title: "Скрепер"},
    {id: 32, title: "Скрепер прицепной"},
    {id: 33, title: "Смесительные машины для регенерации/стабилизации дорожного полотна"},
    {id: 34, title: "Трактор сельскохозяйственный"},
    {id: 35, title: "Трелевочный трактор (скиддер)"},
    {id: 36, title: "Трубоукладчик"},
    {id: 37, title: "Уплотнитель грунта и отходов"},
    {id: 38, title: "Форвадер"},
    {id: 39, title: "Фреза"},
    {id: 40, title: "Харвейстер"},
    {id: 41, title: "Экскаватор гидравлический"},
    {id: 10000, title: "Другое"},
];

export const PRIORITIES = [
    {id: 1, title: "Ждёт", icon: AccessTimeIcon, color: "primary"},
    {id: 2, title: "Важно", icon: NewReleasesIcon, color: "warning"},
    {id: 3, title: "Срочно", icon: WarningIcon, color: "error"},
 //   {id: 4, title: "Срочно и важно", icon: WarningIcon, color: "error"},
];

export const problemCategories = [
    {id: 1, title: "Силовая установка"},
    {id: 2, title: "Система трансмиссии"},
    {id: 3, title: "Подвеска и ходовая часть"},
    {id: 4, title: "Тормозная система"},
    {id: 5, title: "Рулевое управление"},
    {id: 6, title: "Электрооборудование"},
    {id: 7, title: "Климатическая система"},
    {id: 8, title: "Система безопасности"},
    {id: 9, title: "Кузов и внешний вид"},
    {id: 10, title: "Вспомогательные и дополнительные системы"},
    {id: 11, title: "Системы управления двигателем"},
];

export const problemStatus = [
    {id: 1, title: "Ожидает"},
    {id: 2, title: "Задача создана"},
    {id: 3, title: "Задача в работе"},
    {id: 4, title: "Решена"},
];

export const problemPriority = [
    {id: 1, title: "Ждёт"},
    {id: 2, title: "Важно"},
    {id: 3, title: "Критично"},
];

export const taskPriority: ITaskPriority [] = [
    {id: 1, title: "Не срочно и не важно"},
    {id: 2, title: "Срочно, но не важно"},
    {id: 3, title: "Не срочно, но важно"},
    {id: 4, title: "Срочно и важно"},
];

export const taskStatus: ITaskStatus [] = [
    {id: 1, title: "Новая"},
    {id: 2, title: "В работе"},
    {id: 3, title: "Завершена"},
];
export const taskTypes: ITaskStatus [] = [
    {id: 1, title: "Тех обслуживание"},
    {id: 2, title: "Ремонт"},
];

export const emptyProblem: INewProblem = {
    title: "",
    description: "",
    photos: [],
    author_id: 0,
    machinery_id: 0,
    priority_id: 2,
    category_id: -1,
    operating: 0,
    odometer: 0,
    status_id: 1,
    tasks_id: [],
};

export const defaultProblem: IProblem = {
    ...emptyProblem,
    id: 0,
    created_date: 0,
    updated_date: 0,
};

export const emptyTask: INewTask = {
    title: "",
    description: "",
    status_id: 1,
    priority_id: -1,
    due_date: 0,
    author_id: -1,
    assigned_to_id: -1,
    machinery_id: -1,
    issue_photos: [],
    category_id: -1,
    problem_id: -1,
    type_id: -1,
    issue_operating: 0,
    issue_odometer: 0,
};

export const defaultTask: ITask = {
    title: "",
    description: "",
    status_id: 1,
    priority_id: -1,
    due_date: 0,
    author_id: -1,
    assigned_to_id: -1,
    machinery_id: -1,
    issue_photos: [],
    category_id: -1,
    problem_id: -1,
    type_id: -1,
    issue_operating: 0,
    issue_odometer: 0,
    id: 0,
    created_date: 0,
    updated_date: 0,
    result_photos: [],
    result_description: "",
    result_operating: 0,
    result_odometer: 0,
    spent_resources: "",
};

export const emptyMachinery: INewMachinery = {
    brand: "",
    model: "",
    year_manufacture: -1,
    type_id: -1,
    engine_type_id: -1,
    operating_type_id: -1,
    vin: "",
    state_number: "",
    status: MachineryStatus.active,
    photos: [],
    traction_type_id: -1,
    transmission_type_id: -1,
    working_equipment: "",
    engine_brand: "",
    engine_model: "",
    transmission_brand: "",
    transmission_model: "",
    frame_number: "",
};

export const defaultMachinery: ICurrentMachinery = {
    ...emptyMachinery,
    id: 0,
    created_date: Date.now(),
    updated_date: Date.now(),
    docs: [],
    tasks: [],
    problems: [],
};
