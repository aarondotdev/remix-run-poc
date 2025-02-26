import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import useGuestStore from "@/stores/guests-store";
import CreateGuestForm from "./create-guest-form";
import UpdateGuestForm from "./update-guest-form";
import CreateWalletForm from "./create-wallet-form";
import { cn } from "@/lib/utils";

type SheetContentType = {
  [key: string]: any;
};

interface SheetProps {
  player_id?: string;
}

const GuestSheet: React.FC<SheetProps> = ({ player_id }) => {
  const sheetActions = useGuestStore((state) => state.sheetActions);
  const setSheetActions = useGuestStore((state) => state.setSheetActions);

  const handleClose = () => {
    setSheetActions({ ...sheetActions, open: false });
  };

  const sheetContent: SheetContentType = {
    add: {
      title: "Add Guest",
      description: `This sheet is for adding guest. Please enter the required fields below.?`,
      form: <CreateGuestForm />,
    },
    update: {
      title: "Update Guest",
      description: "This sheet is for updating guest.",
      form: <UpdateGuestForm />,
    },
    add_wallet: {
      title: "Add Wallet",
      description: "This sheet is for adding wallet to a guest",
      form: <CreateWalletForm player_id={player_id as string} />,
    },
  };

  const isOpen =
    sheetActions.open &&
    (sheetActions.action === "add" ||
      sheetActions.action === "update" ||
      sheetActions.action === "add_wallet");

  const isActionUpdate = sheetActions.action === "update";
  const isActionAddWallet = sheetActions.action === "add_wallet";
  const isShortWidth = isActionUpdate || isActionAddWallet;

  return (
    <Sheet open={isOpen}>
      <SheetContent
        isHideCloseButton
        className={cn(
          "w-full !max-w-[600px] p-0",
          isShortWidth && "!max-w-[450px]"
        )}
        onInteractOutside={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <SheetHeader className="flex flex-row items-center justify-between p-4">
          <SheetTitle className="capitalize">
            {sheetContent[sheetActions.action]?.title}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {sheetContent[sheetActions.action]?.description}
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

        <div>{sheetContent[sheetActions.action]?.form}</div>
      </SheetContent>
    </Sheet>
  );
};

export default GuestSheet;
