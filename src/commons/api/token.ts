import React from "react";
import { useQuery } from "react-query";

export async function fetchToken(ids) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=${ids}`
  );
  return response.json();
}
