"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

export function FancyMultiSelect({ datas, setData, deffault }) {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState(
    deffault ? [...[datas], ...deffault] : [datas]
  );

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      obats: selected.slice(1),
    }));
  }, [selected]);

  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback((obat) => {
    setSelected((prev) => prev.filter((s) => s.id !== obat.id));
  }, []);

  const handleKeyDown = useCallback((e) => {
    const input = inputRef.current;

    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  // const selectables = datas.map((obat) => console.log(obat));

  // console.log(selected);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((obat, idx) => {
            return (
              <Badge key={`${obat?.id}-${idx}`} variant="secondary">
                {obat.name} {obat.jumlah}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(obat);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(obat)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Pilih Obat..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && datas.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {datas.map((obat, idx) => {
                return (
                  <CommandItem
                    value={`${obat.id}`}
                    key={`${obat.id}-${idx}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("");
                      setSelected((prev) => {
                        const index = prev.findIndex(
                          (data) => data.id === obat.id
                        );

                        if (index !== -1) {
                          // Jika id sudah ada, buat salinan data sebelumnya, tambahkan jumlah, dan kembalikan data yang baru
                          const updatedData = [...prev];
                          updatedData[index] = {
                            ...updatedData[index],
                            jumlah: updatedData[index].jumlah + 1,
                            total_harga:
                              (updatedData[index].jumlah + 1) *
                              updatedData[index].harga,
                          };

                          return updatedData;
                        }
                        // Jika id tidak ada, tambahkan objek obat baru
                        return [...prev, obat];
                      });
                    }}
                    className={"cursor-pointer"}
                  >
                    {obat.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
