import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { DialogTrigger } from "@/components/ui/dialog";
import FormModal from "./FormModal";
import { Button } from "@/components/ui/button";

const DialogFormObat = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    jumlah: "",
    ukuran: "",
    harga: "",
    keterangan: "",
  });

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, ukuran, harga, keterangan } = form;
      if (!name || !ukuran || !harga || !keterangan) {
        throw new Error("isi semua field");
      }

      const req = await fetch("/api/obat", {
        method: "POST",
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
        description: "Obat berhasil ditambah",
        variant: "success",
      });
      return res;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Obat gagal ditambahkan",
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
      await queryClient.cancelQueries({ queryKey: ["obat"] });
      const previousObat = queryClient.getQueryData(["obat"]);
      return { previousObat };
    },

    onSuccess: (data, variables, context) => {
      // Optimistically update to the new value

      if (data?.message) {
        queryClient.setQueryData(["obat"], context.previousObat);
      } else {
        queryClient.setQueryData(["obat"], (prev) => [...prev, data]);
      }

      return data;
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["obat"], context.previousObat);
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["obat"] });
    },
  });

  return (
    <FormModal
      title={"Add Obat"}
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

export default DialogFormObat;
