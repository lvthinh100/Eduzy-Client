import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
const content = {
  LOGO: "EDUZY",
  NAV_LINK: [
    {
      text: "Kiểm tra học tập",
      path: "",
      icon: SchoolOutlinedIcon,
    },
    {
      text: "Ngân Hàng Đề Thi",
      path: "",
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
};
export default content;
