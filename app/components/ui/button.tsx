import React from 'react';


export default function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="
        w-64 
        bg-[#CFFF04] 
        shadow-2xl
        text-lg
        font-bold
        text-black
        py-4 
        px-8 
        rounded-full
        border-4
        border-black
        active:shadow-md 
        active:scale-95
        transition 
        ease-in-out 
        duration-150
      "
    >
      {children}
    </button>
  );
}
