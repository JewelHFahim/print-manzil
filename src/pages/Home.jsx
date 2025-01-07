import axios from "axios";
import { useEffect, useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Home = () => {
  const [tableItem, setTableItems] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [areAllChecked, setAllChecked] = useState(false);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  let [checkboxItems, setCheckboxItem] = useState({});

  //=================>> Fetch Data Function <<==================
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          `https://api.razzakfashion.com?page=${page}`
        );
        setTableItems(response);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [page]);
  // =====>>END<<====

  //====================>> Search Functions <<===================
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filteredData = tableItem?.data?.data?.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  const datas = search ? filteredData : tableItem?.data?.data;
  // =====>>END<<====

  //===============>> Sort Name/Email Functions <<================
  const sortedData = datas?.sort((a, b) => {
    if (!sortField) return 0;
    if (a[sortField].toLowerCase() < b[sortField].toLowerCase()) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a[sortField].toLowerCase() > b[sortField].toLowerCase()) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  // =====>>END<<====

  //===================>> Check Box Functions <<====================
  const handleCheckboxItems = () => {
    setAllChecked(!areAllChecked);
    tableItem?.data?.data?.forEach((item, idx) => {
      checkboxItems[`checkbox${idx}`] = !areAllChecked;
      setCheckboxItem({ ...checkboxItems });
    });
  };

  const handleCheckboxChange = (e, idx) => {
    setAllChecked(false);
    setCheckboxItem({ ...checkboxItems, [`checkbox${idx}`]: e.target.checked });
  };

  useEffect(() => {
    tableItem?.data?.data?.forEach((item, idx) => {
      checkboxItems[`checkbox${idx}`] = false;
      setCheckboxItem({ ...checkboxItems });
    });
  }, []);

  useEffect(() => {
    const checkboxItemsVal = Object.values(checkboxItems);
    const checkedItems = checkboxItemsVal.filter((item) => item == true);
    if (checkedItems.length == tableItem?.data?.data?.length)
      setAllChecked(true);
  }, []);
  // =====>>END<<====

  //====================>> Pagination Functions <<======================
  const handlePaginate = (paginate) => {
    if (paginate === "prev" && page > 1) {
      setPage(page - 1);
    }
    if (paginate === "next" && page * 10 < tableItem?.data?.total) {
      setPage(page + 1);
    }
  };

  const handleRange = (total) => {
    const start = (page - 1) * 10 + 1;
    const end = page * 10;

    return `${start}-${end} of ${total}`;
  };
  // =====>>END<<====

  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-2 pb-4 md:pb-8 md:px-8">
      <div className="flex justify-center items-center">
        <h1 className="text-xl text-gray-300 underline-offset-4 underline">All Users</h1>
      </div>
      {/* Search */}
      <div className="mt-2">
        <input
          type="text"
          placeholder="Search name, email"
          className="h-9 w-full md:w-80 border outline-none focus:outline-blue-800 focus:ring-1 focus:ring-blue-400 border-gray-800 rounded-md px-3 bg-[#171717] bg-opacity-[30%] text-gray-300 text-sm"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <div className="mt-2 shadow-sm border border-gray-800 rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-300 bg-blaack font-medium">
            <tr>
              <th className="py-3 px-6 flex items-center gap-x-4">
                <div>
                  <input
                    type="checkbox"
                    id="checkbox-all-items"
                    className="checkbox-item peer hidden"
                    checked={areAllChecked}
                    onChange={handleCheckboxItems}
                  />
                  <label
                    htmlFor="checkbox-all-items"
                    className="relative flex w-5 h-5 bg-gray-700 bg-opacity-10 peer-checked:bg-indigo-600 rounded-md border border-gray-700 ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-gray-800 after:rotate-45"
                  ></label>
                </div>
                <div className="flex items-center">
                  <p>First Name</p>
                  <button onClick={() => handleSort("name")} type="button">
                    <BiSortAlt2 className="text-base" />
                  </button>
                  <HiDotsVertical />
                </div>
              </th>
              <th className="py-3 px-6">
                <div className="flex items-center">
                  <p>Email</p>
                  <button onClick={() => handleSort("name")} type="button ">
                    <BiSortAlt2 className="text-base" />
                  </button>
                </div>
              </th>
              <th className="py-3 px-6">
                <div className="flex items-center">
                  <p>Address</p>
                  <button type="button ">
                    <BiSortAlt2 className="text-base" />
                  </button>
                  <HiDotsVertical />
                </div>
              </th>
              <th className="py-3 px-6">
                <div className="flex items-center">
                  <p>State</p>
                  <button type="button ">
                    <BiSortAlt2 className="text-base" />
                  </button>
                  <HiDotsVertical />
                </div>
              </th>
              <th className="py-3 px-6">
                <div className="flex items-center">
                  <p>Phone Number</p>
                  <button type="button ">
                    <BiSortAlt2 className="text-base" />
                  </button>
                  <HiDotsVertical />
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-200 divide-y divide-gray-800">
            {sortedData?.length > 0 ? (
              sortedData?.map((item, idx) => (
                <tr key={idx} className="bg-[#191919]">
                  <td className="px-6 py-4 flex items-center gap-x-4">
                    <div>
                      <input
                        type="checkbox"
                        id={`checkbox-${idx}`}
                        name={`checkbox-${idx}`}
                        className="checkbox-item peer hidden"
                        checked={checkboxItems[`checkbox${idx}`]}
                        onChange={(e) => handleCheckboxChange(e, idx)}
                      />
                      <label
                        htmlFor={`checkbox-${idx}`}
                        className="relative flex w-5 h-5 bg-gray-700 bg-opacity-10 peer-checked:bg-indigo-600 rounded-md border border-gray-700 ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-gray-800 after:rotate-45"
                      ></label>
                    </div>
                    {item.name}
                  </td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4"> 73 Farmgate, Tejgoan </td>
                  <td className="px-6 py-4 ">Dhaka</td>
                  <td className="px-6 text-start"> 01911209322 </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-center" colSpan="5">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-2 flex justify-center sm:justify-end items-center gap-5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <p className="text-gray-300">Rows per page</p>
          <input
            type="number"
            value={tableItem?.data?.per_page}
            className="border border-gray-700 w-[85px] h-9 px-4 bg-[#191919] text-gray-300"
          />
        </div>

        <div className="flex gap-5 font-medium items-center text-sm text-gray-300">
          <p> {handleRange(tableItem?.data?.total)} </p>

          <button
            disabled={page === 1 ? true : false}
            onClick={() => handlePaginate("prev")}
            className="text-lg disabled:text-gray-600"
          >
            <IoIosArrowBack />
          </button>

          <button
            disabled={page * 10 < tableItem?.data?.total ? false : true}
            onClick={() => handlePaginate("next")}
            className="text-lg disabled:text-gray-600"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
