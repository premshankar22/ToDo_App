import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

/* TRASH PAGE ICONS */

import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CloseIcon from "@mui/icons-material/Close";

/* HEADER ICONS */

import HomeIcon from "@mui/icons-material/Home";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";

import { BsMastodon } from "react-icons/bs";


/* TASK FILE ICONS */

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";


/* ADD TASK ICONS */

import AddIcon from "@mui/icons-material/Add";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UpdateIcon from "@mui/icons-material/Update";
import AlarmIcon from "@mui/icons-material/Alarm";

import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";


import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { GoHome } from "react-icons/go";


/* STATUS OPTIONS */

export const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    icon: <PendingActionsIcon sx={{ color: "#f59e0b" }} />
  },
  {
    value: "inprogress",
    label: "In Progress",
    icon: <ScheduleIcon sx={{ color: "#3b82f6" }} />
  },
  {
    value: "completed",
    label: "Completed",
    icon: <CheckCircleIcon sx={{ color: "#22c55e" }} />
  },
  {
    value: "overdue",
    label: "Overdue",
    icon: <ErrorOutlineIcon sx={{ color: "#ef4444" }} />
  },
  {
    value: "archived",
    label: "Archived",
    icon: <TaskAltIcon sx={{ color: "#8b5cf6" }} />
  }
];


/* PRIORITY OPTIONS */

export const PRIORITY_OPTIONS = [
  {
    value: "High",
    label: "High",
    icon: <PriorityHighIcon sx={{ color: "#ef4444" }} />
  },
  {
    value: "Medium",
    label: "Medium",
    icon: <BoltOutlinedIcon sx={{ color: "#f59e0b" }} />
  },
  {
    value: "Low",
    label: "Low",
    icon: <KeyboardDoubleArrowDownIcon sx={{ color: "#22c55e" }} />
  }
];


/* CATEGORY OPTIONS */

export const CATEGORY_OPTIONS = [
  { value: "work", label: "Work", icon: <WorkOutlineIcon sx={{ color: "#3b82f6" }} /> },
  { value: "personal", label: "Personal", icon: <PersonOutlineIcon sx={{ color: "#ec4899" }} /> },
  { value: "study", label: "Study", icon: <SchoolOutlinedIcon sx={{ color: "#10b981" }} /> },
  { value: "shopping", label: "Shopping", icon: <ShoppingCartOutlinedIcon sx={{ color: "#f59e0b" }} /> },
  { value: "fitness", label: "Fitness", icon: <FitnessCenterOutlinedIcon sx={{ color: "#ef4444" }} /> },
  { value: "events", label: "Events", icon: <EventOutlinedIcon sx={{ color: "#8b5cf6" }} /> },
  { value: "travel", label: "Travel", icon: <FlightOutlinedIcon sx={{ color: "#06b6d4" }} /> },
  { value: "health", label: "Health", icon: <FavoriteBorderOutlinedIcon sx={{ color: "#22c55e" }} /> },
  { value: "home", label: "Home", icon: <HomeOutlinedIcon sx={{ color: "#f97316" }} /> }
];


export const DUE_DATE_OPTIONS = [
  { value: "today", label: "Today", icon: <ScheduleIcon sx={{ color: "#3b82f6" }} /> },
  { value: "week", label: "This Week", icon: <ScheduleIcon sx={{ color: "#8b5cf6" }} /> },
  { value: "overdue", label: "Overdue", icon: <ErrorOutlineIcon sx={{ color: "#ef4444" }} /> }
];


export const SIDEBAR_NAV_ITEMS = [
  {
    label: "Task Manager",
    path: "/tasks",
    icon: <TaskAltOutlinedIcon />
  },
  {
    label: "Calendar",
    path: "/calendar",
    icon: <CalendarMonthOutlinedIcon />
  },
  {
    label: "Reminders",
    path: "/reminders",
    icon: <NotificationsNoneOutlinedIcon />
  },
  {
    label: "Notes",
    path: "/notes",
    icon: <DescriptionOutlinedIcon />
  }
];

