"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
});

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx']

const CreatePodcast = () => {
  const router = useRouter()
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageUrl, setImageUrl] = useState('');
  
  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioDuration, setAudioDuration] = useState(0);
  
  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPodcast = useMutation(api.podcasts.createPodcast)

 // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if(!audioUrl || !imageUrl || !voiceType) {
        toast('Please generate audio and image')
        setIsSubmitting(false);
        throw new Error('Please generate audio and image')
      }

      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt,
        views: 0,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
      })
      toast('Podcast created')
      setIsSubmitting(false);
      router.push('/')
    } catch (error) {
      console.log(error);
      toast('Error')
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-2xl font-bold">Create Podcast</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-gray-600 mb-2 pb-10">
            {/* Username 👇 */}
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-gray-400">Title</FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-orange-200"
                      placeholder="Radio Cast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-gray-400" />
                </FormItem>
              )}
            />
            {/* Voice selection 👇 */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-gray-400">Select AI Voice</Label>
              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger className={cn('w-full border-none bg-black text-gray-400')}>
                  <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-400"/>
                </SelectTrigger>
                <SelectContent className="border-none bg-gray-800 font-semibold text-white focus:ring-orange-500">
                  {voiceCategories.map
                    ((category) => (
                      <SelectItem key={category} value={category} className="capitalize focus:bg-orange-500">
                        {category}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
                {voiceType && (
                  <audio
                  src={`/${voiceType}.mp3`} autoPlay 
                  className="hidden"
                  />
                )}
              </Select>
            </div>
            {/* Description 👇 */}
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-gray-400">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-orange-200"
                      placeholder="Write a short podcast description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-gray-400" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast 
            setAudioStorageId={setAudioStorageId}
            setAudio={setAudioUrl}
            voiceType={voiceType!}
            audio={audioUrl}
            voicePrompt={voicePrompt}
            setVoicePrompt={setVoicePrompt}
            setAudioDuration={setAudioDuration}
            />

            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />

            <div className="mt-10 w-full">
              <Button type="submit" className="w-full bg-orange-600 text-white py-4 font-bold transition-all
               duration-500 hover:bg-black cursor-pointer">
                {isSubmitting ? (
                  <>
                  Submitting
                  <Loader size={20} className="animate-spin "></Loader>
                  </>
                ) : (
                  'Submit & Publish Podcast'
                )}
               </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
