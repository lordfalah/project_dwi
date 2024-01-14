"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormModal from "./FormModal";

const DialogFormPasien = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    gejala: "",
  });

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, age, gender, address, gejala } = form;
      if (!name || !age || !gender || !address || !gejala) {
        throw new Error("isi semua field");
      }

      const req = await fetch("/api/pasien", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (!req.ok) throw new Error(req.statusText || "");

      const res = await req.json();

      setOpen(false);
      setForm((prev) => ({
        ...prev,
        name: "",
        age: "",
        gender: "",
        address: "",
        gejala: "",
      }));

      toast({
        title: "Success",
        description: "Pasien berhasil ditambah",
        variant: "success",
      });
      return res;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Pasien gagal ditambahkan",
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
      await queryClient.cancelQueries({ queryKey: ["pasien"] });
      const previousPasien = queryClient.getQueryData(["pasien"]);
      return { previousPasien };
    },

    onSuccess: (data, variables, context) => {
      // Optimistically update to the new value

      if (data?.message) {
        queryClient.setQueryData(["pasien"], context.previousPasien);
      } else {
        queryClient.setQueryData(["pasien"], (prev) => [...prev, data]);
      }

      return data;
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["pasien"], context.previousPasien);
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pasien"] });
    },
  });

  return (
    <FormModal
      title={"Add Pasien"}
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

export default DialogFormPasien;
