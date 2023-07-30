import React, { useState, useEffect } from "react";
import Spinner from "../ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import { Student, TakenClass, Attendance } from "@/types";

type Data = {
  message: string;
  data: {
    student: Student;
    total: TakenClass[];
    attendance: Attendance[];
  } | null;
  error: boolean;
};

function getClassesForCurrentWeek(classes: TakenClass[]): TakenClass[] {
  const today = new Date();
  const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate the date for Monday of the current week
  const mondayDate = new Date(today);
  mondayDate.setDate(today.getDate() - currentDay + 1);

  // Calculate the date for Saturday of the current week
  const saturdayDate = new Date(today);
  saturdayDate.setDate(today.getDate() + (6 - currentDay + 1));

  // Filter the classes for the current week
  const classesForCurrentWeek = classes.filter((takenClass) => {
    if (takenClass.date) {
      console.log(
        new Date(takenClass.date),
        "v/s",
        mondayDate,
        "v/s",
        saturdayDate
      );

      return (
        new Date(takenClass.date).toDateString() >= mondayDate.toDateString() &&
        new Date(takenClass.date).toDateString() <= saturdayDate.toDateString()
      );
    }
    return false;
  });

  return classesForCurrentWeek;
}


const SubjectWiseAttendance = ({
  studentData,
}: {
  studentData: Data["data"];
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-lg w-full">
        {/* head */}
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Subject</th>
            <th>Total Classes</th>
            <th>Attended Classes</th>
          </tr>
        </thead>
        <tbody>
          {studentData?.total.map((takenClass, index) => {
            const attendedClasses = studentData?.attendance.filter(
              (att) => att.class == takenClass.id
            ).length;
            return (
              <tr key={takenClass.id}>
                <th>{index + 1}</th>
                <td>{takenClass.subject}</td>
                <td>{studentData?.attendance.length}</td>
                <td>{attendedClasses}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const WeekWiseAttendance = ({ studentData }: { studentData: Data["data"] }) => {
  const filteredClass: TakenClass[] = getClassesForCurrentWeek(
    studentData?.total ?? []
  );

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-lg w-full">
        {/* head */}
        <thead>
          <tr>
            <th>S.No.</th>
            <td>Date</td>
            <th>Subject</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {filteredClass.map((takenClass, index) => {
            const entry = studentData?.attendance.filter(
              (att) => att.class == takenClass.id
            )[0].entry_time;
            const exit = studentData?.attendance.filter(
              (att) => att.class == takenClass.id
            )[0].exit_time;
            return (
              <tr key={takenClass.id}>
                <th>{index + 1}</th>
                <td>{takenClass.date}</td>
                <td>{takenClass.subject}</td>
                <td>{entry}</td>
                <td>{exit}</td>
                <td>
                  {entry && exit && (
                    <div className="badge badge-outline badge-success">
                      Full
                    </div>
                  )}
                  {entry && !exit && (
                    <div className="badge badge-outline badge-warning">
                      part
                    </div>
                  )}
                  {!entry && exit && (
                    <div className="badge badge-outline badge-error">Late</div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FacultyWiseAttendance = ({ studentData } : { studentData: Data["data"] }) => {
  const uniqueTeachers: string[] = Array.from(new Set(studentData?.total.map((cls) => cls.faculty)));

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-lg w-full">
        {/* head */}
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Teacher</th>
            <th>Total Classes</th>
            <th>Attended Classes</th>
          </tr>
        </thead>
        <tbody>
          {uniqueTeachers.map((teacher, index) => {

            const classes = studentData?.total.filter((cls) => (cls.faculty === teacher));

            const attendances = studentData?.attendance.filter((att) => (classes?.map((cls) => cls.id).includes(att.class))) ?? [];

            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{teacher}</td>
                <td>{studentData?.total.filter((cls) => (cls.faculty === teacher)).length}</td>
                <td>{attendances?.filter((att) => (att.student === studentData?.student.id)).length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const StudentReport = () => {
  const [studentData, setStudentData] = useState<Data["data"]>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [active, setActive] = useState<(typeof views)[number]>("subject");

  const { user } = useAuth();

  const views = ["subject", "week", "faculty"] as const;
  const viewsMap = new Map<(typeof views)[number], React.ReactNode>([
    ["subject", <SubjectWiseAttendance studentData={studentData} key={active} />],
    ["week", <WeekWiseAttendance studentData={studentData} key={active} />],
    ["faculty", <FacultyWiseAttendance studentData={studentData} key={active} />],
  ]);

  useEffect(() => {
    const fetchStudentData = async () => {
      const res = await fetch(`/api/student?id=${user?.id}`);
      const data = (await res.json()) as Data;
      console.log(data);
      setLoading(false);

      if (data.error) {
        alert(data.message);
        return;
      } else {
        setStudentData(data.data);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full grid place-items-center">
        <Spinner size={100} />
      </div>
    );
  }
  return (
    <section className="flex flex-col w-full h-full justify-start items-center gap-20">
      <ul className="tabs tabs-boxed w-fit">
        {views.map((view) => (
          <li
            key={view}
            className={`tab w-32 capitalize  ${
              view === active ? "bg-primary text-btn" : "text-text"
            }`}
            onClick={() => setActive(view)}
          >
            {view}
          </li>
        ))}
      </ul>
      {viewsMap.get(active)}
    </section>
  );
};

export default StudentReport;
