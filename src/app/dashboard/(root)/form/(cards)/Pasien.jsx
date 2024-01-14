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

export function CardPasien({ pasiens, deffault }) {
  const [pasien, setPasien] = useState(null);
  const { setData } = useContext(CardsContext);

  useEffect(() => {
    let defaultName = pasien?.name ? pasien?.name : deffault?.name || "";
    let defaultGender = pasien?.gender
      ? pasien?.gender
      : deffault?.gender || "";
    let defaultAge = pasien?.age ? pasien?.age : deffault?.age || "";
    let defaultGejala = pasien?.gejala
      ? pasien?.gejala
      : deffault?.gejala || "";

    setPasien({
      name: defaultName,
      gender: defaultGender,
      age: defaultAge,
      gejala: defaultGejala,
    });
    setData((prev) => ({ ...prev, pasienId: deffault?.id || "" }));
  }, []);

  return (
    <Card className="w-full sm:w-[350px]">
      <CardHeader>
        <CardTitle>Data pasien</CardTitle>
        <CardDescription>Pilih daftar pasien</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pasien" className="text-black">
                pasien *
              </Label>
              <Select
                id="pasien"
                onValueChange={(data) => {
                  setPasien(data);
                  setData((prev) => ({ ...prev, pasienId: data?.id }));
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={pasien?.name ? pasien?.name : "Pilih pasien"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>pasien</SelectLabel>
                    {pasiens.map((data) => (
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
                placeholder="Name pasien"
                disabled
                defaultValue={pasien?.name}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="jk">Jenis Kelamin</Label>
              <Input
                id="jk"
                placeholder="Jenis Kelamin"
                disabled
                defaultValue={pasien?.gender}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="umur">Umur</Label>
              <Input
                id="umur"
                placeholder="umur"
                disabled
                defaultValue={pasien?.age}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gejala">Gejala</Label>
              <Input
                id="gejala"
                placeholder="gejala"
                disabled
                defaultValue={pasien?.gejala}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
