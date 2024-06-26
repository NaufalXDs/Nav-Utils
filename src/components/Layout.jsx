import Navbar from "./Navbar";

export default function Layout({ children, session }) {
  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}
