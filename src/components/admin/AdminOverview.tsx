import { TakenClass, AllotedClass, Teacher } from "@/types";
import React, { useEffect, useState } from "react";
import Spinner from "../ui/spinner";

type Data = {
  message: string;
  data: { teachers: Teacher[]; taken: TakenClass[], alloted: AllotedClass[] };
  error: boolean;
};

function percentage(num1: number, num2: number): string {
  if (num2 === 0) {
    return "Infinity"; // Handle the case when the second number is 0 to avoid division by zero
  }
  const result = (num1 / num2) * 100;
  return result.toFixed(2) + "%";
}


const AdminOverview = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allotedClasses, setAllotedClasses] = useState<AllotedClass[]>([]);
  const [takenClasses, setTakenClasses] = useState<TakenClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<keyof Teacher | "">("");

  const filterTypes = ["id", "name", "department", "position"] as const;

  const filteredData = teachers.filter((teacher) => {
    if (searchTerm == "" || filterType == "") return true;
    return teacher[filterType]
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());
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
          onChange={(e) => setFilterType(e.target.value as keyof Teacher)}
          className="select select-bordered join-item capitalize"
          defaultValue={"Filter"}
          // value={filterType}
        >
          <option disabled>
            Filter
          </option>
          {filterTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
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
                <tr key={teacher.id} className="border-solid border-b border-slate-300">
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
                    {(allotedClasses.filter((cls) => cls.faculty === teacher.id).length)}
                  </td>
                  <td>
                    {takenClasses.filter((cls) => cls.faculty === teacher.id).length}
                  </td>
                  <td>
                    {percentage(takenClasses.filter((cls) => cls.faculty === teacher.id).length, allotedClasses.filter((cls) => cls.faculty === teacher.id).length)}
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

export default AdminOverview;
