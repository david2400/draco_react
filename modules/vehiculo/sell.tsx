/** @format */

"use client";

import { DynamicForm } from "@repo/ui/dynamic-form";
import { categoryFinderSchema } from "@/lib/demo/categoryFinderSchema";
import { NextPage } from "next";

const Vehiculo = () => {
  return (
    <DynamicForm
      schema={categoryFinderSchema}
      defaultValues={{
        keywords: "Celular Samsung Galaxy A56 5G 256GB",
        universal_code: "887276246529",
        photos_photos: [],
      }}
    />
  );
};

export default Vehiculo;
