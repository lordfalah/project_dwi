"use client";
import Link from "next/link";
import { CardsContext } from "@/utils/context/FormCards";
import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormDashboard from "./Form";
import { useToast } from "@/components/ui/use-toast";

const FormEdit = ({ deffault, params }) => {
  const { data: allID } = useContext(CardsContext);
  const { toast } = useToast();
  const [form, setForm] = useState({
    resep: deffault?.resep || "",
    diagnosa: deffault?.diagnosa || "",
    keluhan: deffault?.keluhan || "",
    keterangan: deffault?.keterangan || "",
  });

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { resep, diagnosa, keluhan, keterangan } = form;
      if (!resep || !diagnosa || !keluhan || !keterangan) {
        return null;
      }

      //   console.log(deffault);

      const req = await fetch(`/api/rekamMedis/${params}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...form,
          ...allID,
        }),
      });

      if (!req.ok) throw new Error(req.statusText || "");

      const res = await req.json();
      setForm((prev) => ({
        ...prev,
        resep: "",
        diagnosa: "",
        keluhan: "",
        keterangan: "",
      }));

      toast({
        title: "Success",
        description: "Rekam Medis berhasil edit",
        action: <Link href={"/dashboard"}>Cek Data</Link>,
      });
      return res;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Rekam Medis gagal edit",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation({
    mutationFn: handleSubmit,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["rekamMedis"] });
      const previousRekamMedis = queryClient.getQueryData(["rekamMedis"]);
      return { previousRekamMedis };
    },

    onSuccess: (data, variables, context) => {
      // Optimistically update to the new value

      queryClient.setQueryData(["rekamMedis"], (prev) => {
        const updatedrekamMedis = [...prev];
        const idx = prev.findIndex((p) => p.id === data?.id);
        updatedrekamMedis[idx] = data;

        return updatedrekamMedis;
      });
      return data;
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["rekamMedis"], context.previousRekamMedis);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["rekamMedis"] });
    },
  });

  return (
    <FormDashboard
      form={form}
      method={"PATCH"}
      mutate={mutate}
      title={"UPDATE"}
      onChange={onChange}
    />
  );
};

export default FormEdit;
