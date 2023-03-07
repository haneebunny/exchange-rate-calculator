import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

// components
import Label from "../../commons/label/Label";
import Select from "../../commons/select/Select";

// icons
import { FiSettings } from "react-icons/fi";
import { AiOutlineArrowDown } from "react-icons/ai";

// api, data
import { removeZeros, roundNumber } from "@/src/commons/api/function";
import { fetchToken } from "@/src/commons/api/token";
import { tokens } from "@/src/commons/db/data";

export default function Main() {
  // useEffect로 동기화 시키기

  const [token, setToken] = useState(tokens[0]);
  const [token2, setToken2] = useState(tokens[1]);

  const [isTokenModalOpen, setTokenModalOpen] = useState<boolean>(false);
  const [isToken2ModalOpen, setToken2ModalOpen] = useState<boolean>(false);

  const [input, setInput] = useState<number>(0);
  const [input2, setInput2] = useState<number>(0);

  const [allTokenPrice, setAllTokenPrice] = useState<number>(0);

  const handleChangeInput = useCallback((value: number) => {
    const temp = removeZeros(Number(value));
    console.log("removeZeros 후:", temp);

    setInput(temp);
  }, []);

  const handleChangeInput2 = useCallback((value: number) => {
    const temp = removeZeros(Number(value));
    setInput2(temp);
  }, []);

  const {
    data: tokenPrice,
    isError,
    error,
    isLoading,
  } = useQuery(["token", token], () => fetchToken(token.id), {
    enabled: !!input && !!token,
  });

  const { data: token2Price } = useQuery(
    ["token2", token2],
    () => fetchToken(token2.id),
    { enabled: !!input && !!token }
  );

  // 새로고침해도 선택값이 남아있도록 하기
  useEffect(() => {
    const savedTokens = localStorage.getItem("token");

    if (savedTokens) {
      console.log(JSON.parse(savedTokens));
      setToken(JSON.parse(savedTokens));
    }
  }, []);

  // input 변경 시 allTokenPrice 계산
  useEffect(() => {
    if (tokenPrice) {
      setAllTokenPrice(Number(tokenPrice[token.id]?.usd * input));
    }
  }, [input, tokenPrice]);

  useEffect(() => {
    if (token2Price) {
      setAllTokenPrice(Number(token2Price[token2.id]?.usd * input2));
    }
  }, [input2, token2Price]);

  // allTokenPrice 나오면 input2 값 변경
  useEffect(() => {
    if (token2Price) setInput2(allTokenPrice / token2Price[token2.id].usd);
  }, [allTokenPrice]);

  // allTokenPrice 나오면 input 값 변경
  useEffect(() => {
    if (tokenPrice) setInput(allTokenPrice / tokenPrice[token.id].usd);
  }, [allTokenPrice]);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.value::", event.target.value);
    const value = Number(event.target.value);
    console.log("Number한 event.target.value::", value);
    handleChangeInput(value);
  };

  const onChangeInput2 = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    handleChangeInput2(value);
  };
  console.log(input);
  return (
    <main className="w-screen h-screen bg-black">
      <section className="relative w-[400px] h-full flex flex-col items-center mx-auto ">
        <div className="w-full p-6 rounded-sm bg-zinc-900 flex flex-col gap-2">
          <div className="pb-3 flex flex-row items-center justify-between">
            <p className="text-sm">스왑</p>
            <FiSettings
              className="hover:cursor-pointer"
              onClick={() => {
                alert("준비 중입니다.");
              }}
            />
          </div>

          <div className=" relative">
            <div className="px-4 py-2 w-full h-20 rounded-xl bg-zinc-800 flex flex-col mb-2">
              <div className="flex flex-row justify-between">
                <input
                  type="number"
                  //    step="0.0000000001"
                  value={roundNumber(input)}
                  onChange={onChangeInput}
                  className="w-full text-xl bg-transparent text-zinc-200 appearance-none"
                  placeholder="0.0"
                />
                <div onClick={() => setTokenModalOpen(true)}>
                  <Label data={token} />
                </div>
              </div>

              <p className=" text-zinc-500 text-xs">
                {tokenPrice && `$${roundNumber(allTokenPrice)}`}
              </p>
            </div>
            <div className="absolute inset-x-40 inset-y-16 w-8 h-8 bg-zinc-800 border-4 rounded-xl flex items-center justify-center border-zinc-900">
              <AiOutlineArrowDown className="text-sm" />
            </div>
            <div className="px-4 py-2 w-full h-20 rounded-xl bg-zinc-800 flex flex-col">
              <div className="flex flex-row justify-between">
                <input
                  type="number"
                  className="w-full text-xl bg-transparent text-zinc-200 appearance-none"
                  value={roundNumber(input2)}
                  onChange={onChangeInput2}
                  placeholder="0.0"
                />
                <div onClick={() => setToken2ModalOpen(true)}>
                  <Label data={token2} />
                </div>
              </div>
              <p className=" text-zinc-500 text-xs">
                {tokenPrice && token && `$${roundNumber(allTokenPrice)}`}
              </p>
            </div>
          </div>

          {!!input && !!input2 ? (
            <>
              {!!token && !!token2 && tokenPrice && token2Price && (
                <p className="text-xs p-2">
                  1 {token2.name} ={" "}
                  {roundNumber(
                    token2Price[token2.id]?.usd / tokenPrice[token.id]?.usd
                  )}{" "}
                  {token.name}
                  <span className="text-zinc-500">
                    (${roundNumber(token2Price[token2.id]?.usd)})
                  </span>
                </p>
              )}

              <button
                onClick={() => {
                  alert("준비 중입니다.");
                }}
                className="p-4 w-full h-17 rounded-xl bg-indigo-600"
              >
                스왑
              </button>
            </>
          ) : (
            <div className="px-4 py-4 w-full h-17 rounded-xl text-zinc-500 bg-zinc-800 flex justify-center">
              금액을 입력하세요
            </div>
          )}
        </div>
        {isTokenModalOpen && (
          <div>
            <Select setToken={setToken} setModalOpen={setTokenModalOpen} />
          </div>
        )}
        {isToken2ModalOpen && (
          <div>
            <Select
              token={token}
              setToken={setToken2}
              setModalOpen={setToken2ModalOpen}
            />
          </div>
        )}
      </section>
    </main>
  );
}
