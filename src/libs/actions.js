"use client";

export const getPasien = async () => {
  try {
    const req = await fetch("/api/pasien", {
      method: "GET",
      cache: "no-store",
    });
    if (!req.ok) throw new Error(req.statusText || "");

    return await req.json();
  } catch (error) {
    throw new Error(error.message || "");
  }
};

const deletePasien = async (id) => {
  try {
    const req = await fetch(`/api/pasien/${id}`, { method: "DELETE" });
    if (!req.ok) throw new Error(req.statusText || "");
    const res = await req.json();

    return res;
  } catch (error) {
    throw new Error(error.message || "");
  }
};

const getDokter = async () => {
  try {
    const req = await fetch("/api/dokter", {
      method: "GET",
      cache: "no-store",
    });
    if (!req.ok) throw new Error(req.statusText || "");

    return await req.json();
  } catch (error) {
    throw new Error(error.message || "");
  }
};

const deleteDokter = async (id) => {
  try {
    const req = await fetch(`/api/dokter/${id}`, { method: "DELETE" });
    if (!req.ok) throw new Error(req.statusText || "");
    const res = await req.json();

    return res;
  } catch (error) {
    throw new Error(error.message || "");
  }
};

const getObat = async () => {
  try {
    const req = await fetch("/api/obat", {
      method: "GET",
      cache: "no-store",
    });
    if (!req.ok) throw new Error(req.statusText || "");

    return await req.json();
  } catch (error) {
    throw new Error(error.message || "");
  }
};

const deleteObat = async (id) => {
  try {
    const req = await fetch(`/api/obat/${id}`, { method: "DELETE" });
    if (!req.ok) throw new Error(req.statusText || "");
    const res = await req.json();

    return res;
  } catch (error) {
    throw new Error(error.message || "");
  }
};

const rekamMedis = async () => {
  try {
    const req = await fetch("/api/rekamMedis", {
      method: "GET",
      cache: "no-store",
    });
    if (!req.ok) throw new Error(req.statusText || "");
    const res = await req.json();

    return res || [];
  } catch (error) {
    throw new Error(error.message || "");
  }
};

const rekamMedisDelete = async (id) => {
  try {
    const req = await fetch(`/api/rekamMedis/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });
    if (!req.ok) throw new Error(req.statusText || "");
    const res = await req.json();

    return res;
  } catch (error) {
    throw new Error(error.message || "");
  }
};

export const clientApi = {
  getPasien,
  deletePasien,
  getDokter,
  deleteDokter,
  rekamMedis,
  getObat,
  deleteObat,
  rekamMedisDelete,
};
