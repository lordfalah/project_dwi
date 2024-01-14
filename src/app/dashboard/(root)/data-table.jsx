"use client";
import Link from "next/link";
import Search from "@/assets/icon/Search";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Fragment, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ChevronRightDouble from "@/assets/icon/ChevronRightDouble";
import ChevronLeftDouble from "@/assets/icon/ChevronLeftDouble";
import { columnsRekamMedis } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/libs/actions";
import { useRouter } from "next/navigation";

function DataTable() {
  const myTable = useRef(null);
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["rekamMedis"],
    queryFn: clientApi.rekamMedis,
  });

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns: columnsRekamMedis,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <Fragment>
      <div className="bg-white p-4 sm:p-6 grid grid-cols-6 gap-x-4 flex-wrap rounded-lg items-center mt-4">
        <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease col-span-4">
          <span className="text-sm ease leading-5.6 absolute z-40 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
            <Search />
          </span>
          <input
            type="text"
            className="pl-9 text-sm focus:shadow-primary-outline ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow"
            placeholder="Type here..."
            value={table.getColumn("diagnosa")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("diagnosa")?.setFilterValue(event.target.value)
            }
          />
        </div>

        <div className="col-span-2 justify-self-end items-center">
          <Link
            href={"/dashboard/form"}
            className="bg-gradient-to-r from-violet-600 to-blue-500 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
          >
            Create
          </Link>
        </div>
      </div>

      <div className="rounded-md border bg-white my-6" ref={myTable}>
        <Table className="w-[700px] sm:w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  // onClick={() =>
                  //   router.push(`/dashboard/label/${row?.original?.id}`)
                  // }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnsRekamMedis.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="hidden sm:block flex-1 text-sm text-muted-foreground">
          Showing Table Page {table.getState()?.pagination?.pageIndex + 1}
          of {table.getFilteredRowModel().rows.length} Entries
        </div>

        <div className="flex items-center w-full sm:w-fit gap-x-4 justify-between sm:justify-normal">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2">
            <button
              variant="outline"
              className={`hidden h-8 w-8 p-0 lg:flex relative items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !table.getCanPreviousPage()
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronLeftDouble className="h-4 w-4" />
            </button>
            <button
              variant="outline"
              className={`h-8 w-8 p-0 relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !table.getCanPreviousPage()
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              variant="outline"
              className={`h-8 w-8 p-0 relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !table.getCanNextPage()
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
            <button
              variant="outline"
              className={`hidden h-8 w-8 p-0 lg:flex relative items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !table.getCanNextPage()
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronRightDouble className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DataTable;
