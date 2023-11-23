"use client";
import { CgChevronDoubleLeft } from "react-icons/cg";
import { RiSwordFill } from "react-icons/ri";
import RoomItem from "./room-item";
import Modal from "../modals/Modal";
import useRoomLobby from "@/hooks/useRoomLobby";
import { cn } from "@/lib/utils";
import useMatchingOptions from "@/hooks/useMatchingOptions";

export default function RoomLobbyModal() {
  const { isOpen, onClose } = useRoomLobby((set) => set);
  const { onOpen: openMatchingOptions } = useMatchingOptions((set) => set);
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className={cn(
        "max-w-[80vw] p-0  h-[90vh] justify-evenly flex  border-primary border-4 bg-transparent  !rounded-3xl remove-button"
      )}
    >
      <section className=" p-4 m-2 bg-layout w-full flex flex-col rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              onClose();
              openMatchingOptions();
            }}
            className="text-7xl text-primary"
          >
            <CgChevronDoubleLeft />
          </button>
          <h2 className=" w-full text-5xl text-center font-bold super">
            Gbox&apos;s Rooms
          </h2>
          <button className="text-5xl text-primary">
            <RiSwordFill />
          </button>
        </div>
        <div className="grid flex-1 xl:grid-cols-3 grid-cols-2 gap-10 mb-6 px-10 overflow-y-scroll scrollbar py-4">
          {/* <div className=" relative    round-parent shadow-2xl ">
            <div className="rectangle pl-20 h-40 w-[400px] bg-post  ">
              <div className="flex">
                <div className="rounded-full w-16 h-16 bg-home"></div>
                <p className="text-white text-2xl ">MinhMatMong</p>
              </div>
            </div>
          </div> */}
          <RoomItem status="matching" />  
          <RoomItem status="idle" />
          <RoomItem status="matching" />
          <RoomItem status="idle" />
          <RoomItem status="matching" />
          <RoomItem status="matching" />

          <RoomItem status="matching" />
          <RoomItem status="matching" />
          <RoomItem status="matching" />
          <RoomItem status="matching" />

          <RoomItem status="matching" />
        </div>
        {/* <svg
          style={{ visibility: "hidden", position: "absolute" }}
          width="0"
          height="0"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs>
            <filter id="round">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="8"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="flt_tag"
              />
              <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
            </filter>
          </defs>
        </svg> */}
      </section>
    </Modal>
  );
}
