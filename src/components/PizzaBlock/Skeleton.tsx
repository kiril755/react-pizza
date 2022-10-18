import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="137" cy="125" r="125" />
    <rect x="0" y="267" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="416" rx="10" ry="10" width="95" height="30" />
    <rect x="124" y="410" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);
