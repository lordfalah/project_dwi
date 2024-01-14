"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import FormModal from "./FormModal";

const FormEdit = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: data?.name || "",
    address: data?.address || "",
    email: data?.email || "",
  });

  useEffect(() => {
    setForm({
      name: data?.name || "",
      address: data?.address || "",
      email: data?.email || "",
    });
  }, [data]);

  const { toast } = useToast();
  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, address, email } = form;
      if (!name || !address || !email) {
        throw new Error("isi semua field");
      }

      const req = await fetch(`/api/dokter/${data?.id}`, {
        method: "PATCH",
        body: JSON.stringify(form),
      });

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
        description: "Dokter berhasil di edit",
        variant: "success",
      });
      return res;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Dokter gagal ditambahkan",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
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

      queryClient.setQueryData(["dokter"], (prev) => {
        const updatedDokter = [...prev];
        const idx = prev.findIndex((p) => p.id === data?.id);
        updatedDokter[idx] = data;

        return updatedDokter;
      });
      return data;
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["dokter"], context.previousDokter);
      queryClient.invalidateQueries({ queryKey: ["dokter"] });
    },

    // Always refetch after error or success:
    onSettled: () => {},
  });

  return (
    <FormModal
      title={"Update Dokter"}
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

export default FormEdit;
