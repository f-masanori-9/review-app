"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdOutlineAccountCircle } from "react-icons/md";

export const Header = () => {
  const { status } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const isAccount = pathName.includes("/account");
  const isNotes = pathName.includes("/notes");
  const onClickToAccount = () => {
    router.push("/account");
  };
  if (status === "unauthenticated") {
    return <HeaderForNotLogin />;
  }
  return (
    <div className="fixed z-50 top-0 w-full bg-white">
      <div className="container mx-auto px-3 border-b-2">
        <header className={`flex  py-1`}>
          <div>
            <h1>F</h1>
          </div>
          <div className="flex-1 flex justify-center">
            {isAccount && <span className="">アカウント</span>}
            {isNotes && <span className="">ノート管理</span>}
          </div>
          <div>
            <div
              className="flex justify-center items-center flex-1"
              onClick={onClickToAccount}
            >
              <MdOutlineAccountCircle color="black" size={30} />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

const HeaderForNotLogin = () => {
  const router = useRouter();

  return (
    <div className="App">
      <div className="container mx-auto px-3">
        <header className="flex justify-between py-1 pt-2">
          <h1>F</h1>
          <button
            className="text-primary"
            onClick={() => router.push("/login")}
          >
            登録/ログイン
          </button>
        </header>
      </div>
    </div>
  );
};
