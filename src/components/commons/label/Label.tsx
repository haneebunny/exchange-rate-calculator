import React from "react";

export default function Label({ data }: any) {
  return (
    <>
      <button className="mr-2 mb-2 px-2 py-1 w-fit border border-zinc-700 rounded-lg bg-transparent active:bg-zinc-600">
        {data?.name}
      </button>
    </>
  );
}
