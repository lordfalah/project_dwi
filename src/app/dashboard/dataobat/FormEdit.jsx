"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import FormModal from "./FormModal";

export const FormEdit = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: data?.name || "",
    jumlah: data?.jumlah || "",
    ukuran: data?.ukuran || "",
    harga: data?.harga || "",
    keterangan: data?.keterangan || "",
  });

  useEffect(() => {
    setForm({
      name: data?.name || "",
      jumlah: data?.jumlah || "",
      ukuran: data?.ukuran || "",
      harga: data?.harga || "",
      keterangan: data?.keterangan || "",
    });
  }, [data]);

  const { toast } = useToast();
  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, jumlah, ukuran, harga, keterangan } = form;
      if (!name || !jumlah || !ukuran || !harga || !keterangan) {
        throw new Error("isi semua field");
      }

      const req = await fetch(`/api/obat/${data?.id}`, {
        method: "PATCH",
        body: JSON.stringify(form),
      });

      if (!req.ok) throw new Error(req.statusText || "");

      const res = await req.json();

      setOpen(false);
      setForm((prev) => ({
        ...prev,
        name: "",
        jumlah: "",
        ukuran: "",
        harga: "",
        keterangan: "",
      }));

      toast({
        title: "Success",
        description: "Obat berhasil di edit",
        variant: "success",
      });
      return res;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Obat gagal ditambahkan",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation({
    mutationFn: handleSubmit,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["obat"] });
      const previousObat = queryClient.getQueryData(["obat"]);
      return { previousObat };
    },

    onSuccess: (data, variables, context) => {
      // Optimistically update to the new value

      queryClient.setQueryData(["obat"], (prev) => {
        const updatedobat = [...prev];
        const idx = prev.findIndex((p) => p.id === data?.id);
        updatedobat[idx] = data;

        return updatedobat;
      });
      return data;
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["obat"], context.previousObat);
      queryClient.invalidateQueries({ queryKey: ["obat"] });
    },
  });
  return (
    <FormModal
      title={"Update Obat"}
      method={"PATCH"}
      onChange={onChange}
      submitForm={mutate}
      setForm={setForm}
      form={form}
      setOpen={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        <Edit className="cursor-pointer" onClick={() => setOpen(true)} />
      </DialogTrigger>
    </FormModal>
  );
};
