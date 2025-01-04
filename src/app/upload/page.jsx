import Uploader from "@/components/file/uploader";
const UploadPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="h-full w-full max-w-6xl p-4">
        <Uploader />
      </div>
    </div>
  );
};

export default UploadPage;
