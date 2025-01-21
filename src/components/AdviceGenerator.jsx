import React, { useEffect, useState } from "react";
import patternDivImgMobile from "../Assets/pattern-divider-mobile.svg";
import iconDiceImg from "../Assets/icon-dice.svg";
import patternDivImgDesktop from "../Assets/pattern-divider-desktop.svg";

export default function AdviceGenerator() {
  const [advice, setAdvice] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const apiURL = "https://api.adviceslip.com/advice";

  useEffect (()=>{
    fetchAdvice()
  }, [])

  async function fetchAdvice() {
    try {
      setIsFetching(true);
      const response = await fetch(apiURL);
      const data = await response.json();
      setAdvice(data);
      setIsLoaded(true);
    } catch (error) {
      setAdvice("Failed to fetch a joke. Please try again!");
      console.error("Error fetching joke:", error);
    }
    finally {
      setIsFetching(false)
    }
  }

  return (
    <div className="w-[90%] h-[50%] rounded-xl lg:w-[50%] bg-gray-600 text-white flex  justify-center p-8 relative font-[Calibri]">
      <div className="text-center">
      <h2 className="text-green-200 text-xl">
        ADVICE {isLoaded ? `# ${advice.slip.id}` : "loading..."}
      </h2>
      <div>
        <q className="font-bold text-xl">
          {isLoaded ? advice.slip.advice : "Click button to get advice"}
        </q>
      </div>
      </div>

      <img
        src={patternDivImgMobile}
        alt="pattern divider"
        className="absolute bottom-16 lg:hidden"
      />
      <img
        src={patternDivImgDesktop}
        alt="pattern divider"
        className="absolute bottom-16 hidden lg:flex ml-4"
      />

      <button
        className={`bg-green-300 rounded-full absolute -bottom-9 hover:bg-green-400 ease-in-out ${isFetching? "cursor-not-allowed opacity-50" : ""}`}
        onClick={fetchAdvice}
        disabled={isFetching}
      >
        <img src={iconDiceImg} alt="icon dice" className="w-[25px] m-5 hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
