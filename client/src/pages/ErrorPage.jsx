const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-9xl font-extrabold text-red-500">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! Page not found
        </h2>
        <p className="mt-2 text-gray-600">
          The page you're looking for doesn't exist. It might have been removed
          or the link might be broken.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
