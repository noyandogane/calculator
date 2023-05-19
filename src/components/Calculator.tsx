import React, { useState, useEffect, useCallback } from "react";

const Calculator: React.FC = () => {
  const [result, setResult] = useState<string>("");

  const handleButtonClick = useCallback(
    (value: string) => {
      if (value === "." && result.endsWith(".")) {
        return; // Don't allow dots back to back
      }

      setResult(result + value);
    },
    [result]
  );

  const calculateResult = useCallback(() => {
    try {
      setResult(eval(result));
    } catch (error) {
      setResult("Error");
    }
  }, [result]);

  const clearResult = useCallback(() => {
    setResult("");
  }, []);

  const removeLastCharacter = useCallback(() => {
    if (result.length > 0) {
      setResult(result.slice(0, -1));
    }
  }, [result]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === "Enter") {
        calculateResult();
      } else if (key === "Backspace") {
        removeLastCharacter();
      } else if (/[0-9+\-*/.]/.test(key)) {
        handleButtonClick(key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [result, calculateResult, handleButtonClick, removeLastCharacter]);

  return (
    <div className="mx-auto mt-10 max-w-sm rounded-lg bg-white p-6 shadow-md">
      <input
        type="text"
        className="mb-4 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-right text-3xl font-semibold"
        value={result}
        readOnly
      />
      <div className="grid grid-cols-4 gap-4">
        <button className="btn-gray btn col-span-3 " onClick={clearResult}>
          Clear
        </button>

        <button className="btn-gray btn text-2xl" onClick={removeLastCharacter}>
          ←
        </button>

        <button
          className="btn-primary btn-lg btn"
          onClick={() => handleButtonClick("7")}
        >
          7
        </button>
        <button
          className="btn-primary btn-lg btn"
          onClick={() => handleButtonClick("8")}
        >
          8
        </button>
        <button
          className="btn-primary btn-lg btn"
          onClick={() => handleButtonClick("9")}
        >
          9
        </button>
        <button
          className="operator-text btn-primary btn-lg btn text-2xl"
          onClick={() => handleButtonClick("/")}
        >
          ÷
        </button>
        <button
          className="btn-primary btn-lg btn"
          onClick={() => handleButtonClick("4")}
        >
          4
        </button>
        <button
          className="btn-primary btn-lg btn"
          onClick={() => handleButtonClick("5")}
        >
          5
        </button>
        <button
          className="btn-primary btn-lg btn"
          onClick={() => handleButtonClick("6")}
        >
          6
        </button>
        <button
          className="operator-text btn-primary btn-lg btn text-2xl"
          onClick={() => handleButtonClick("*")}
        >
          ×
        </button>
        <button
          className="btn-primary btn-lg btn"
          onClick={() => handleButtonClick("1")}
        >
          1
        </button>
        <button
          className="btn-primary btn-lg btn"
          onClick={() => handleButtonClick("2")}
        >
          2
        </button>
        <button
          className="btn-primary btn-lg btn"
          onClick={() => handleButtonClick("3")}
        >
          3
        </button>
        <button
          className="operator-text btn-primary btn-lg btn text-2xl"
          onClick={() => handleButtonClick("-")}
        >
          -
        </button>
        <button
          className="btn-zero btn-primary btn-lg btn col-span-2"
          onClick={() => handleButtonClick("0")}
        >
          0
        </button>
        <button
          className="btn-primary btn-lg btn"
          onClick={() => handleButtonClick(".")}
        >
          .
        </button>
        <button
          className="operator-text btn-primary btn-lg btn text-2xl"
          onClick={() => handleButtonClick("+")}
        >
          +
        </button>
        <button
          className="btn-accent btn-lg btn col-span-4 text-2xl"
          onClick={calculateResult}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
