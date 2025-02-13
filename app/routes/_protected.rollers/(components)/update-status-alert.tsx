"use client";
import { Button } from "~/components/ui/button";

import { useToast } from "~/components/ui/use-toast";

import useRollertore from "~/stores/roller-store";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
import React, { useState } from "react";
import ErrorMessage from "~/components/shared/error-message";
import { Modal } from "~/components/shared/modal";
import { useUserContext } from "~/context/user-provider";
import { useEnvironmentProvider } from "~/context/environment-provider";
import { useRevalidator } from "@remix-run/react";

function UpdateStatusAlert() {
  const user = useUserContext();
  const statusData = useRollertore((state) => state.statusData);
  const setStatusData = useRollertore((state) => state.setStatusData);
  const isAlertOpen = !!statusData?.open && !!statusData.id;
  const onClose = () => {
    setStatusData({ open: false, id: "", is_active: false });
  };

  const revalidator = useRevalidator();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const env = useEnvironmentProvider();

  async function onSubmit() {
    const updateUrl = `${env.API_BASE_URL}/admin/rollers/${statusData?.id}`;
    const payload = {
      is_active: !statusData?.is_active,
    };

    axios
      .put(updateUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        revalidator.revalidate();

        toast({
          variant: "default",
          title: "Success",
          description: response?.data?.message,
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: <ErrorMessage errors={error.response.data.error} />,
        });
      })
      .finally(() => {
        setIsUpdating(false);
        onClose();
      });
  }

  return (
    <Modal
      title="Are you sure you want to update status?"
      description=""
      isOpen={isAlertOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={isUpdating} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isUpdating} variant="default" onClick={onSubmit}>
          {isUpdating ? (
            <LoaderIcon className="animate-spin repeat-infinite" />
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </Modal>
  );
}

export default UpdateStatusAlert;
