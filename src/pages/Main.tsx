import TouristContentCard from "../components/main/TouristContentCard";
import React, { useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useQuery } from "@tanstack/react-query";

const cities = [
  { id: 1, name: "#전체" },
  { id: 2, name: "#서울" },
  { id: 3, name: "#경기" },
  { id: 4, name: "#인천" },
];

const seoulDistrict = [
  { id: 20, name: "#전체" },
  { id: 21, name: "#강남구" },
  { id: 22, name: "#강동구" },
  { id: 23, name: "#강북구" },
  { id: 24, name: "#강서구" },
  { id: 25, name: "#관악구" },
  { id: 26, name: "#광진구" },
  { id: 29, name: "#노원구" },
  { id: 210, name: "#도봉구" },
  { id: 211, name: "#동대문구" },
  { id: 212, name: "#동작구" },
  { id: 213, name: "#마포구" },
  { id: 214, name: "#서대문구" },
  { id: 215, name: "#서초구" },
  { id: 216, name: "#성동구" },
  { id: 217, name: "#성북구" },
  { id: 218, name: "#양천구" },
  { id: 219, name: "#영등포구" },
  { id: 220, name: "#용산구" },
  { id: 221, name: "#은평구" },
  { id: 222, name: "#종로구" },
  { id: 223, name: "#중구" },
  { id: 224, name: "#중랑구" },
];

const gyeonggiDistrict = [
  { id: 30, name: "#전체" },
  { id: 31, name: "#가평군" },
  { id: 32, name: "#고양시" },
  { id: 33, name: "#과천시" },
  { id: 34, name: "#광명시" },
  { id: 35, name: "#광주시" },
  { id: 36, name: "#구리시" },
  { id: 37, name: "#군포시" },
  { id: 38, name: "#김포시" },
  { id: 39, name: "#남양주시" },
  { id: 310, name: "#동두천시" },
  { id: 311, name: "#부천시" },
  { id: 312, name: "#성남시" },
  { id: 313, name: "#수원시" },
  { id: 314, name: "#시흥시" },
  { id: 315, name: "#안산시" },
  { id: 316, name: "#안성시" },
  { id: 317, name: "#안양시" },
  { id: 318, name: "#양주시" },
  { id: 319, name: "#양평군" },
  { id: 320, name: "#여주시" },
  { id: 321, name: "#연천군" },
  { id: 322, name: "#오산시" },
  { id: 323, name: "#용인시" },
  { id: 324, name: "#의왕시" },
  { id: 325, name: "#의정부시" },
  { id: 326, name: "#이천시" },
  { id: 327, name: "#파주시" },
  { id: 328, name: "#평택시" },
  { id: 329, name: "#포천시" },
  { id: 330, name: "#하남시" },
  { id: 331, name: "#화성시" },
];

const incheonDistrict = [
  { id: 40, name: "#전체" },
  { id: 41, name: "#강화군" },
  { id: 42, name: "#계양구" },
  { id: 43, name: "#남동구" },
  { id: 44, name: "#동구" },
  { id: 45, name: "#미추홀구" },
  { id: 46, name: "#부평구" },
  { id: 47, name: "#서구" },
  { id: 48, name: "#연수구" },
  { id: 49, name: "#옹진군" },
  { id: 410, name: "#중구" },
];

interface Idistrict {
  id: number;
  name: string;
}

