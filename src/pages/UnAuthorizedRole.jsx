const UnauthorizedRole = () => {
  return (
    <div className="flex flex-col items-center pt-20 min-h-screen">
      <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
      <p className="text-white mt-2">
        You do not have permission to view this page.Only Recruiters are allowed
        to access this page.
      </p>
    </div>
  );
};

export default UnauthorizedRole;
