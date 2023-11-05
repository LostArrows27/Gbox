"use client";

import useMessageBox from "@/hooks/useMessageBox";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { MessageHeadType, MessageType } from "@/types/supabaseTableType";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Dot, Play } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { useTypingIndicator } from "@/hooks/useTypingDictator";
import IsTyping from "./is-typing-ui";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export default function MessageHead({
  messageHead,
  setPosition,
}: {
  messageHead: MessageHeadType;
  setPosition: React.Dispatch<React.SetStateAction<MessageHeadType[]>>;
}) {
  const { setCurrentMessage, currentMessage } = useMessageBox((set) => set);
  const { user, userDetails } = useUser();
  const { supabaseClient } = useSessionContext();
  const [latestMsg, setLatestMsg] = useState<MessageType | undefined>();
  const [unread, setUnread] = useState(false);
  const { isTyping, setRoomName } = useTypingIndicator({
    userAva:"/images/avatar.png",
  });

  useEffect(() => {
    console.log(isTyping)
  }, [isTyping])
  useEffect(() => {
    let newRoom = userDetails!.name + messageHead.name;
    newRoom = newRoom.split("").sort().join("");
    setRoomName(newRoom);
    const channel = supabaseClient
      .channel(`realtime ${newRoom}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `sender_id=in.(${user?.id},${messageHead.id})`,
        },
        async (payload) => {
          if (
            payload.new.receiver_id === user?.id ||
            payload.new.receiver_id === messageHead.id
          ) {
            console.log(currentMessage?.id, messageHead.id, "unread");
            if (currentMessage?.id !== messageHead.id) {
              setUnread(true);
            }

            setLatestMsg(payload.new as MessageType);
            setPosition((prev) => {
              const index = prev.findIndex(
                (item) => item.id === messageHead.id
              );
              const newPrev = [...prev];
              newPrev.splice(index, 1);
              return [messageHead, ...newPrev];
            });
          }
        }
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [messageHead, currentMessage]);

  useEffect(() => {
    if (currentMessage?.id === messageHead.id) {
      setUnread(false);
    }
  }, [currentMessage]);

  return (
    <div
      onClick={() => {
        setCurrentMessage(messageHead);
      }}
      className="border-b-2 border-muted  cursor-pointer"
    >
      <div
        className={cn(
          "py-3 px-[10px] flex  rounded-xl    ",
          currentMessage?.id === messageHead.id && "card-container"
        )}
      >
        <div className="flex flex-1">
          <div id="Image" className="h-full rounded-full flex items-center">
            <Image
              src={messageHead.avatar || "/image 1.png"}
              alt="image"
              width={1000}
              height={1000}
              className="rounded-full h-[50px] w-[50px] object-cover border-2 border-primary"
            />
          </div>

          <div className="h-full flex justify-center items-center ml-2">
            <div className="h-[60px] flex flex-col justify-center pr-4">
              <p className="font-semibold text-lg">{messageHead.name}</p>
              <p
                className={cn(
                  "w-full text-sm text-muted-foreground line-clamp-1",
                  unread && "text-white"
                )}
              >
                {!isTyping ? (
                  latestMsg ? (
                    latestMsg?.content ? (
                      latestMsg.content
                    ) : (
                      "sent new message "
                    )
                  ) : (
                    messageHead.content || "media message "
                  )
                ) : (
                  <>
                    <IsTyping />
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div
          id="Time"
          className="flex items-center justify-center w-[52px] text-xs relative "
        >
          {unread ? (
            <Dot className="text-primary absolute  h-20 w-20" />
          ) : (
            dayjs(
              latestMsg?.created_at
                ? latestMsg.created_at
                : messageHead.message_time
            ).format("LT")
          )}
        </div>
      </div>
    </div>
  );
}
