"use client";

import Print from "@/assets/icon/Print";
import { Fragment, useRef } from "react";
import ReactToPrint from "react-to-print";
import Image from "next/image";
import { convertDateFormat } from "@/libs/dateFormat";

const Cetak = ({ data }) => {
  const myLabel = useRef(null);

  return (
    <Fragment>
      <div className="bg-white p-4 sm:p-6 flex-wrap rounded-lg items-center mt-4">
        <div className="flex justify-between items-center">
          <h3>Rekam Medis</h3>
          <ReactToPrint
            documentTitle="Resume Medis"
            bodyClass="print-agreement"
            content={() => myLabel.current}
            trigger={() => (
              <button type="button">
                <Print className="w-8 h-8" />
              </button>
            )}
          />
        </div>
      </div>
      <div className="bg-white text-black p-10 mt-14" ref={myLabel}>
        <div className="flex justify-between">
          <div className="space-y-3.5">
            <h2 className="text-2xl font-semibold">
              Klinik & Apotek Kesehatan
            </h2>
            <div>
              <p>Jl. Parit Bilal Gg.Abadi no.11,</p>
              <p>Jungkat Kab.Mempawah, Kalimantan Barat</p>
              <p>78351</p>
              <p>-</p>
            </div>
          </div>
          <Image
            src={"/image/logo/klinik-gigi.png"}
            width={200}
            height={200}
            priority
            className="w-40 aspect-square"
            alt="logo"
            style={{ objectFit: "cover", backgroundBlendMode: "color-burn" }}
          />
        </div>

        <hr className="border-1.5 border-black" />

        <article className="mt-20 mb-16">
          <h1 className="text-4xl font-semibold tracking-tighter text-center">
            Resume Medis
          </h1>

          <div className="grid grid-cols-2 mt-16 gap-y-8 text-lg">
            <div className="col-span-2 xl:col-span-1">
              <div className="flex">
                <p className="basis-1/2">Nomor MR</p>
                <span>: {data?.id}</span>
              </div>

              <div className="flex">
                <p className="basis-1/2">Nama Pasien</p>
                <span className="text-left">: {data?.pasien?.name}</span>
              </div>

              <div className="flex">
                <p className="basis-1/2">Umur</p>
                <span>: {data?.pasien?.age}</span>
              </div>

              <div className="flex">
                <p className="basis-1/2">Jenis Kelamin</p>
                <span>: {data?.pasien?.gender}</span>
              </div>

              <div className="flex">
                <p className="basis-1/2">Alamat</p>
                <span>: {data?.pasien?.address}</span>
              </div>
            </div>

            <div className="col-span-2 xl:col-span-1 ">
              <div className="flex">
                <p className="basis-1/2">Tanggal Pemeriksaan</p>
                <span>: {convertDateFormat(data?.createdAt.toString())}</span>
              </div>

              <div className="flex">
                <p className="basis-1/2">Dokter</p>
                <span className="text-left">: {data?.dokter?.name}</span>
              </div>

              <div className="flex">
                <p className="basis-1/2">Hasil Diagnosa</p>
                <span>: {data?.diagnosa}</span>
              </div>

              <div className="flex">
                <p className="basis-1/2">Keterangan</p>
                <span>: {data?.keterangan}</span>
              </div>

              <div className="flex">
                <p className="basis-1/2">Keluhan</p>
                <span>: {data?.keluhan}</span>
              </div>

              <div className="flex">
                <p className="basis-1/2">Obat</p>
                <div className="flex gap-x-1.5">
                  <span className="block">:</span>
                  <ul className="list-disc list-inside ">
                    {data.obat_pasien.obat?.map((val) => (
                      <li key={val.id}>{val.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Fragment>
  );
};

export default Cetak;
