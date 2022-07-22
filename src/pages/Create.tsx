import { AxiosResponse } from "axios";
import * as React from "react";
import { BiCaretDown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { Category } from "../interfaces/CategoryInterface";
import { CreateObjectInterface } from "../interfaces/ObjectInterface";
import { CreateObject, GetCategories } from "../lib/api";

const Create = () => {
  const [categories, setCategories] = React.useState<Category[] | null>(null);
  const [category, setCategory] = React.useState<string>("");
  const [object, setObject] = React.useState<CreateObjectInterface | null>({
    name: "Product Name",
    description: "Description",
    avatar: "Image URL",
    category: "",
    price: 0,
    developerEmail: "",
  });
  const navigate = useNavigate();

  React.useEffect(() => {
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

  const handleDropdown = () => {
    document
      .getElementById("create-category-dropdown")
      ?.classList.toggle("is-active");
  };

  const handleSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();
    await CreateObject(object!).then((res) => {
      if (res.status === 201) {
        console.log(res);
        navigate("/");
      } else {
        console.log(res);
      }
    });
  };

  return (
    <div className="w-screen min-h-screen p-16 bg-slate-300 flex flex-col">
      <Navbar />
      <form
        className="w-full h-full flex flex-col justify-center items-center mt-12"
        onSubmit={handleSubmit}
      >
        <div className="md:text-3xl text-xl font-bold">Create Product</div>
        <input
          type="text"
          value={object?.name}
          onChange={(e) => setObject({ ...object!, name: e.target.value })}
          className="p-2 my-4 w-full md:w-1/3 rounded-md"
        />
        <textarea
          value={object?.description}
          onChange={(e) =>
            setObject({ ...object!, description: e.target.value })
          }
          className="p-2 my-4 w-full md:w-1/3 h-24 rounded-md resize-none"
        />
        <input
          type="text"
          value={object?.avatar}
          onChange={(e) => setObject({ ...object!, avatar: e.target.value })}
          className="p-2 my-4 w-full md:w-1/3 rounded-md"
        />
        <div
          className="w-full md:w-1/3 bg-white border-l-2 border-gray-300 p-2 rounded-md md:text-l text-sm relative my-4"
          onClick={() => handleDropdown()}
        >
          <div className="w-full h-full flex items-center justify-between cursor-pointer">
            <div>{category === "" ? "Category" : category}</div>
            <BiCaretDown color="black" size={14} />
          </div>
          <ul
            id="create-category-dropdown"
            className="create-category-dropdown opacity-0 flex-none absolute w-full bg-white z-50"
          >
            {categories?.map((category: Category) => (
              <li
                className="py-4 px-2 text-l font-medium w-full hover:bg-gray-300 cursor-pointer"
                onClick={() => {
                  setObject({ ...object!, category: category.name });
                  setCategory(category.name);
                }}
                key={category.id}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <input
          type="text"
          value={object?.price}
          onChange={(e) =>
            setObject({ ...object!, price: parseInt(e.target.value) })
          }
          className="p-2 my-4 w-full md:w-1/3 rounded-md"
        />
        <input
          type="submit"
          value="Submit"
          className="p-2 my-4 w-full md:w-1/3 rounded-md bg-white text-black font-bold"
        />
      </form>
    </div>
  );
};

export default Create;
