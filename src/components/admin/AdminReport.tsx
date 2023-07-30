import { TakenClass, AllotedClass, Teacher } from "@/types";
import React, { useEffect, useState } from "react";
import Spinner from "../ui/spinner";

type Data = {
  message: string;
  data: { teachers: Teacher[]; taken: TakenClass[]; alloted: AllotedClass[] };
  error: boolean;
};

function percentage(num1: number, num2: number): string {
  if (num2 === 0) {
    return "Infinity"; // Handle the case when the second number is 0 to avoid division by zero
  }
  const result = (num1 / num2) * 100;
  return result.toFixed(2) + "%";
}

const departments = [
  {
    department_id: "CSE",
    department_name: "School of Engineering",
  },
  {
    department_id: "MGMT",
    department_name: "School of Management Studies",
  },
  {
    department_id: "LAW",
    department_name: "School of Juridical Science",
  },
  {
    department_id: "PHARM",
    department_name: "School of Pharmaceutical Technology",
  },
  {
    department_id: "AGRI",
    department_name: "School of Agricultural Science",
  },
  {
    department_id: "HOSP",
    department_name: "School of Hospitality and Hotel Administration",
  },
] as const;

const AdminReport = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allotedClasses, setAllotedClasses] = useState<AllotedClass[]>([]);
  const [takenClasses, setTakenClasses] = useState<TakenClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<"id" | "name">("name");

  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [positionFilter, setPositionFilter] = useState<
    Teacher["position"] | "all"
  >("all");

  const filteredData: Teacher[] = teachers.filter((teacher) => {
    return (
      (searchTerm == "" ||
        teacher[searchType]
          .toLowerCase()
          .startsWith(searchTerm.toLowerCase())) &&
      (departmentFilter == "all" || teacher.department == departmentFilter)
      &&
      (positionFilter == "all" || teacher.position == positionFilter)
    );
  });

  useEffect(() => {
    const fetchTeachersAndClasses = async () => {
      const res = await fetch("/api/classes");
      const data: Data = await res.json();
      setLoading(false);

      if (data.error) {
        alert(data.message);
        return;
      } else {
        setTeachers(data.data.teachers);
        setAllotedClasses(data.data.alloted);
        setTakenClasses(data.data.taken);
      }
    };

    fetchTeachersAndClasses();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full grid place-items-center">
        <Spinner size={100} />
      </div>
    );
  }

  if (!loading && teachers.length == 0) {
    return (
      <div className="w-full h-full grid place-items-center">
        <h1 className="text-3xl text-center">No teachers found</h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col w-full h-full justify-start gap-20">
      <div className="w-full flex justify-start items-center gap-20">
        <div>
          <label htmlFor="search" className="label">
            <span className="label-text">Search by {searchType}</span>
          </label>
          <div className="join">
            <div>
              <div>
                <input
                  className="input input-bordered join-item"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select
              onChange={(e) => {
                setSearchType(e.target.value as "id" | "name");
              }}
              className="select select-bordered join-item capitalize"
              defaultValue={"Filter"}
              // value={filterType}
            >
              <option disabled>Filter</option>
              <option value={"id"}>ID</option>
              <option value={"name"}>Name</option>
              {/* {filterTypes.map((type) => ( */}
              {/* <option key={type}>{type}</option> */}
              {/* ))} */}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="position" className="label">
            <span className="label-text">Filter by Position</span>
          </label>
          <select
            onChange={(e) =>
              setPositionFilter(e.target.value as Teacher["position"] | "all")
            }
            defaultValue="All"
            className="select select-bordered w-full max-w-xs"
            // value={departmentFilter}
          >
            <option value={"all"}>All</option>
            <option value={"full"}>Full Time</option>
            <option value={"part"}>Part Time</option>
          </select>
        </div>
        <div>
          <label htmlFor="department" className="label">
            <span className="label-text">Filter by Department</span>
          </label>
          <select
            onChange={(e) => setDepartmentFilter(e.target.value)}
            defaultValue="All"
            className="select select-bordered w-full max-w-xs"
            // value={departmentFilter}
          >
            <option value={"all"}>All</option>
            {departments.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.department_id}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <span className="px-4 italic text-sm">{filteredData.length} rows</span>
        <table className="table">
          {/* head */}
          <thead>
            <tr className="border-solid border-b border-slate-300">
              <th>Teacher ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Classes Allotted</th>
              <th>Classes Taken</th>
              <th>Percentage</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((teacher) => {
              return (
                <tr
                  key={teacher.id}
                  className="border-solid border-b border-slate-300"
                >
                  <td>
                    <div className="font-bold">{teacher.id}</div>
                  </td>
                  <td>
                    <div className="font-bold">{teacher.name}</div>
                    <div className="text-sm opacity-50">
                      {teacher.position} time
                    </div>
                  </td>
                  <td>{teacher.department}</td>
                  <td>
                    {
                      allotedClasses.filter((cls) => cls.faculty === teacher.id)
                        .length
                    }
                  </td>
                  <td>
                    {
                      takenClasses.filter((cls) => cls.faculty === teacher.id)
                        .length
                    }
                  </td>
                  <td>
                    {percentage(
                      takenClasses.filter((cls) => cls.faculty === teacher.id)
                        .length,
                      allotedClasses.filter((cls) => cls.faculty === teacher.id)
                        .length
                    )}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">view</button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminReport;
