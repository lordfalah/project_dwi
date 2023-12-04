import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const FormModal = ({
  title,
  method,
  onChange,
  submitForm,
  setForm,
  form,
  setOpen,
  open,
  children,
}) => {
  let formRef = useRef(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="w-11/12 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your pasien here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          ref={formRef}
          method={method}
          onSubmit={submitForm}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              onChange={onChange}
              required={true}
              value={form.name}
              type="text"
              id="name"
              className="col-span-3"
              name="name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              age
            </Label>
            <Input
              onChange={onChange}
              required={true}
              value={form.age}
              type="number"
              id="age"
              className="col-span-3"
              name="age"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              address
            </Label>
            <Input
              onChange={onChange}
              required={true}
              value={form.address}
              type="text"
              id="address"
              className="col-span-3"
              name="address"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gejala" className="text-right">
              gejala
            </Label>
            <Input
              onChange={onChange}
              required={true}
              value={form.gejala}
              type="text"
              id="gejala"
              className="col-span-3"
              name="gejala"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <Select
              name="gender"
              onValueChange={(e) => setForm((prev) => ({ ...prev, gender: e }))}
              defaultValue={form.gender}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="pria">Pria</SelectItem>
                  <SelectItem value="wanita">Wanita</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              if (formRef.current) {
                formRef.current.dispatchEvent(
                  new Event("submit", { bubbles: true })
                );
              }
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
