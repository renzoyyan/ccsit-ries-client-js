import {
  DocumentDuplicateIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const proponentNav = [
  {
    name: "Dashboard",
    href: "/proponent/dashboard",
    // icon: Squares2X2Icon,
  },
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
    icon: Squares2X2Icon,
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

export const dummyResearchProjects = [
  {
    id: Math.floor(Math.random() * 10000),
    research_proposal_format: "Information Technology",
    research_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    proponents: [
      { name: "Jane Cooper" },
      { name: "John Doe" },
      { name: "Kate Wilson" },
    ],
    research_agenda: "Transformative Learning",
    status: "proposal",
    date_created: "09-18-2022",
  },
  {
    id: Math.floor(Math.random() * 10000),
    research_proposal_format: "Biophysical Sciences Including Engineering",
    research_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    proponents: [
      { name: "Jane Cooper" },
      { name: "John Doe" },
      { name: "Kate Wilson" },
    ],
    research_agenda: "Livelihood Generation",
    status: "ongoing",
    date_created: "09-18-2022",
  },
  {
    id: Math.floor(Math.random() * 10000),
    research_proposal_format: "Social Sciences",
    research_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    proponents: [
      { name: "Jane Cooper" },
      { name: "John Doe" },
      { name: "Kate Wilson" },
    ],
    research_agenda: "Biodiversity Conservation",
    status: "proposal",
    date_created: "09-18-2022",
  },
  {
    id: Math.floor(Math.random() * 10000),
    research_proposal_format: "Biophysical Sciences Including Engineering",
    research_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    proponents: [
      { name: "Jane Cooper" },
      { name: "John Doe" },
      { name: "Kate Wilson" },
    ],
    research_agenda: "Climate Change Adaptation & Disaster Risk Management",
    status: "completed",
    date_created: "09-18-2022",
  },
];

export const dummyExtensionProjects = [
  {
    id: Math.floor(Math.random() * 10000),
    extension_type: "Program",
    extension_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    proponents: [
      { name: "Jane Cooper" },
      { name: "John Doe" },
      { name: "Kate Wilson" },
    ],
    project_agenda: "Transformative Learning",
    status: "proposal",
    date_created: "09-18-2022",
  },
  {
    id: Math.floor(Math.random() * 10000),
    extension_type: "Project",
    extension_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    proponents: [
      { name: "Jane Cooper" },
      { name: "John Doe" },
      { name: "Kate Wilson" },
    ],
    project_agenda: "Transformative Learning",
    status: "ongoing",
    date_created: "09-18-2022",
  },
  {
    id: Math.floor(Math.random() * 10000),
    extension_type: "Activity",
    extension_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    proponents: [
      { name: "Jane Cooper" },
      { name: "John Doe" },
      { name: "Kate Wilson" },
    ],
    project_agenda: "Transformative Learning",
    status: "proposal",
    date_created: "09-18-2022",
  },
  {
    id: Math.floor(Math.random() * 10000),
    extension_type: "Activity",
    extension_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    proponents: [
      { name: "Jane Cooper" },
      { name: "John Doe" },
      { name: "Kate Wilson" },
    ],
    project_agenda: "Transformative Learning",
    status: "completed",
    date_created: "09-18-2022",
  },
];

export const proposal_format_opts = [
  "Information Technology",
  "Biophysical Sciences Including Engineering",
  "Social Sciences",
];

// export const research_agenda_opts = [
//   "Transformative Learning",
//   "Livelihood Generation",
//   "Biodiversity Conservation",
//   "Climate Change Adaptation & Disaster Risk Management",
//   "Good Governance",
// ];

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

export const dummy_proponents = ["John Doe", "Kate Wilson", "Jane Mendoza"];

export const proponentsData = [
  {
    id: Math.floor(Math.random() * 10000),
    first_name: "Alex",
    last_name: "Bacalla",
    doctorate_degree: "DIT",
    position: "Position",
  },
  {
    id: Math.floor(Math.random() * 10000),
    first_name: "James Brian",
    last_name: "Flores",
    doctorate_degree: "PhD",
    position: "Position",
  },
  {
    id: Math.floor(Math.random() * 10000),
    first_name: "Gilbert",
    last_name: "Siega",
    doctorate_degree: "MSIT",
    position: "Position",
  },
];

export const usersData = [
  {
    id: Math.floor(Math.random() * 10000),
    first_name: "John",
    last_name: "Doe",
    username: "johndoe",
    role: "Proponent",
  },
  {
    id: Math.floor(Math.random() * 10000),
    first_name: "Jane",
    last_name: "Mendoza",
    username: "janemendoza",
    role: "Proponent",
  },
  {
    id: Math.floor(Math.random() * 10000),
    first_name: "Maine",
    last_name: "Lapies",
    username: "maine_lapies",
    role: "Personnel",
  },
  {
    id: Math.floor(Math.random() * 10000),
    first_name: "Kyle",
    last_name: "Styles",
    username: "kylestyles21",
    role: "Personnel",
  },
];

export const statusOptions = [
  { value: "proposal", label: "Proposal" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
];

export const formattedDate = (date) => {
  return date ? moment(date).format("YYYY-MM-DD") : "";
};

export const Roles = {
  ADMIN: "admin",
  PROPONENT: "proponent",
  PERSONNEL: "personnel",
};

export function isFile(FILE) {
  return "File" in (window || {}) && FILE instanceof File;
}
