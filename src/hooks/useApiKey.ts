export function useApiKey() {
  return process.env.NEXT_PUBLIC_OMDB_API_KEY || "";
}

// import { useEffect, useState } from "react";

// export function useApiKey() {
//   const [apiKey, setApiKey] = useState("");

//   useEffect(() => {
//     const storedKey = localStorage.getItem("omdb_api_key");
//     if (storedKey) {
//       setApiKey(storedKey);
//     } else {
//       const newKey = prompt("Please enter your OMDB API key:");
//       if (newKey) {
//         localStorage.setItem("omdb_api_key", newKey);
//         setApiKey(newKey);
//       }
//     }
//   }, []);

//   return apiKey;
// }
