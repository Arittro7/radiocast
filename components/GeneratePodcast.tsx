import { GeneratePodcastProps } from "@/Types";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useUploadThing } from "@/lib/uploadthing";

const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt,
  setAudioStorageId, // This is no longer needed with UploadThing but we keep it for prop compatibility
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Use the UploadThing hook for file uploads
  const { startUpload } = useUploadThing("audioUploader", { // Assuming you have an "audioUploader" route
    onClientUploadComplete: (res) => {
      const fileUrl = res?.[0]?.url;
      if (fileUrl) {
        setAudio(fileUrl);
        toast("Podcast generated and uploaded successfully!");
      }
      setIsGenerating(false);
    },
    onUploadError: (error: Error) => {
      console.log("Error uploading audio", error);
      toast(`Error uploading audio: ${error.message}`);
      setIsGenerating(false);
    },
  });

  const getPodcastAudio = useAction(api.openai.generateAudioAction);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio(""); // Clear previous audio

    if (!voicePrompt) {
      toast.error("Please provide a voice prompt to generate a podcast.");
      setIsGenerating(false);
      return;
    }

    try {
      // 1. Generate audio from OpenAI
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });

      if (!response) {
        throw new Error("Failed to generate audio.");
      }

      const blob = new Blob([response], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });

      // 2. Start the upload process with UploadThing
      await startUpload([file]);

    } catch (error) {
      console.error("Error generating podcast:", error);
      toast.error("Error creating a podcast. Please try again.");
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generatePodcast,
  };
};


// Main component that renders the UI
const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-lg font-bold text-white-1">
          AI Prompt to generate Podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Provide text to generate audio"
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16 bg-orange-1 py-4 font-bold text-white-1"
          onClick={generatePodcast}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              Generating
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) =>
            props.setAudioDuration(e.currentTarget.duration)
          }
        />
      )}
    </div>
  );
};

export default GeneratePodcast;