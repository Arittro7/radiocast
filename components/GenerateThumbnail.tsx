import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GenerateThumbnailProps } from "@/Types";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const generateImage = async () => {};

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
        <div className="h-10 border-2 text-white" onClick={() => imageRef?.current?.click()}>
          <Input 
            type="file"
            className="hidden"
            ref={imageRef}
          />
          {!isImageLoading ? (
            <div className="flex justify-center w-full">
              <Image src="/icons/upload-image.svg" alt="Upload" width={40} height={40} />
            </div>
          ) : (
            <div>
              <Loader size={20} className="animate-spin"/>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;
