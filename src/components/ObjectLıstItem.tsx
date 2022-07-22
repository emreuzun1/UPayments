import * as React from "react";
import { Link } from "react-router-dom";
import { Object } from "../interfaces/ObjectInterface";

export const ObjectLıstItem: React.FC<Object> = (props) => {
  return (
    <Link
      to={{ pathname: `${props.id}` }}
      className="xl:max-w-[25%] md:max-w-[33.3%] xl:h-96 h-64 px-4 py-4 flex flex-col xl:mt-0 mt-8"
    >
      <div className="h-full bg-white pl-6 pr-6 flex items-center justify-center hover:cursor-pointer hover:scale-105 transition-all overflow-hidden">
        <img src={props.avatar} className="h-4/5" />
      </div>
      <div className="font-medium w-full mt-2 truncate">{props.name}</div>
      <div className="self-center font-medium mt-1">$ {props.price}</div>
    </Link>
  );
};
