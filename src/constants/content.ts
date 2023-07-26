import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import paths from "./paths";
const content = {
  LOGO: "EDUZY",
  NAV_LINK: [
    {
      text: "Kiểm tra học tập",
      path: paths.HOME,
      icon: SchoolOutlinedIcon,
    },
    {
      text: "Ngân Hàng Đề Thi",
      path: paths.EXAMS,
      icon: FeedOutlinedIcon,
    },
  ],
  NAV_AUTH: [
    {
      text: "Đăng nhập",
      path: "",
      icon: ExitToAppOutlinedIcon,
    },
    {
      text: "Đăng ký",
      path: "",
      icon: PersonAddOutlinedIcon,
    },
  ],

  USERS: ["Products", "Pricing"],
  NUMBERS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
};
export default content;
