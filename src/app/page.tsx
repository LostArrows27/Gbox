"use client";

import { Button } from "@/components/ui/button";
import useInformationModal from "@/hooks/useInformationModal";
import { getAllTopGame } from "@/services/client/rawgClientService";
import { useEffect } from "react";

export default function Home() {
  const { onClose, onOpen } = useInformationModal();

  useEffect(() => {
    const getAll = async () => {
      const result = await getAllTopGame();
      console.log(result);
    };

    getAll();
  }, []);

  return (
    <main className="bg-home flex flex-col items-center justify-between w-full min-h-screen p-24 bg-white">
      <Button onClick={onOpen}>Open Modal</Button>
    </main>
  );
}
