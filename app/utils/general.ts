import { useTailwind } from "tailwind-rn"
import { AnyObject } from "../types"

export const useQuery = (url: string, query: string, variables?: AnyObject) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
}

export const tw = useTailwind
