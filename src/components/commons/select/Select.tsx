import React, { ChangeEvent, useEffect, useState } from "react";
import _ from "lodash";

// components
import Item from "../item/Item";
import Label from "../label/Label";

// data
import { tokens } from "@/src/commons/db/data";

// icons
import { IoIosClose } from "react-icons/io";

export default function Select(props: any) {
  const [recentTokens, setRecentTokens] = useState<any>([]);
  const [searchedTokens, setSearchedTokens] =
    useState<{ name: string; id: string }[]>();

  useEffect(() => {
    const recentList = JSON.parse(sessionStorage.getItem("recentList") || "[]");
    setRecentTokens(recentList);
  }, []);

  const onClickToken = (id: string, name: string) => {
    const recentList = JSON.parse(sessionStorage.getItem("recentList") || "[]");

    // 중복 방지
    let isIn = false;
    recentList.forEach((token: { id: string; name: string }) => {
      if (id === token.id) isIn = true;
    });

    if (!isIn) {
      // 누른 토큰 추가
      recentList.push({ id, name });

      // 7개 넘으면 앞의 것 제거
      if (recentList.length > 7) recentList.shift();

      sessionStorage.setItem("recentList", JSON.stringify(recentList));

      setRecentTokens([...recentList]);
    }

    // 메인화면의 토큰 세팅
    props.setToken({
      id,
      name,
    });
    props.setModalOpen(false);
  };

  // 검색
  const getDebounce = _.debounce((inputData: string) => {
    const filtered = tokens.filter((token) => {
      return token.name.includes(inputData.toUpperCase());
    });

    setSearchedTokens(filtered);
  }, 200);

  const onChangeSearchInput = (event: ChangeEvent) => {
    getDebounce((event.target as HTMLInputElement).value);
  };

  return (
    <section className="w-[400px] flex flex-col absolute inset-0 bg-zinc-900">
      <div className="p-6">
        <div className="flex justify-between items-center mb-5">
          <p className="text-sm">토큰 선택</p>
          <IoIosClose
            onClick={() => props.setModalOpen(false)}
            className="text-3xl hover:cursor-pointer"
          />
        </div>

        <input
          className="bg-transparent p-4 w-full h-12 border border-blue-700 rounded-2xl mb-2"
          placeholder="이름 검색 또는 주소 붙여 넣기"
          onChange={onChangeSearchInput}
        />
        <div className="w-full my-2">
          {recentTokens?.map((token: { id: string; name: string }) => (
            <span
              key={token.id}
              onClick={() => onClickToken(token.id, token.name)}
            >
              <Label key={token.id} data={token} />
            </span>
          ))}
        </div>
      </div>
      <div className="border-t border-t-zinc-700 w-full h-[400px] overflow-scroll">
        {(searchedTokens || tokens)?.map((token) => (
          <div
            key={token.id}
            onClick={() => onClickToken(token.id, token.name)}
          >
            <Item data={token} />
          </div>
        ))}
      </div>
      <button
        onClick={() => alert("준비 중입니다")}
        className="w-full h-12 text-blue-500 text-sm bg-zinc-800"
      >
        토큰 목록 관리
      </button>
    </section>
  );
}
