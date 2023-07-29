import React from "react";
import Link from "next/link";

const Href = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      className={`p-2 bg-primary hover:-translate-y-1 transition-all capitalize focus:bg-primary text-btn text-lg w-full max-w-[10rem] h-10 flex justify-center items-center gap-2 disabled:bg-emerald-800`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Href;
