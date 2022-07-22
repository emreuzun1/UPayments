import { AxiosResponse } from "axios";
import * as React from "react";
import { BiCaretDown } from "react-icons/bi";
import { MdAdd } from "react-icons/md";

import { ObjectLıstItem } from "../components/ObjectLıstItem";
import { Object } from "../interfaces/ObjectInterface";
import { GetCategories, GetObjects } from "../lib/api";
import { Category } from "../interfaces/CategoryInterface";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = React.useState<Category[] | null>(null);
  const [data, setData] = React.useState<Object[] | null>(null);
  const [searchText, setSearchText] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    getData();
    getCategories();
  }, []);

  const getCategories = async () => {
    await GetCategories().then((res: AxiosResponse) => {
      if (res.status === 200) {
        setCategories(res.data);
      } else {
        console.log("Categories couldn't find!");
      }
    });
  };

  const getData = async () => {
    setIsLoading(true);
    await GetObjects().then((res: AxiosResponse) => {
      if (res.status === 200) {
        setData(res.data);
      } else {
        setData(null);
      }
    });
    setIsLoading(false);
  };

  const handleDropdown = () => {
    document.getElementById("category-dropdown")?.classList.toggle("is-active");
  };

  return (
    <div className="w-screen min-h-screen p-16 bg-slate-300">
      <Navbar />
      <div className="bg-white w-full mt-8 flex">
        <input
          className="text-black md:w-10/12 w-2/3 p-4 md:text-l text-sm"
          placeholder="Apple, Macbook, Matebook"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div
          className="md:w-2/12 w-1/3 border-l-2 border-gray-300 pl-2 pr-2 md:text-l text-sm relative"
          onClick={handleDropdown}
        >
          <div className="w-full h-full flex items-center justify-between">
            <div>{category === "" ? "All" : category}</div>
            <BiCaretDown color="black" size={14} />
          </div>
          <ul
            id="category-dropdown"
            className="category-dropdown opacity-0 flex-none absolute w-full bg-white z-50"
          >
            <li
              className="py-4 px-2 text-l font-medium w-full hover:bg-gray-300 cursor-pointer"
              onClick={() => setCategory("")}
            >
              All
            </li>
            {categories?.map((category: Category) => (
              <li
                className="py-4 px-2 text-l font-medium w-full hover:bg-gray-300 cursor-pointer"
                onClick={() => setCategory(category.name)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full mt-14 flex justify-center">
        {isLoading && <div>Data is Loading...</div>}
        {data && (
          <ul className="md:w-full h-full flex flex-wrap lg:w-5/6">
            {data
              .filter((obj: Object) => {
                if (searchText == "" && category == "") {
                  return obj;
                } else if (searchText == "" && category != "") {
                  console.log(category);
                  if (obj.category === category) {
                    return obj;
                  }
                } else if (searchText != "" && category == "") {
                  if (
                    obj.name.toLowerCase().includes(searchText.toLowerCase())
                  ) {
                    return obj;
                  }
                } else {
                  if (
                    obj.name.toLowerCase().includes(searchText.toLowerCase()) &&
                    obj.category === category
                  ) {
                    return obj;
                  }
                }
              })
              .map((obj: Object) => (
                <ObjectLıstItem {...obj} />
              ))}
          </ul>
        )}
        <Link
          to="create"
          className="w-20 h-20 rounded-full fixed bottom-8 right-8 bg-black flex items-center justify-center"
        >
          <MdAdd color="white" size={48} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
