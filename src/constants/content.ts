import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ExamIcon from "../components/IconComponent/ExamIcon";
import OmegaIcon from "../components/IconComponent/OmegaIcon";

import paths from "./paths";
const content = {
  LOGO: "Eduzy",
  NAV_LINK: [
    {
      text: "Kiểm tra - học tập",
      path: paths.HOME,
      icon: ExamIcon,
    },
    {
      text: "Ngân hàng đề thi",
      path: paths.EXAMS,
      icon: OmegaIcon,
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
