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

const AdminOverview = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allotedClasses, setAllotedClasses] = useState<AllotedClass[]>([]);
  const [takenClasses, setTakenClasses] = useState<TakenClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Classes</div>
          <div className="stat-value text-primary">{allotedClasses.length}</div>
          <div className="stat-desc text-text">
            Total number of alloted
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Completed</div>
          <div className="stat-value text-accent">{takenClasses.length}</div>
          <div className="stat-desc text-text">
            Total number of classes completed
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>

          <div className="stat">
            <div className="stat-figure text-text">
              {/* <div className="avatar">
              <div className={`w-16 rounded-full h-16 ${perc >= "75%" ? "bg-green-400" : "bg-red-500"}`}>
              </div>
            </div> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Percentage</div>
            <div className="stat-value">{percentage(takenClasses.length, allotedClasses.length)}</div>
            <div className="stat-desc text-text">
              Percentage of classes completed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOverview;
