"use client";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { CardsContext } from "@/utils/context/FormCards";
import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormDashboard from "./Form";

const FormAdd = ({ deffault }) => {
  const { data: form_data } = useContext(CardsContext);
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
        throw new Error("isi semua field");
      }

      const req = await fetch("/api/rekamMedis", {
        method: "POST",
        body: JSON.stringify({ ...form, ...form_data }),
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
        description: "Rekam Medis berhasil ditambah",
        action: <Link href={"/dashboard"}>Cek Data</Link>,
        variant: "success",
      });
      return res;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Rekam Medis gagal ditambahkan",
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

      if (data?.message) {
        queryClient.setQueryData(["rekamMedis"], context.previousRekamMedis);
      } else {
        queryClient.setQueryData(["rekamMedis"], (prev) => [...prev, data]);
      }

      return data;
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["rekamMedis"], context.previousRekamMedis);
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["rekamMedis"] });
    },
  });

  return (
    <FormDashboard
      form={form}
      method={"POST"}
      mutate={mutate}
      title={"ADD"}
      onChange={onChange}
    />
  );
};

export default FormAdd;
