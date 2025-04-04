export default function Badge() {
  return (
    <div className="px-4 mx-auto mb-0 text-center sm:px-4 animation glow delay-1">
      <a
        href="https://skillsets.tech/?utm_source=it-croatia.com"
        className="inline-flex items-center justify-between px-2 py-2 pr-4 text-gray-700 bg-gray-100 rounded-lg mb-7 hover:bg-gray-20"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="flex w-2 h-2 ml-2 mr-3 bg-indigo-500 rounded-full animate-pulse"></span>
        <span className="text-sm rounded-lg text-indigo-500 pl-0 py-1.5 mr-3 font-bold">
          skillsets.tech
        </span>{" "}
        <span className="text-xs">
          Discover the most wanted skills by recruiters
        </span>
        <svg
          className="w-5 h-5 ml-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  );
}
