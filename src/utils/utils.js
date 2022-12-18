import { useAuth } from "@/context/AuthContext";
import {
  DocumentDuplicateIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  SquaresPlusIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const proponentNav = [
  // {
  //   name: "Dashboard",
  //   href: "/proponent/dashboard",
  //   // icon: Squares2X2Icon,
  // },
  {
    name: "Research & Innovation",
    href: "/proponent/research-innovation",
    // icon: DocumentDuplicateIcon,
  },
  {
    name: "Extension Services",
    href: "/proponent/extension-services",
    // icon: RectangleStackIcon,
  },
];
export const personnelNav = [
  {
    name: "Dashboard",
    href: "/personnel/dashboard",
    // icon: DocumentDuplicateIcon,
  },
  {
    name: "Research & Innovation",
    href: "/personnel/research-innovation",
    // icon: DocumentDuplicateIcon,
  },
  {
    name: "Extension Services",
    href: "/personnel/extension-services",
    // icon: RectangleStackIcon,
  },
];

export const adminNav = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: SquaresPlusIcon,
  },
  {
    name: "Research & Innovation",
    href: "/admin/research-innovation",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Extension Services",
    href: "/admin/extension-services",
    icon: RectangleStackIcon,
  },

  {
    name: "Users",
    href: "/admin/users",
    icon: UserGroupIcon,
  },
];

export const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

export const research_agenda_opts = [
  { value: "transformative learning", label: "Transformative Learning" },
  { value: "livelihood generation", label: "Livelihood Generation" },
  { value: "biodiversity conservation", label: "Biodiversity Conservation" },
  {
    value: "climate adaptation & disaster risk management",
    label: "Climate Change Adaptation & Disaster Risk Management",
  },
  { value: "good governance", label: "Good Governance" },
];

export const extension_types_opts = [
  { value: "project", label: "Project" },
  { value: "activity", label: "Activity" },
];

export const statusOptions = [
  { value: "proposal", label: "Proposal" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
];

export const filterStatusOptions = [
  { value: "all", label: "All" },
  { value: "proposal", label: "Proposal" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
];

export const roleOptions = [
  { value: "proponent", label: "Proponent" },
  { value: "personnel", label: "Personnel" },
  { value: "admin", label: "Admin" },
];

export const filterRoleOptions = [
  { value: "all", label: "All" },
  { value: "proponent", label: "Proponent" },
  { value: "personnel", label: "Personnel" },
  { value: "admin", label: "Admin" },
];

export const formattedDate = (date) => {
  return date ? moment(date).format("YYYY-MM-DD") : "";
};

export const Roles = {
  ADMIN: "admin",
  PROPONENT: "proponent",
  PERSONNEL: "personnel",
};

export const NOTIFICATION_ACTION_TYPE = {
  PROJECT: {
    CREATED: 101,
    ADDED: 102,
    UPDATED: 103,
    DELETE: 104,
  },
  APPROVE: 200,
  COMMENTED: 201,
  KEYWORDS: 202,
  LOG: {
    ADDED: 301,
    UPDATED: 302,
    DELETE: 303,
  },

  CHANGE_STATUS: {
    pending: 400,
    proposal: 401,
    ongoing: 402,
    completed: 403,
  },
};

export function isFile(FILE) {
  return "File" in (window || {}) && FILE instanceof File;
}

export const notificationActionMsg = (action_type) => {
  switch (action_type) {
    case 101:
      return "created a new proposal";

    case 102:
      return "added you in";

    case 103:
      return "updated";

    case 104:
      return "deleted the";

    case 200:
      return "approved";

    case 201:
      return "commented in";

    case 202:
      return "added keywords in";

    case 301:
      return "added a new log in";

    case 302:
      return "updated a log in";

    case 303:
      return "deleted a log in";

    case 400:
      return "change status to pending on";

    case 401:
      return "change status to proposal on";

    case 402:
      return "change status to ongoing on";

    case 403:
      return "change status to completed on";

    default:
      return;
  }
};

export const labels = ["Proposal", "Ongoing", "Completed"];
