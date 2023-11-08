import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createRelatorio } from "~/models/report.header.server";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const quartoDas = formData.get("quartoDas");
  const date = formData.get("date");
  const viatura = formData.get("viatura");
  const encarregado = formData.get("encarregado");
  const auxiliares = formData.get("auxiliares");
  const motorista = formData.get("motorista");
  const assinaturaEncarregado = formData.get("assinaturaEncarregado");
  const batalhaoPolicia = formData.get("batalhaoPolicia");
  const areaTerritorial = formData.get("areaTerritorial");
  const horaHonda = formData.get("horaHonda");
  const rondante = formData.get("rondante");
  const kmInicio = formData.get("kmInicio");
  const kmTermino = formData.get("kmTermino");
  const kmPercorrido = formData.get("kmPercorrido");
  const boletinsConfeccionados = formData.get("boletinsConfeccionados");
  const dataTransferenciaServiço = formData.get("dataTransferenciaServiço");
  const encarregadoSeguinte = formData.get("encarregadoSeguinte");
 
  if (typeof quartoDas !== "string" || quartoDas.length === 0) {
    return json({ errors: { title: "quartoDas is required" } }, { status: 400 });
  }

  if (typeof encarregado !== "string" || encarregado.length === 0) {
    return json({ errors: { body: "encarregado is required" } }, { status: 400 });
  }

  const report = await createRelatorio({ encarregado, userId});
  return redirect(`/report/${report.id}`);
};

export default function NewReportPage() {
  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Quarto Das: </span>
          <input
            name="quartoDas"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Encarregado: </span>
          <input
            name="encarregado"
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
          ></input>
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
