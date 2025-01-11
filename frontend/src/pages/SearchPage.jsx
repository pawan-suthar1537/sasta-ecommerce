import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";
import Cardroduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import nodata from "../assets/nodata.jpg";

const SearchPage = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalpage, settotalpage] = useState(1);
  const [searchParams] = useSearchParams(); // Extract query parameters
  const searchText = searchParams.get("q") || ""; // Get "q" from query string

  const FetchData = async () => {
    try {
      setloading(true);
      const res = await Axios({
        method: "POST",
        url: "/api/product/search",
        data: {
          search: searchText,
          page: page,
        },
      });
      console.log("serchapi", res.data);
      if (!res.data.success === true) {
        toast.error(res.data.message || "Failed to fetch products");
        return;
      }
      if (res.data.page == 1) {
        setdata(res.data.data);
      } else {
        setdata((prev) => {
          return [...prev, ...res.data.data];
        });
      }

      settotalpage(res.data.totalPages);
      setloading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Failed to fetch products");
    }
  };
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setpage(1);
      setdata([]);
      FetchData();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchText]);

  const handlefetchmore = () => {
    if (page < totalpage) {
      setpage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className="max-w-6xl container mx-auto p-4">
        {data.length !== 0 && (
          <p className="font-semibold">Search Results: {data?.length}</p>
        )}

        {/*  data display */}
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={handlefetchmore}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-5">
            {/* display data */}

            {data.map((p, i) => {
              return <Cardroduct key={i} data={p} />;
            })}

            {/*  loading data */}
            {loading && <div className="">Loading...</div>}
            {!loading && data.length === 0 && (
              <div className="flex absolute items-center justify-center h-full lg:h-[400px] left-0 right-0 lg:top-28 top-0 bottom-0">
                <img
                  src={nodata}
                  alt="nodata"
                  className="lg:w-[25rem] lg:h-[25rem] w-[15rem] h-[15rem]"
                />
              </div>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SearchPage;
