"use client";

import ServerDown from "@/assets/error/server_down.svg";
import Image from "next/image";

export default function Error({ error, reset }) {
  //   useEffect(() => {
  //     // Optionally log the error to an error reporting service
  //     console.error(error);
  //   }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 my-20">
      <Image
        src={ServerDown.src}
        width="200"
        height="200"
        className="w-1/2 max-w-2xl mt-20"
        priority
        alt="image error"
      />
      <div className="flex justify-center flex-col items-center gap-2.5">
        <h2 className="text-center">Something went wrong!</h2>
        <button
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          onClick={
            // Attempt to recover by trying to re-render the products route
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </main>
  );
}
