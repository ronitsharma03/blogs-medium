

export const BlogSkeleton = () => {
  return (
    <div className="relative px-4 py-2 border-b animate-pulse max-w-full">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
        <div className="text-md bg-gray-200 font-normal w-56 h-8 rounded-r-full rounded-l-full"></div>
        <div className="text-gray-200 font-extralight text-xs w-1 h-14">
          &#9679;
        </div>
        <div className="text-sm bg-gray-200 font-light w-44 h-8 rounded-r-full rounded-l-full"></div>
      </div>

      <div className="mt-4">
        <div className="flex flex-row-reverse flex-wrap md:flex-nowrap items-start justify-start">
          <div className="w-full md:w-96 h-56 ml-0 md:ml-8 bg-gray-200 rounded-md"></div>

          <div className="w-full md:w-[42rem] mt-4 md:mt-0">
            <div className="font-bold text-4xl mb-6 break-words w-full md:w-96 h-20 bg-gray-200 rounded-r-full rounded-l-full"></div>
            <div className="h-56 text-lg flex items-start mt-1 text-justify">
              <div className="flex flex-col w-full gap-1">
                <div className="rounded-b-md bg-gray-200 py-3 rounded-r-full rounded-l-full mb-1"></div>
                <div className="rounded-b-md bg-gray-200 py-3 rounded-r-full rounded-l-full mb-1"></div>
                <div className="rounded-b-md bg-gray-200 py-3 rounded-r-full rounded-l-full mb-1"></div>
                <div className="rounded-b-md bg-gray-200 py-3 rounded-r-full rounded-l-full mb-1"></div>
                <div className="rounded-b-md bg-gray-200 py-3 rounded-r-full rounded-l-full mb-1"></div>
                <div className="mt-4">
                  <button className="font-light text-base p-1 py-4 text-white bg-gray-200 w-32 rounded-sm mt-4"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-row items-center justify-between">
        <div className="w-20 py-2 rounded-r-full rounded-l-full bg-gray-200"></div>
        <div>
          <button className="bg-gray-200 w-10 py-2 rounded-l-full rounded-r-full"></button>
        </div>
      </div>
    </div>
  );
};
