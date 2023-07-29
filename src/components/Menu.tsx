import { HiOutlineCurrencyRupee, HiOutlineBadgeCheck } from 'react-icons/hi'
import { TfiBlackboard } from 'react-icons/tfi'
import { TbBallpen, TbBooks, TbCircles } from 'react-icons/tb'
import { MdOutlineWysiwyg, MdOutlineDashboard, MdOutlineFeedback, MdHistory, MdOutlineSchedule, MdAddChart, MdOutlineLeaderboard } from 'react-icons/md'
import { BsPeople, BsBoxSeam, BsChatDots } from 'react-icons/bs'
import { BiPaperPlane } from 'react-icons/bi'

import type { Role } from '@/types'
import AdminOverview from './admin/AdminOverview'
import AdminReport from './admin/AdminReport'
import StudentOverview from './student/StudentOverview'
import StudentReport from './student/StudentReport'

// import GuardianOverview from './guardian/Overview'
// import TeacherOverview from './teacher/Overview'
// import StudentOverview from './student/Overview'
// import CreateExam from './teacher/CreateExam'
// import TeacherSchedule from './teacher/Schedule'
// import TeachersStudyMaterial from './teacher/StudyMaterial'
// import TeachersNoticeboard from './teacher/Noticeboard'
// import PaperEvaluation from './teacher/PaperEvaluation'
// import Salary from './teacher/Salary'

// import AddClass from './teacher/AddClass'
// import Attendance from './teacher/Attendance'
// import Leaves from './teacher/Leaves'

export type MenuItemType = {
  title: string,
  menu: boolean,
  children?: {
    title: string,
    menu: boolean,
    icon: JSX.Element,
    view: JSX.Element
  }[],
  icon: JSX.Element,
  view: JSX.Element
}

export type MenuType = {
  [key in Role]: MenuItemType[]
}


export const menu: MenuType = {
  admin: [
    {
      title: "Overview",
      menu: false,
      icon: <MdOutlineDashboard/>,
      view: <AdminOverview/>
    },
    {
      title: "Report",
      menu: false,
      icon: <MdAddChart/>,
      view: <AdminReport/>
    }
  ],
  student: [
    {
      title: "Overview",
      menu: false,
      icon: <MdOutlineDashboard/>,
      view: <StudentOverview/>
    },
    {
      title: "Report",
      menu: false,
      icon: <MdAddChart/>,
      view: <StudentReport/>
    }
  ],
}