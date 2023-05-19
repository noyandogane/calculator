import React from "react";
import Calculator from "../components/Calculator";

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-6 text-4xl font-bold">Calculator App</h1>
      <Calculator />
    </div>
  );
};

export default Home;
