import { useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);
  const [isSBannerLoaded, setIsSBannerLoaded] = useState(false);

  const banner =
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg";
  const sbanner =
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-03/babycare-WEB.jpg";

  const allcategory = useSelector((state) => state.product.allcategory);

  return (
    <section className="bg-white">
      <div className="container mx-auto rounded my-4">
        {/* Skeleton Loader */}
        <div
          className={`w-full h-full min-h-48 rounded ${
            isBannerLoaded && isSBannerLoaded ? "hidden" : "animate-pulse"
          }`}
        >
          <div className="w-full h-full rounded hidden lg:block bg-gray-200"></div>
          <div className="w-full h-full rounded lg:hidden bg-gray-200 p-2"></div>
        </div>

        {/* Image Content */}
        <div className={`${isBannerLoaded && isSBannerLoaded ? "" : "hidden"}`}>
          <img
            src={banner}
            alt="banner"
            className="w-full h-full rounded hidden lg:block"
            onLoad={() => setIsBannerLoaded(true)}
          />
          <img
            src={sbanner}
            alt="banner"
            className="w-full h-full rounded lg:hidden p-2"
            onLoad={() => setIsSBannerLoaded(true)}
          />
        </div>
      </div>

      {/* Shop by Category */}
      <div className="container mx-auto my-4 px-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {allcategory
          ? allcategory.map((category, index) => {
              return (
                <div key={index}>
                  <div>
                    <img
                      src={category?.image}
                      alt="category"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            })
          : // Show Skeleton Loaders if no categories are available
            new Array(20).fill(null).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded p-4 min-h-36 grid gap-2 animate-pulse"
              >
                <div className="bg-blue-200 min-h-28 rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default Home;
