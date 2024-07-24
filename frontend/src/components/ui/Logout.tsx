interface logoutProps {
  handleLogout: () => void;
  handleProfile: () => void;
}

export const Logout = ({ handleLogout, handleProfile }: logoutProps) => {
  return (
    <div className="w-28 h-32 shadow-lg border border-gray-200 rounded-lg bg-zinc-100 px-2">
      <div className="flex flex-col gap-5 items-center justify-center h-full">
        <button className="hover:bg-slate-200 px-2 py-1 w-full" onClick={handleProfile}>Profile</button>
        <button className="bg-red-500 text-white px-2 py-1 rounded-md w-full" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