function Main() {
  const [selectedCity, setSelectedCity] = useState<number>(cities[0].id);
  const [selectedDistricts, setSelectedDistricts] = useState<Idistrict[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<Idistrict>();
  const [order, setOrder] = useState<String>("good");
  const [pageNum, setPageNum] = useState<number>(0);
  const selectCity = (cityId: number) => {
    setSelectedCity(cityId);
    if (cityId === 1) {
      setSelectedDistricts([]);
    } else if (cityId === 2) {
      setSelectedDistricts(seoulDistrict);
      setSelectedDistrict(seoulDistrict[0]);
    } else if (cityId === 3) {
      setSelectedDistricts(gyeonggiDistrict);
      setSelectedDistrict(gyeonggiDistrict[0]);
    } else if (cityId === 4) {
      setSelectedDistricts(incheonDistrict);
      setSelectedDistrict(incheonDistrict[0]);
    }
  };

  const selectDistrict = (districtId: number) => {
    setSelectedDistrict(
      selectedDistricts.find(
        (selectedDistrict) => selectedDistrict.id === districtId,
      ),
    );
  };

  const selectOrder = (orderName: string) => {
    setOrder(orderName);
  };

  const fetchData = async () => {
    const result = await axios(
      "http://localhost:8080/data?pageNum=" + pageNum + "&order=" + order,
    );
    return result.data; // axios의 응답에서 데이터를 반환합니다.
  };

  const { isPending, data, error } = useQuery({
    queryKey: ["todos", pageNum, order],
    queryFn: fetchData,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }
  const handlePageChange = (page: number) => {
    setPageNum(page - 1);
  };
  console.log("pageNum : " + pageNum);

  return (
    <div>
      <div className="flex">
        <div className="w-3/5">
          <div className="flex mb-7">
            <div className="flex-grow">
              <span>총 {data?.total} 건</span>
              <span className="mx-1.5">|</span>
              <span>
                페이지 {pageNum + 1} / {Math.ceil(data?.total / 9)}
              </span>
            </div>
            <div className="flex-grow text-end">
              <span
                onClick={() => {
                  selectOrder("good");
                }}
                className={
                  order !== "good"
                    ? "text-gray-400 cursor-pointer"
                    : "cursor-pointer"
                }
              >
                좋아요순
              </span>
              <span className="mx-1.5">|</span>
              <span
                onClick={() => {
                  selectOrder("ganada");
                }}
                className={
                  order !== "ganada"
                    ? "text-gray-400 cursor-pointer"
                    : "cursor-pointer"
                }
              >
                가나다순
              </span>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-3 gap-y-10">
              {data?.result.map((touristAttraction: any) => (
                <TouristContentCard data={touristAttraction} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-2/5 mx-5">
          <div className="flex items-center mb-3.5">
            <div className="flex-grow flex justify-center">
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="title">제목</option>
                <option value="all">제목 + 내용</option>
              </select>
            </div>

            <div className="flex-grow">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="ex) 월미도"
              />
            </div>
            <div className="flex-grow">
              <button className="ml-3 py-1 px-2 ">🔎</button>
            </div>
          </div>
          <div className="p-6 bg-gray-50 h-full">
            <hr className="my-5" />
            <div>
              {cities.map((city) => (
                <button
                  className={
                    city.id === selectedCity
                      ? "bg-blue-500 hover:bg-blue-700 text-white p-1 rounded-full mx-2"
                      : "mx-2"
                  }
                  key={city.id}
                  onClick={() => selectCity(city.id)}
                >
                  {city.name}
                </button>
              ))}
            </div>

            <hr className="my-5" />
            <div>
              {selectedDistricts.map((district) => (
                <button
                  className={
                    district.id === selectedDistrict?.id
                      ? "bg-blue-500 hover:bg-blue-700 text-white p-1 rounded-full m-2"
                      : "m-2 p-1"
                  }
                  key={district.id}
                  onClick={() => selectDistrict(district.id)}
                >
                  {district.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-20 border-blue-500">
        <Pagination
          itemClass={"border-blue-500 border-2 p-3 px-5"}
          activePage={pageNum - 1} // 현재 페이지
          itemsCountPerPage={9} // 한 페이지랑 보여줄 아이템 갯수
          totalItemsCount={data?.total} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator의 페이지 범위
          prevPageText={"‹"} // "이전"을 나타낼 텍스트
          nextPageText={"›"} // "다음"을 나타낼 텍스트
          onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        />
      </div>

      {/*<div className="my-20 flex justify-center">*/}
      {/*  <nav aria-label="Page navigation example">*/}
      {/*    <ul className="flex items-center -space-x-px h-10 text-base">*/}
      {/*      <li>*/}
      {/*        <a*/}
      {/*          href="#"*/}
      {/*          className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"*/}
      {/*        >*/}
      {/*          <span className="sr-only">Previous</span>*/}
      {/*          <svg*/}
      {/*            className="w-3 h-3 rtl:rotate-180"*/}
      {/*            aria-hidden="true"*/}
      {/*            xmlns="http://www.w3.org/2000/svg"*/}
      {/*            fill="none"*/}
      {/*            viewBox="0 0 6 10"*/}
      {/*          >*/}
      {/*            <path*/}
      {/*              stroke="currentColor"*/}
      {/*              strokeLinecap="round"*/}
      {/*              strokeLinejoin="round"*/}
      {/*              strokeWidth="2"*/}
      {/*              d="M5 1 1 5l4 4"*/}
      {/*            />*/}
      {/*          </svg>*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <a*/}
      {/*          href="#"*/}
      {/*          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"*/}
      {/*          onClick={() => {*/}
      {/*            setPageNum("0");*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          1*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <a*/}
      {/*          href="#"*/}
      {/*          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"*/}
      {/*          onClick={() => {*/}
      {/*            setPageNum("1");*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          2*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <a*/}
      {/*          href="#"*/}
      {/*          aria-current="page"*/}
      {/*          className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"*/}
      {/*        >*/}
      {/*          3*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <a*/}
      {/*          href="#"*/}
      {/*          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"*/}
      {/*        >*/}
      {/*          4*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <a*/}
      {/*          href="#"*/}
      {/*          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"*/}
      {/*        >*/}
      {/*          5*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <a*/}
      {/*          href="#"*/}
      {/*          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"*/}
      {/*        >*/}
      {/*          <span className="sr-only">Next</span>*/}
      {/*          <svg*/}
      {/*            className="w-3 h-3 rtl:rotate-180"*/}
      {/*            aria-hidden="true"*/}
      {/*            xmlns="http://www.w3.org/2000/svg"*/}
      {/*            fill="none"*/}
      {/*            viewBox="0 0 6 10"*/}
      {/*          >*/}
      {/*            <path*/}
      {/*              stroke="currentColor"*/}
      {/*              strokeLinecap="round"*/}
      {/*              strokeLinejoin="round"*/}
      {/*              strokeWidth="2"*/}
      {/*              d="m1 9 4-4-4-4"*/}
      {/*            />*/}
      {/*          </svg>*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*    </ul>*/}
      {/*  </nav>*/}
      {/*</div>*/}
    </div>
  );
}

export default Main;
