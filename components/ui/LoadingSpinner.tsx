import { GridLoader } from "react-spinners";

const LoadingSpinner = (props: any) => {
  return (
    <div className="h-full w-full fixed top-0 left-0 flex justify-center items-center z-50 bg-white bg-opacity-90">
      <GridLoader
        color="#FDAF87"
        loading={props?.isLoading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
