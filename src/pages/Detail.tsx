import { AxiosResponse } from "axios";
import * as React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Object } from "../interfaces/ObjectInterface";
import { GetObjectById } from "../lib/api";

const Detail = () => {
  const [object, setObject] = React.useState<Object | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { id } = useParams();

  React.useEffect(() => {
    GetObject();
  }, []);

  const GetObject = async () => {
    setIsLoading(true);
    await GetObjectById(id!).then((res: AxiosResponse) => {
      if (res.status === 200) {
        setObject(res.data);
      } else {
        console.log("Object couldn't find!");
      }
    });
    setIsLoading(false);
  };

  return (
    <div className="w-screen min-h-screen p-16 bg-slate-300 flex flex-col">
      <Navbar />
      {isLoading ? (
        <div>Data is Loading...</div>
      ) : (
        <div className="w-full lg:w-4/6 flex self-center justify-center mt-12 flex-col">
          <div className="w-full h-full flex md:flex-row flex-col">
            <div className="max-w-xs">
              <img src={object?.avatar} />
            </div>
            <div className="ml-4 flex flex-col justify-between md:mt-0 mt-4 md:items-start items-center">
              <p className="font-bold text-4xl md:text-left text-center">
                {object?.name}
              </p>
              <p className="font-semibold text-2xl mt-2">${object?.price}</p>
            </div>
          </div>
          <div className="w-11/12 h-1 bg-black mt-8 mb-4 pl-2 pr-2 self-center" />
          <div>
            <p className="font-bold text-2xl">Description</p>
            <p className="text-l mt-2 leading-5">{object?.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