export const SIDEBAR_BOTTOM_ITEMS = [
  {
    label: "Trash",
    path: "/trash",
    icon: <DeleteOutlineOutlinedIcon />
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <SettingsOutlinedIcon />
  }
];


export const TRASH_ICONS = {
  header: <DeleteOutlineOutlinedIcon sx={{ fontSize: 20, color: "#ef4444" }} />,
  restore: <RestoreFromTrashOutlinedIcon fontSize="small" />,
  deleteForever: <DeleteForeverOutlinedIcon fontSize="small" />,
  close: <CloseIcon fontSize="small" />
};

export const HEADER_ICONS = {
  logo: <BsMastodon size={30} color="#2563eb" />,
  search: <SearchIcon sx={{ mr: 1, color: "#64748b" }} />,
  whatsNew: <NewReleasesIcon />,
  help: <HelpOutlineIcon />,
  home: <HomeIcon />
};

export const TASK_FILE_ICONS = {
  expand: <ExpandMoreIcon />,
  upload: <UploadFileOutlinedIcon />,
  uploadSmall: <UploadFileOutlinedIcon fontSize="small" />,
  view: <VisibilityOutlinedIcon fontSize="small" />,
  delete: <DeleteOutlineOutlinedIcon fontSize="small" />
};


export const ADD_TASK_ICONS = {
  add: <AddIcon />,
  event: <EventOutlinedIcon />,
  reminder: <NotificationsNoneOutlinedIcon />,
  flag: <FlagOutlinedIcon />,

  today: <TodayIcon />,
  tomorrow: <UpdateIcon />,
  week: <CalendarMonthIcon />,
  pickDate: <CalendarMonthIcon />,

  alarm: <AlarmIcon />
};

export const PRIORITY_MENU_OPTIONS = [
  {
    value: "high",
    label: "High",
    icon: <PriorityHighIcon sx={{ color: "#ef4444" }} />
  },
  {
    value: "medium",
    label: "Medium",
    icon: <BoltOutlinedIcon sx={{ color: "#f59e0b" }} />
  },
  {
    value: "low",
    label: "Low",
    icon: <KeyboardDoubleArrowDownIcon sx={{ color: "#22c55e" }} />
  }
];

export const QUICK_DATE_OPTIONS = [
  {
    value: "today",
    label: "Today",
    icon: ADD_TASK_ICONS.today
  },
  {
    value: "tomorrow",
    label: "Tomorrow",
    icon: ADD_TASK_ICONS.tomorrow
  },
  {
    value: "week",
    label: "Next Week",
    icon: ADD_TASK_ICONS.week
  }
];


/* TASK LIST ICONS */

export const TASK_LIST_ICONS = {
  priority: FlagOutlinedIcon,
  dueDate: EventOutlinedIcon,
  reminder: NotificationsNoneOutlinedIcon,
  note: NotesOutlinedIcon,
  category: LabelOutlinedIcon,
  file: AttachFileOutlinedIcon
};


/* TASK STATUS ICONS */

export const STATUS_ICONS = {
  pending: {
    icon: <PendingActionsIcon sx={{ fontSize: 18, color: "#f59e0b" }} />,
    label: "Pending"
  },
  inprogress: {
    icon: <ScheduleIcon sx={{ fontSize: 18, color: "#3b82f6" }} />,
    label: "In Progress"
  },
  completed: {
    icon: <CheckCircleIcon sx={{ fontSize: 18, color: "#22c55e" }} />,
    label: "Completed"
  },
  overdue: {
    icon: <ErrorOutlineIcon sx={{ fontSize: 18, color: "#ef4444" }} />,
    label: "Overdue"
  },
  archived: {
    icon: <TaskAltIcon sx={{ fontSize: 18, color: "#8b5cf6" }} />,
    label: "Archived"
  }
};


/* TASK HEADER ICONS */

export const TASK_HEADER_ICONS = {
  home: GoHome,
  sortAlpha: SortByAlphaIcon,
  sortPriority: PriorityHighIcon,
  sortTime: AccessTimeIcon,
  filter: FilterListIcon,
  arrowUp: ArrowUpwardIcon,
  arrowDown: ArrowDownwardIcon
};