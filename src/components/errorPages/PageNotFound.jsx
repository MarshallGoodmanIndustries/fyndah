import { Link, useRouteError } from "react-router-dom";

function PageNotFound() {
  const error = useRouteError();
  // console.error(error);
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h1 className="text-9xl font-bold text-purple-800 mb-4">Oops!</h1>
        <h2 className="text-3xl font-semibold mt-2 mb-2">404 - PAGE NOT FOUND</h2>
        <p className="text-gray-600 mb-4">
          The page you are looking for might have been removed, <br /> had its name changed or is temporarily unavailable.
        </p>
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          GO TO HOMEPAGE
        </Link>
        <p className="mt-5">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      {/* <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p> */}
    </div>
  )
}

export default PageNotFound;