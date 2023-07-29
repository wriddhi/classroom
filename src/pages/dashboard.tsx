import Image from "next/image";
import Head from "next/head";
import Href from "@/components/ui/Link";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/ui/Header";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { menu } from "@/components/Menu";

export default function Page() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [view, setView] = useState<string>("Overview");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    if (view && user) {
      console.log(view);
      const activeView = menu[user.role].find(
        (item) => item.title === view
      )?.view;
      console.log(activeView);
    }
  }, [view, user]);

  if (!user) return <></>;

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Manage your classes seamlessly" />
      </Head>
      <main className="w-full h-screen flex justify-start items-start overflow-hidden">
        <Sidebar type={user.role} view={view} setView={setView} />
        <section className="w-full h-full flex-1 flex flex-col justify-start items-start overflow-hidden">
          <Header view={view} />
          {/* Main content goes here */}
          <main className="overflow-y-auto p-8 w-full h-full">
            {menu[user.role].find((item) => item.title === view)?.view}
          </main>
        </section>
      </main>
    </>
  );
}
