import { ReactNode } from "react";

interface AuthWindowProps {
  title: string;
  children: ReactNode;
}

const AuthWindow = ({ title, children }: AuthWindowProps) => {
  return (
    <div className="w-[350px] bg-[#E0E0E0] border-[3px] border-black shadow-[5px_5px_0px_0px_#000] p-4">
      <div className="bg-blue-800 text-white p-2 text-center mb-3 border-b-[3px] border-black">
        {title}
      </div>
      {children}
    </div>
  );
};

export default AuthWindow;
