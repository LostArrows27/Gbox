"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { FaShieldHalved, FaCommentDots } from "react-icons/fa6";
import { LuSwords } from "react-icons/lu";
import { useState } from "react";
import Slider from "../animations/slider";
import gameProgress from "@/constants/progress";
import { PostDataType } from "@/types/supabaseTableType";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { IoGameControllerSharp } from "react-icons/io5";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default function PostItem({
  content,
  created_at,
  event_id,
  game_name,
  game_progress,
  game_meta_data,
  user_id,
  media,
  profiles,
  title,
}: PostDataType) {
  const [status, setStatus] = useState(0);
  const handleClickDown = () => {
    if (status === -1) {
      setStatus(0);
    } else {
      setStatus(-1);
    }
  };
  const handleClickUp = () => {
    if (status === 1) {
      setStatus(0);
    } else {
      setStatus(1);
    }
  };
  return (
    <article
      className={cn(
        "w-full  rounded-[40px] flex p-6 ",
        !media ? " h-fit card-container" : "  h-80 bg-post"
      )}
    >
      <div
        className={cn(
          "2xl:w-2/5 w-1/2 gap-y-5 flex flex-col h-full pr-4",
          !media && " !w-full"
        )}
      >
        <div className="w-fit 2xl:gap-x-4 gap-x-3 flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/user/" + profiles.name}>
                  <Avatar className="2xl:w-16 2xl:h-16 h-14 w-14 border-primary border-2">
                    <AvatarImage src={profiles.avatar || " "} />
                    <AvatarFallback className=" bg-gray-700">
                      Avatar
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-home p-4">
                <div className="gap-x-2 flex">
                  <Avatar className="w-12 h-12">
                    <Link href={"/user/" + profiles.name}>
                      <AvatarImage src={profiles.avatar || " "} />{" "}
                    </Link>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="gap-y-2">
                    <p className="">{profiles.name}</p>
                    <span className="text-muted-foreground italic">
                      {profiles.location}
                    </span>
                  </div>
                </div>
                {/* <div className="flex mt-3 font-bold">{Object.values(profiles.gaming_platform).map((item,ind)  => {
                  return {
                    item.
                  }
                })
                </div> */}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="justify-evenly relative inline-flex flex-col">
            <div className="bg-primary rounded-3xl inline-flex items-center w-full px-3 py-1 select-none">
              {game_progress ? (
                gameProgress[game_progress as keyof typeof gameProgress].icon(
                  "w-3 h-3 ",
                  "2xl:w-5 2xl:h-5 h-4 w-4 mr-2"
                )
              ) : (
                <IoGameControllerSharp
                  className={" 2xl:w-5 2xl:h-5 h-4 w-4 mr-2 text-muted"}
                />
              )}{" "}
              {game_name ? (
                <Link
                  target="_blank"
                  href={"https://www.ign.com" + Object(game_meta_data).url}
                  className="2xl:text-base line-clamp-1 text-sm"
                >
                  {game_name}
                </Link>
              ) : (
                <p className="2xl:text-base line-clamp-1 text-sm">
                  Gbox Sharing
                </p>
              )}
            </div>
            <p className="text-muted-foreground 2xl:text-base inline-flex mt-2 text-sm italic">
              {dayjs(created_at).fromNow()}
            </p>
          </div>
        </div>
        <div className="gap-x-3 gap-y-3 flex flex-col">
          <h2 className="text-xl font-bold">{title}</h2>
          <p
            className={cn(
              "text-muted-foreground font-bold leading-5 ",
              !media ? " " : " line-clamp-3"
            )}
          >
            {content}
          </p>
        </div>
        <div className={cn(" mt-auto flex h-8 gap-x-2 ")}>
          <div className="xl:flex relative hidden w-16 h-8">
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              priority
              className=" border-primary absolute top-0 left-0 w-8 h-8 border-2 rounded-full"
            />
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              priority
              className=" left-4 border-primary absolute top-0 w-8 h-8 border-2 rounded-full"
            />
            <Image
              src={"/images/login-bg.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="hello"
              priority
              className=" left-8 border-primary absolute top-0 w-8 h-8 border-2 rounded-full"
            />
          </div>
          <div
            className={cn(
              "flex text-muted rounded-3xl  overflow-hidden items-center relative bg-white ",
              status === 0
                ? " bg-white"
                : status === 1
                ? "bg-primary text-white"
                : "bg-red-400 text-white"
            )}
          >
            <button
              onClick={handleClickUp}
              className=" 2xl:text-xl group/up flex items-center justify-center h-full px-2 text-lg cursor-pointer"
            >
              <div className="absolute top-0 left-0 h-full opacity-0 font-bold text-white 2xl:text-base text-sm flex justify-center items-center w-0 group-hover/up:w-full !bg-primary duration-500 group-hover/up:opacity-100">
                Win
              </div>
              <LuSwords />
            </button>
            <p className=" 2xl:text-base flex items-center justify-center h-full text-sm">
              {10000 + status}
            </p>
            <button
              onClick={handleClickDown}
              className=" 2xl:text-xl group/down flex items-center justify-center h-full px-2 text-lg cursor-pointer"
            >
              <div className="group-hover/down:w-full group-hover/down:opacity-100 absolute top-0 right-0 flex items-center justify-center w-0 h-full text-base font-bold text-white duration-500 bg-red-400 opacity-0">
                Lose
              </div>
              <FaShieldHalved />
            </button>
          </div>
          <button className="text-muted hover:bg-primary rounded-3xl 2xl:text-xl gap-x-2 flex items-center justify-center px-2 text-lg duration-500 bg-white">
            <FaCommentDots />
            <span className="2xl:text-base text-sm">100</span>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-muted rounded-[40px] justify-center flex  overflow-hidden">
        {media && media.type === "image" && (
          <Slider
            className=" w-full h-full"
            delay={5000}
            loop={media.url.length > 1}
          >
            {media.url.map((item, ind) => {
              return (
                <div
                  key={ind}
                  className="keen-slider__slide w-full h-full rounded-[40px] flex justify-center bg-muted"
                >
                  <Image
                    src={item}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="hello"
                    className=" object-cover w-auto h-full"
                  />
                </div>
              );
            })}
          </Slider>
        )}
        {media && media.type === "video" && (
          <video
            className="object-cover w-full h-full"
            src={media.url[0]}
            controls
          ></video>
        )}
      </div>
    </article>
  );
}
