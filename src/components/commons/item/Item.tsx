import React from "react";

export default function Item({ data, token }: any) {
  return (
    <div className="hover:bg-zinc-800 hover:cursor-pointer px-6 py-2 w-full flex flex-row justify-between">
      <div className="flex flex-col">
        <p>{data.name}</p>
        <p className="text-zinc-500 text-xs capitalize">{data.id}</p>
      </div>
    </div>
  );
}
