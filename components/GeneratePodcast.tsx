import { GeneratePodcastProps } from "@/Types";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {v4 as uuidv4} from 'uuid';
import { generateUploadUrl } from "./files";

import {useUploadFiles} from '@xixixao/uploadstuff/react'


const useGeneratePodcast = ({
  setAudio, voiceType, voicePrompt, setAudioStorageId
}: GeneratePodcastProps) =>{
  const [isGenerating, setIsGenerating] = useState(false)

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const {startUpload} = useUploadFiles(generateUploadUrl)

  const getPodcastAudio = useAction(api.openai.generateAudioAction)

  const generatePodcast = async () => {
    setIsGenerating(true)

    setAudio('')

    if(!voicePrompt){
      // note: toast error message
      return setIsGenerating(false)
    }

    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt
      })
      const blob = new Blob([response], {type: 'audio/mpeg'})
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, {type: 'audio/mpeg'})

      const uploaded = await startUpload([file])
      const storageId = (uploaded[0].response as any).storageId

      setAudioStorageId(storageId)

      const audioUrl = await getAudioUrl({ storageId})
    } catch (error) {
      console.log('Error generating podcast', error)
      // note: show error message
      setIsGenerating(false)
    }

  }
  return{
    isGenerating,generatePodcast
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
