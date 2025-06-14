import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GenerateThumbnailProps } from "@/Types";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { useAction, useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";

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

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getUrl);
  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction);

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage("");

    try {
      const file = new File([blob], fileName, { type: "image/png" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageLoading(false);
      toast("Thumbnail generated successfully");
    } catch (error) {
      console.log(error);
      toast("Error generating thumbnail");
    }
  };

  const generateImage = async () => {
    try {
      const response = await handleGenerateThumbnail({ prompt: imagePrompt });
      const blob = new Blob([response], { type: "image/png" });
      handleImage(blob, `thumbnail-${uuidv4()}`);
    } catch (error) {
      console.log(error);
      toast("Error generating thumbnail");
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleImage(blob, file.name);
    } catch (error) {
      console.log(error);
      toast("Error uploading image");
    }
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
        <div
          className="h-22 border-2 text-white"
          onClick={() => imageRef?.current?.click()}
        >
          <Input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />
          {!isImageLoading ? (
            <div className="flex justify-center w-full">
              <Image
                src="/icons/upload-image.svg"
                alt="Upload"
                width={40}
                height={40}
              />
            </div>
          ) : (
            <div className="">
              Uploading
              <Loader size={20} className="animate-spin ml-2" />
            </div>
          )}
          <div className="flex flex-col items-center gap-1 text-sm">
            <h2 className="text-orange-500">Click to upload</h2>
            <p>SVG, PNG, JPG or GIF (max. 1080x1080px)</p>
          </div>
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
