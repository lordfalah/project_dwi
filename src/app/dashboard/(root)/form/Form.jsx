"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormDashboard = ({ mutate, method, title, onChange, form }) => {
  return (
    <form onSubmit={mutate} method={method} className="space-y-6">
      <h2 className="font-semibold text-2xl">Note</h2>

      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-full md:col-span-4 xl:col-span-2">
          <Label htmlFor="resep">resep</Label>
          <Input
            className="py-8"
            type="text"
            id="resep"
            placeholder="resep"
            required
            name="resep"
            value={form?.resep}
            onChange={onChange}
          />
        </div>

        <div className="col-span-full md:col-span-4 xl:col-span-2">
          <Label htmlFor="keluhan">keluhan</Label>
          <Input
            className="py-8"
            type="text"
            id="keluhan"
            placeholder="keluhan"
            required
            name="keluhan"
            value={form?.keluhan}
            onChange={onChange}
          />
        </div>

        <div className="col-span-full md:col-span-4 xl:col-span-2">
          <Label htmlFor="diagnosa">diagnosa</Label>
          <Input
            className="py-8"
            type="text"
            id="diagnosa"
            placeholder="diagnosa"
            required
            name="diagnosa"
            value={form?.diagnosa}
            onChange={onChange}
          />
        </div>

        <div className="col-span-full md:col-span-4 xl:col-span-2">
          <Label htmlFor="keterangan">keterangan</Label>
          <Input
            className="py-8"
            type="text"
            id="keterangan"
            placeholder="keterangan"
            required
            name="keterangan"
            value={form?.keterangan}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="w-full flex justify-end">
        <Button
          className="bg-gradient-to-r from-violet-600 to-blue-500 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
          type="submit"
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default FormDashboard;
