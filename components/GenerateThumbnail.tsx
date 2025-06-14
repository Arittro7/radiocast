
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { GenerateThumbnailProps } from "@/Types";
// import { useAction } from "convex/react";
// import { api } from "@/convex/_generated/api";
import { useUploadThing } from "@/lib/uploadthing"; // Import the hook from our new file

const GenerateThumbnail = ({
  setImage,
  // setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  // Use the new UploadThing hook
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      // Set the image URL from the response
      const fileUrl = res?.[0]?.url;
      if (fileUrl) {
        setImage(fileUrl);
        toast("Thumbnail uploaded successfully");
      }
      setIsImageLoading(false); // Hide our custom loader
    },
    onUploadError: (error: Error) => {
      toast(`Error uploading thumbnail: ${error.message}`);
      setIsImageLoading(false);
    },
    onUploadBegin: () => {
      setIsImageLoading(true); // Show our custom loader
    },
  });

  const generateImage = async () => {
    // This is for AI image generation, which you can implement here
  };
  
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Start the upload process using UploadThing's hook
    await startUpload(Array.from(files));
  };

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(true)}
          className={cn("", { "bg-orange-600": isAiThumbnail })}
        >
          Use AI to Generate Thumbnail
        </Button>
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(false)}
          className={cn("", { "bg-orange-600": !isAiThumbnail })}
        >
          Upload Custom Image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          {/* AI Generation UI remains the same */}
          <div className="flex flex-col gap-2.5">
            <Label className="font-semibold ">
              AI Prompt to generate Thumbnail
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-orange-500"
              placeholder="Provide text to generate thumbnail"
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="mt-5 w-full max-w-[200px]">
            <Button
              type="submit"
              className="bg-orange-600 text-white py-4 font-bold hover:bg-black cursor-pointer"
              onClick={generateImage}
            >
              {isImageLoading ? (
                <>
                  Generating
                  <Loader size={20} className="animate-spin "></Loader>
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="image_div" onClick={() => imageRef?.current?.click()}>
          <input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={uploadImage}
            accept="image/*"
          />
          {isUploading || isImageLoading ? (
            <div className="text-center">
              <Loader size={20} className="animate-spin mx-auto" />
              <p>Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/icons/upload-image.svg"
                alt="Upload"
                width={40}
                height={40}
              />
              <h2 className="text-orange-500">Click to upload</h2>
              <p className="text-sm">SVG, PNG, JPG, or GIF (max. 4MB)</p>
            </div>
          )}
        </div>
      )}
      {image && (
        <div className="flex justify-center w-full">
          <Image
            src={image}
            width={200}
            height={200}
            className="mt-5"
            alt="thumbnail"
          />
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;