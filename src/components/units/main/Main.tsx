import React, { ChangeEvent, useEffect, useState } from "react";
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

  //   const allTokenPrice = Number(tokenPrice[token.id]?.usd * input);

  useEffect(() => {
    setToken(token);
    setToken2(token2);
  }, [token, token2]);

  // input 변경 시 allTokenPrice 계산
  useEffect(() => {
    if (tokenPrice) {
      setAllTokenPrice(Number(tokenPrice[token.id]?.usd * input));
      console.log("::::", allTokenPrice);
    }
  }, [input, tokenPrice]);

  //   useEffect(() => {
  //     if (token2Price) {
  //       setAllTokenPrice(Number(token2Price[token2.id]?.usd * input));
  //     }
  //   }, [input2]);

  // allTokenPrice 나오면 input2 값 변경
  useEffect(() => {
    if (token2Price) setInput2(allTokenPrice / token2Price[token2.id].usd);
  }, [allTokenPrice, token2Price]);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(Number(event.target.value));
  };

  const onChangeInput2 = (event: ChangeEvent<HTMLInputElement>) => {
    setInput2(Number(event.target.value));
  };

  console.log("all", allTokenPrice);
  console.log("input", input, "input2", input2);
  console.log(token, token2, tokenPrice, token2Price);

  console.log(Math.floor(input2 * 10000000000) / 10000000000);
  //   console.log(allTokenPrice / token2Price[token2.id].usd);
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
                  value={removeZeros(input)}
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
                  value={removeZeros(roundNumber(input2 || 0))}
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
