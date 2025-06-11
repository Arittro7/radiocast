import { GeneratePodcastProps } from "@/Types";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

const useGeneratePodcast = (props: GeneratePodcastProps) =>{
  // note: logic for generate podcast
  return{
    isGenerating : false,
    generatePodcast: () =>{}
  }
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const {isGenerating, generatePodcast} = useGeneratePodcast(props)
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="font-semibold ">
          AI Prompt to generate Podcast
        </Label>
        <Textarea
         className="input-class font-light focus-visible:ring-orange-500"
         placeholder="Provide text to generate audio"
         rows={5}
         value={props.voicePrompt}
         onChange={(e) => props.setVoicePrompt(e.target.value)}
         />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button type="submit" className="bg-orange-600 text-white py-4 font-bold hover:bg-black cursor-pointer">
                {isGenerating ? (
                  <>
                  Generating
                  <Loader size={20} className="animate-spin "></Loader>
                  </>
                ) : (
                  'Generate'
                )}
               </Button>
      </div>
      { props.audio && (
        <audio
         controls
         src={props.audio}
         autoPlay
         className="mt-5"
         onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
