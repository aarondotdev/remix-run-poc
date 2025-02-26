"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

import CreateGameTypeForm from "./create-game-type-form";
import UpdateGameTypeForm from "./update-game-type-form";
import useGameTypeStore from "@/stores/game-type-store";

type SheetContentType = {
  [key: string]: any;
};

const sheetContent: SheetContentType = {
  add: {
    title: "Add Game Type",
    description: `This sheet is for adding agent`,
    form: <CreateGameTypeForm />,
  },
  update: {
    title: "Update Game Type",
    description: "This sheet is for updating agent.",
    form: <UpdateGameTypeForm />,
  },
};

function GameTypeSheet() {
  const sheetActions = useGameTypeStore((state) => state.sheetActions);
  const setSheetActions = useGameTypeStore((state) => state.setSheetActions);

  const handleClose = () => {
    setSheetActions({ ...sheetActions, open: false });
  };

  const isOpen =
    (sheetActions.action === "add" || sheetActions.action === "update") &&
    sheetActions.open;

  return (
    <Sheet open={isOpen}>
      <SheetContent
        isHideCloseButton
        className="p-0"
        onInteractOutside={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <SheetHeader className="flex flex-row items-center justify-between p-4">
          <SheetTitle className="capitalize">
            {sheetContent[sheetActions.action].title}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {sheetContent[sheetActions.action].description}
          </SheetDescription>
          <Button
            size="icon"
            variant="link"
            onClick={handleClose}
            className="!m-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          >
            <Cross2Icon className="h-4 w-4 text-foreground" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>
        {sheetContent[sheetActions.action].form}
      </SheetContent>
    </Sheet>
  );
}

export default GameTypeSheet;
