import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { User, Role, roles } from "@/types";
import Href from "@/components/ui/Link";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

// const credentials = new Map<Role, { id: string; password: string }>([
//   ["student", { id: "ARS/ST/0001", password: "password" }],
//   // ["teacher", {id: "ARS/TR/0001", password: "password"}],
//   ["admin", { id: "ARS/AD/0001", password: "password" }],
// ]);

export default function Login() {
  const { user, setUser } = useAuth();

  const [credentials, setCredentials] = useState<{
    role: Role;
    id: string;
    password: string;
  }>({
    role: "admin",
    id: "",
    password: "",
  });

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = (await res.json()) as {
      error: boolean;
      data: User | null;
      message: string;
    };

    if (data.error) {
      alert(data.message);
      return;
    }

    setUser(data.data);
  };

  useEffect(() => {
    if (user) {
      console.log("Redirecting to dashboard...");
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Manage your classes seamlessly" />
      </Head>
      <main className="w-full h-full p-32 flex justify-evenly items-center gap-20">
        <section className="w-full outline outline-1 flex flex-col justify-center items-center gap-10 p-10 bg-background">
          <h1 className="text-3xl font-bold col-span-3">Login</h1>
          <p>Log in with your instituition's provided credentials</p>
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center gap-4 w-2/3"
          >
            <select
              required
              onChange={(e) => {
                setCredentials((prev) => ({
                  ...prev,
                  role: e.target.value as Role,
                }));
              }}
              className="bg-white/10 px-4 py-2 outline outline-1 capitalize w-full"
              defaultValue="Select a role"
            >
              <option disabled>Select a role</option>
              {roles.map((role) => (
                <option className="capitalize" key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <input
              required
              className="bg-white/10 px-4 py-2 outline outline-1 w-full"
              type="text"
              placeholder="User ID"
              value={credentials.id}
              onChange={(e) => {
                setCredentials((prev) => ({ ...prev, id: e.target.value }));
              }}
            />
            <input
              required
              className="bg-white/10 px-4 py-2 outline outline-1 w-full"
              type="password"
              placeholder="password"
              value={credentials.password}
              onChange={(e) => {
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />

            <Button type="submit" title="Login" onClick={() => {}} />
            {/* <pre className="text-black">{JSON.stringify(user, null, 2)}</pre> */}
          </form>
        </section>
        <section className="w-full">
          <Image height={100} width={500} alt={"hero"} src={"/login.svg"} />
        </section>
      </main>
    </>
  );
}
