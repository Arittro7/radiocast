import { PodcastCardProps } from "@/Types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const PodcastCard = ({
  imgUrl,
  title,
  description,
  podcastId,
}: PodcastCardProps) => {
  const router = useRouter();

  const handleViews = () => {
    // increase views

    router.push(`/podcasts/${podcastId}`, {
      scroll: true,
    });
  };

  return (
    <div className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl}
          width={174}
          height={174}
          alt={title}
          className=" h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col">
          <h1 className="truncate font-bold text-white-1">{title}</h1>
          <h2 className=" truncate font-normal capitalize ">{description}</h2>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCard;
