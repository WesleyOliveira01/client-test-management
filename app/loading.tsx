import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <LoaderCircle className="animate-spin" color="#ffffff" size={50} />
    </div>
  );
};

export default Loading;
