import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";

const Header = ({ view }: { view: string }) => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  return (
    <header className="w-full bg-white text-black px-10 p-4 capitalize flex justify-start items-center gap-10 shadow-lg shadow-slate-200">
      <h1 className="font-bold text-xl mr-auto">{view}</h1>
    <span className="font-semibold">Welcome, {user?.name.split(" ")[0]}</span>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              src={`https://bhhxfxrsehmkltmurgel.supabase.co/storage/v1/object/public/photos/${user?.role}/${user?.id
                .split("/")
                .join("_")}.jpg`}
              alt="avatar"
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content gap-2 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <button onClick={() => {
                setUser(null);
                router.push("/login");
            }} className="btn-sm font-semibold bg-primary text-btn">Logout</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
