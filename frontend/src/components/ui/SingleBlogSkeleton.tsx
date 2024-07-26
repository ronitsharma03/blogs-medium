

export const SingleBlogSkeleton = () => {
  return (
    <section className="min-h-screen w-full animate-pulse">
      <div className="h-screen flex justify-center items-center">
        <div className="max-w-4xl p-5 h-full w-full space-y-6">
          {/* Title Skeleton */}
          <div className="bg-gray-200 h-12 w-3/4 md:w-1/2 lg:w-1/3 rounded-md"></div>

          {/* Image Skeleton */}
          <div className="bg-gray-200 h-64 w-full rounded-md"></div>

          {/* Author Info Skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="bg-gray-200 h-6 w-1/4 md:w-1/5 lg:w-1/6 rounded-md"></div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-3">
            <div className="bg-gray-200 h-4 w-full rounded-md"></div>
            <div className="bg-gray-200 h-4 w-7/8 rounded-md"></div>
            <div className="bg-gray-200 h-4 w-5/6 rounded-md"></div>
            <div className="bg-gray-200 h-4 w-4/5 rounded-md"></div>
            <div className="bg-gray-200 h-4 w-3/4 rounded-md"></div>
            <div className="bg-gray-200 h-4 w-2/3 rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
