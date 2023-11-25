import {
  EditDataProps,
  useEditGameLibraryModal,
} from "@/hooks/useEditGameLibraryModal";
import Modal from "../modals/Modal";
import Image from "next/image";
import { useEffect } from "react";
import { convertScoreColor } from "@/lib/convertScoreColor";
import convertScoreToEmoji from "@/lib/convertScoreToEmoji";
import { gameProgressArray } from "@/constants/progress";
import { GameProgress } from "@/types/gameProgressType";
import { cn } from "@/lib/utils";
import { Slider } from "../ui/slider";
import * as SliderPrimitive from "@radix-ui/react-slider";

const progressColorMap = {
  wishlist: "bg-zinc-500",
  backlog: "bg-violet-700",
  play: "bg-blue-500",
  pause: "bg-yellow-600",
  beat: "bg-green-500",
  quit: "bg-red-500",
};

const EditGameLibraryModal = () => {
  const { onOpen, isOpen, onClose, editData, setEditData, data } =
    useEditGameLibraryModal();

  useEffect(() => {
    if (!data) return;
    const initialData: EditDataProps = {};
    if (data?.score_rate) {
      initialData.score = data.score_rate;
    }
    if (data?.status) {
      initialData.status = data.status as GameProgress;
    }
    if (data?.comment) {
      initialData.comment = data.comment;
    }
    if (data?.start_date) {
      initialData.startDate = data.start_date;
    }
    if (data?.finish_date) {
      initialData.endDate = data.finish_date;
    }
    setEditData(initialData);
  }, [data]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!data) return null;

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[800px] !px-10 py-10 !rounded-3xl gap-0 remove-button overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(319.38deg,#1d1e22 30%,rgba(29,30,34,.5)), url(${data?.game_meta_data.image})`,
      }}
    >
      <div className="z-10">
        <div className="flex h-[130px] mb-5">
          <Image
            src={data?.game_meta_data.image || "/avatar.jpg"}
            alt={
              data?.game_meta_data.name ||
              data?.game_meta_data.shortName ||
              "image"
            }
            width={0}
            height={0}
            sizes="100vw"
            className="w-[90px] h-[130px] object-center rounded-2xl object-cover mr-6"
          />
          <div className="h-full flex flex-col justify-center">
            <div
              className={`font-bold text-6xl mb-1 flex items-center ${
                editData && editData.score && editData.score >= 0
                  ? convertScoreColor(editData.score)
                  : "text-zinc-300"
              }`}
            >
              {editData && editData.score && editData.score >= 0
                ? editData.score
                : "NS"}
              <span className="ml-2 text-black text-5xl">
                {convertScoreToEmoji(editData?.score)}
              </span>
            </div>
            <div className="text-lg line-clamp-2 font-bold">
              {data.game_meta_data.name || data.game_meta_data.shortName}
            </div>
          </div>
        </div>
        <div className="flex w-full gap-x-5 mb-5">
          {Object.values(gameProgressArray).map((progress, index) => (
            <div
              key={index}
              className="w-full h-full rounded-full overflow-hidden"
              onClick={() => {
                setEditData({
                  ...editData,
                  status: progress as GameProgress,
                });
              }}
            >
              <button
                className={cn(
                  ` text-white backdrop-blur-xl border border-white/10 rounded-full py-[.875rem] text-xs cursor-pointer grid place-items-center outline-none hover:border-white/30 hover:bg-opacity-100 w-full`,
                  editData &&
                    editData.status &&
                    editData.status === progress &&
                    `${progressColorMap[progress]}`,
                  editData &&
                    editData.status &&
                    editData.status !== progress &&
                    "hover:bg-white/5"
                )}
              >
                {progress}
              </button>
            </div>
          ))}
        </div>
        <div className="w-full h-14 center relative rounded-2xl border-white/10 border mt-8">
          <SliderPrimitive.Root
            className={cn(
              "relative flex w-full touch-none select-none items-center z-20"
            )}
            defaultValue={[33]}
            max={100}
            step={1}
          >
            <SliderPrimitive.Thumb className="block h-10 w-10 rounded-full border-2 border-primary bg-background/80 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </SliderPrimitive.Root>
          <div className="absolute px-3 rounded-2xl items-center z-0 select-none text-white/40 left-0 top-0 right-0 bottom-0 w-full h-full flex justify-between">
            <div className="z-30 font-bold">NS</div>
            <div>
              <span className="mr-5 font-bold">Slide to rate</span>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_e, index) => (
                <span key={index} className="mr-4">
                  {">"}
                </span>
              ))}
            </div>
            <div className="z-30 font-bold">10</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditGameLibraryModal;
