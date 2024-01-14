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
    age: data?.age || "",
    gender: data?.gender || "",
    address: data?.address || "",
    gejala: data?.gejala || "",
  });

  useEffect(() => {
    setForm({
      name: data?.name || "",
      age: data?.age || "",
      gender: data?.gender || "",
      address: data?.address || "",
      gejala: data?.gejala || "",
    });
  }, [data]);

  const { toast } = useToast();
  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, age, gender, address, gejala } = form;
      if (!name || !age || !gender || !address || !gejala) {
        throw new Error("isi semua field");
      }

      const req = await fetch(`/api/pasien/${data?.id}`, {
        method: "PATCH",
        body: JSON.stringify(form),
      });

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
        description: "Pasien berhasil di edit",
        variant: "success",
      });
      return res;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Pasien gagal ditambahkan",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
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

      queryClient.setQueryData(["pasien"], (prev) => {
        const updatedPasien = [...prev];
        const idx = prev.findIndex((p) => p.id === data?.id);
        updatedPasien[idx] = data;

        return updatedPasien;
      });
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
      title={"Update Pasien"}
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
