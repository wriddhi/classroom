import Image from "next/image";
import Head from "next/head";
import Href from "@/components/ui/Link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Manage your classes seamlessly" />
      </Head>
      <main className="w-full h-full p-10 flex justify-evenly items-center ">
        <section className="flex flex-col gap-10">
          <h1 className="font-semibold text-text text-5xl">
            Welcome to the future
          </h1>
          <p className="text-lg font-bold">
            We at ARSInventif are committed to providing you with the best
          </p>
          <Href href="/login">Login</Href>
        </section>
        <section>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width={0.8 * 652}
            height={0.8 * 654}
            viewBox="0 0 652 644"
            fill="none"
            className="mondrian"
          >
            <rect
              opacity="0.05"
              x="1"
              width="163"
              height="60"
              rx="10"
              fill="var(--text)"
            ></rect>
            <rect
              x="424"
              width="193"
              height="60"
              rx="10"
              fill="var(--secondary)"
            ></rect>
            <rect
              x="424"
              y="68"
              width="193"
              height="175"
              rx="10"
              fill="var(--secondary)"
            ></rect>
            <rect
              opacity="0.2"
              x="424"
              y="401"
              width="193"
              height="79"
              rx="10"
              fill="var(--primary)"
            ></rect>
            <rect
              x="255"
              y="626"
              width="362"
              height="18"
              rx="9"
              fill="var(--bg)"
            ></rect>
            <rect
              x="80"
              y="579"
              width="166"
              height="65"
              rx="10"
              fill="var(--bg)"
            ></rect>
            <rect
              x="255"
              y="579"
              width="160"
              height="40"
              rx="10"
              fill="var(--text)"
            ></rect>
            <rect
              opacity="0.05"
              x="255"
              y="490"
              width="160"
              height="80"
              rx="10"
              fill="var(--text)"
            ></rect>
            <rect
              opacity="0.05"
              x="255"
              y="400"
              width="160"
              height="80"
              rx="10"
              fill="var(--text)"
            ></rect>
            <rect
              x="80"
              y="68"
              width="335"
              height="324"
              rx="10"
              fill="var(--primary)"
            ></rect>
            <rect
              x="80"
              y="401"
              width="166"
              height="169"
              rx="10"
              fill="var(--text)"
            ></rect>
            <rect
              x="424"
              y="490"
              width="193"
              height="129"
              rx="10"
              fill="var(--accent)"
            ></rect>
            <rect
              x="626"
              y="490"
              width="26"
              height="154"
              rx="10"
              fill="var(--primary)"
            ></rect>
            <rect
              x="424"
              y="252"
              width="91"
              height="140"
              rx="10"
              fill="var(--bg)"
            ></rect>
            <rect
              x="524"
              y="252"
              width="93"
              height="140"
              rx="10"
              fill="var(--bg)"
            ></rect>
            <rect
              opacity="0.05"
              x="626"
              width="26"
              height="480"
              rx="10"
              fill="var(--text)"
            ></rect>
            <rect
              x="173"
              width="242"
              height="60"
              rx="10"
              fill="var(--bg)"
            ></rect>
            <rect
              x="1"
              y="68"
              width="70"
              height="157"
              rx="10"
              fill="var(--bg)"
            ></rect>
            <rect
              opacity="0.05"
              x="1"
              y="234"
              width="70"
              height="259"
              rx="10"
              fill="var(--text)"
            ></rect>
            <rect
              x="1"
              y="502"
              width="70"
              height="142"
              rx="10"
              fill="var(--secondary)"
            ></rect>
          </svg> */}
          <Image height={100} width={500} alt={"hero"} src={"/hero.svg"} />
        </section>
      </main>
    </>
  );
}
