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
import { convertDateFormat } from "@/libs/dateFormat";
import { CardsContext } from "@/utils/context/FormCards";
import { useContext, useEffect, useState } from "react";

export function CardDokter({ dokters, deffault }) {
  const [dokter, setDokter] = useState(null);
  const { setData } = useContext(CardsContext);

  useEffect(() => {
    let defaultName = dokter?.name ? dokter?.name : deffault?.name || "";
    let defaultDate = dokter?.createdAt
      ? convertDateFormat(dokter?.createdAt)
      : convertDateFormat(deffault?.createdAt) || "";
    let defaultAlamat = dokter?.address
      ? dokter?.address
      : deffault?.address || "";
    let defaultEmail = dokter?.email ? dokter?.email : deffault?.email || "";

    setDokter({
      name: defaultName,
      createdAt: defaultDate,
      address: defaultAlamat,
      email: defaultEmail,
    });

    setData((prev) => ({ ...prev, dokterId: deffault?.id || "" }));
  }, []);

  return (
    <Card className="w-full sm:w-[350px]">
      <CardHeader>
        <CardTitle>Data Dokter</CardTitle>
        <CardDescription>Pilih daftar dokter</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dokter" className="text-black">
                dokter *
              </Label>
              <Select
                id="dokter"
                onValueChange={(data) => {
                  setDokter(data);
                  setData((prev) => ({ ...prev, dokterId: data?.id }));
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={dokter?.name ? dokter?.name : "Pilih dokter"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Dokter</SelectLabel>
                    {dokters?.map((data) => (
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
                placeholder="Name Dokter"
                disabled
                defaultValue={dokter?.name}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tanggal">Tanggal</Label>
              <Input
                id="tanggal"
                placeholder="Date"
                disabled
                defaultValue={convertDateFormat(dokter?.createdAt)}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="alamat">Alamat</Label>
              <Input
                id="alamat"
                placeholder="Alamat"
                disabled
                defaultValue={dokter?.address}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                disabled
                defaultValue={dokter?.email}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
