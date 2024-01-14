"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormModal from "./FormModal";

const DialogFormDokter = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
  });

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, address, email } = form;
      if (!name || !address || !email) {
        throw new Error("isi semua field");
      }

      const req = await fetch("/api/dokter", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (!req.ok) throw new Error(req.statusText || "");
      const res = await req.json();

      setOpen(false);
      setForm((prev) => ({
        ...prev,
        name: "",
        address: "",
        email: "",
      }));

      toast({
        title: "Success",
        description: "Dokter berhasil ditambah",
        variant: "success",
      });
      return res;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Dokter gagal ditambahkan",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return error;
    }
  };

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation({
    mutationFn: handleSubmit,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["dokter"] });
      const previousDokter = queryClient.getQueryData(["dokter"]);
      return { previousDokter };
    },

    onSuccess: (data, variables, context) => {
      // Optimistically update to the new value

      if (data?.message) {
        queryClient.setQueryData(["dokter"], context.previousDokter);
      } else {
        queryClient.setQueryData(["dokter"], (prev) => [...prev, data]);
      }

      return data;
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["dokter"], context.previousDokter);
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["dokter"] });
    },
  });

  return (
    <FormModal
      title={"Add Dokter"}
      method={"POST"}
      onChange={onChange}
      submitForm={mutate}
      setForm={setForm}
      form={form}
      setOpen={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-r from-violet-600 to-blue-500 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          Create
        </Button>
      </DialogTrigger>
    </FormModal>
  );
};

export default DialogFormDokter;
