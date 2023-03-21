import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="p-3 md:p-5 bg-slate-300">
      <Link href="/admin">Admin</Link>
    </header>
  );
};

export default Navbar;
