import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import CreateUserForm from "./create-user-form";
import UpdateUserForm from "./update-user-form";
import useUserStore from "@/stores/user-store";

function UserSheet() {
  type SheetContentType = {
    [key: string]: any;
  };

  const sheetContent: SheetContentType = {
    add: {
      title: "Add User",
      description: `This sheet is for adding user`,
      form: <CreateUserForm />,
    },
    update: {
      title: "Update User",
      description: "This sheet is for updating user.",
      form: <UpdateUserForm />,
    },
  };

  const sheetActions = useUserStore((state) => state.sheetActions);
  const setSheetActions = useUserStore((state) => state.setSheetActions);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);

  const handleClose = () => {
    setSheetActions({ ...sheetActions, open: false });
    setSelectedUser(undefined);
  };

  const isOpen =
    (sheetActions.action === "add" || sheetActions.action === "update") &&
    !!sheetActions.open;

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
        {sheetContent[sheetActions.action]?.form}
      </SheetContent>
    </Sheet>
  );
}

export default UserSheet;
