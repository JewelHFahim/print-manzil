import { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";

export default function DesignPage() {
  const [logo, setLogo] = useState(null);
  const tshirtRef = useRef(null);

  // Handle logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Generate final image
  const handleExportImage = async () => {
    if (tshirtRef.current) {
      const canvas = await html2canvas(tshirtRef.current);
      const link = document.createElement("a");
      link.download = "tshirt-design.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-[calc(100vh-60px)] bg-gradient-to-t from-gray-300 to-white">
      <h1 className="text-xl font-bold mb-4 text-gray-500 underline underline-offset-4">
        T-Shirt Designer
      </h1>

      <div className="flex flex-col sm:flex-row gap-5 h-max mt-3">
        {/* T-Shirt Preview */}
        <div
          ref={tshirtRef}
          className="relative w-full md:w-[400px] h-[500px] bg-gray-200 overflow-hidden border-2 border-gray-400"
          style={{
            backgroundImage: `url(/tshirt.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {logo && (
            <Rnd
              bounds="parent"
              default={{
                x: 50,
                y: 50,
                width: 100,
                height: 100,
              }}
              lockAspectRatio
              className="absolute"
            >
              <img
                src={logo}
                alt="Uploaded Logo"
                className="w-full h-full object-cover"
              />
            </Rnd>
          )}
        </div>

        <div className="flex flex-col justify-between items-center ">
          {/* Upload Logo */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="border border-gray-500 rounded px-2 py-1"
            />
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportImage}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export Final Design
          </button>
        </div>
      </div>
    </div>
  );
}
