import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import CreateCashierForm from "./create-cashier-form";
import useCashierStore from "~/stores/cashier-store";

function CashierSheet() {
  type SheetContentType = {
    [key: string]: any;
  };

  const sheetActions = useCashierStore((state) => state.sheetActions);
  const setSheetActions = useCashierStore((state) => state.setSheetActions);

  const handleClose = () => {
    setSheetActions({ ...sheetActions, open: false });
  };

  const isOpen =
    (sheetActions.action === "add" || sheetActions.action === "update") &&
    !!sheetActions.open;

  const sheetContent: SheetContentType = {
    add: {
      title: "Add Cashier",
      description: "This sheet is for adding cashier",
      form: <CreateCashierForm />,
    },
    update: {
      title: "Update Cashier",
      description: "This sheet is for updating cashier.",
      // form: <UpdateCashierForm />,
    },
  };

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

export default CashierSheet;
