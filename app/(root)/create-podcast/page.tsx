"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx']

const CreatePodcast = () => {
  const [voiceType, setVoiceType] = useState<string | null> (null)


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-gray-400">Username</FormLabel>
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

            <div className="flex flex-col gap-2.5">
              <Label className="text-gray-400">Select AI Voice</Label>
              <Select>
                <SelectTrigger className={cn('w-full border-none bg-black text-gray-400')}>
                  <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-400"/>
                </SelectTrigger>
                <SelectContent className="border-none bg-gray-300 font-semibold text-white focus:ring-orange-500">
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
                  className=""
                  />
                )}
              </Select>
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
