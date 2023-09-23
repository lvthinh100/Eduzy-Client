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
  NAV_AUTH: {
    login: {
      text: "Đăng nhập",
      path: "",
      icon: ExitToAppOutlinedIcon,
    },
    register: {
      text: "Đăng ký",
      path: "",
      icon: PersonAddOutlinedIcon,
    },
  },
  NUMBERS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  birthFormat: "DD/MM/YYYY",
};
export default content;
