import React from "react";

function TouristContentCard(data: any) {
  return (
    <div>
      {/*<img src="/img/sample.png" />*/}
      <div>
        <img
          src={`https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=${data?.data.touristImages[0].path}`}
        />
      </div>
      <div className="flex">
        <div className="flex-grow mt-1.5">{data?.data.title}</div>
      </div>
      <div className="mt-1.5">
        {data.data?.hashTags.map((hashTag: any) => (
          <span className="mr-1">#{hashTag.name}</span>
        ))}
      </div>
      <div className="flex mt-1.5">
        <div className="w-3/12">❤ {data?.data.like}</div>
      </div>
    </div>
  );
}

export default TouristContentCard;
