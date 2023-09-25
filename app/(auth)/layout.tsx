import { ReactNode } from "react";

const AuhtLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center ">{children}</div>
  );
};

export default AuhtLayout;
