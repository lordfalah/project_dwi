"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardsContext } from "@/utils/context/FormCards";
import { useContext, useEffect, useState } from "react";

export function CardObat({ obats, deffault }) {
  const [obat, setObat] = useState(null);
  const { setData } = useContext(CardsContext);

  useEffect(() => {
    let defaultName = obat?.name ? obat?.name : deffault?.name || "";
    let defaultHarga = obat?.harga ? obat?.harga : deffault?.harga || "";
    let defaultJumlah = obat?.jumlah ? obat?.jumlah : deffault?.jumlah || "";
    let defaultUkuran = obat?.ukuran ? obat?.ukuran : deffault?.ukuran || "";
    let defaultKeterangan = obat?.keterangan
      ? obat?.keterangan
      : deffault?.keterangan || "";
    setObat({
      name: defaultName,
      harga: defaultHarga,
      jumlah: defaultJumlah,
      ukuran: defaultUkuran,
      keterangan: defaultKeterangan,
    });
    setData((prev) => ({ ...prev, obatId: deffault?.id || "" }));
  }, []);

  return (
    <Card className="w-full sm:w-[350px]">
      <CardHeader>
        <CardTitle>Data obat</CardTitle>
        <CardDescription>Pilih daftar obat</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="obat" className="text-black">
                obat *
              </Label>
              <Select
                id="obat"
                onValueChange={(data) => {
                  setObat(data);
                  setData((prev) => ({ ...prev, obatId: data?.id }));
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={obat?.name ? obat?.name : "Pilih obat"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>obat</SelectLabel>
                    {obats.map((data) => (
                      <SelectItem key={data?.id} value={data}>
                        {data?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name obat"
                disabled
                defaultValue={obat?.name}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="harga">Harga</Label>
              <Input
                id="harga"
                placeholder="harga"
                disabled
                defaultValue={obat?.harga}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="jumlah">Jumlah</Label>
              <Input
                id="jumlah"
                placeholder="jumlah"
                disabled
                defaultValue={obat?.jumlah}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ukuran">Ukuran</Label>
              <Input
                id="ukuran"
                placeholder="ukuran"
                disabled
                defaultValue={obat?.ukuran}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="keterangan">Keterangan</Label>
              <Input
                id="keterangan"
                placeholder="keterangan"
                disabled
                defaultValue={obat?.keterangan}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
