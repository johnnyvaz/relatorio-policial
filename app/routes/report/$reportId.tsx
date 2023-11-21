import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, isRouteErrorResponse, useFetcher, useLoaderData, useRouteError } from "@remix-run/react";
import { getReportHeader } from "~/models/report.header.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { Header } from "~/models/report.header.server";

type LoaderData = {
  report: Header;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.reportId, "Relatório não encontrado");
  const report = await getReportHeader({ userId, id: params.reportId });
  if (!report) {
    throw new Response("Não encontrado", { status: 404 });
  }

  return json({ report });
};

export const action: ActionFunction = async ({ request, params }) => {
  const id = params.reportId;
  return redirect(`/report/${id}`);
};

export default function ReportDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  const fetcher = useFetcher();

  return (
    <div>
         
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        <label className="font-bold uppercase bg-blue-500 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Preenchimento do Cabeçalho
        </label>
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Quarto de Horas
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const quarto_das = String(e.currentTarget.textContent).trim();
            if (quarto_das !== data.report.quarto_das) {
              fetcher.submit(
                { quarto_das: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("quarto_das") as string)
              : data.report.quarto_das,
          }}
        />

        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Data
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const date = String(e.currentTarget.textContent).trim();
            if (date !== data.report.date) {
              fetcher.submit(
                { date: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("date") as string)
              : data.report.date,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Viatura
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const viatura = String(e.currentTarget.textContent).trim();
            if (viatura !== data.report.viatura) {
              fetcher.submit(
                { viatura: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("viatura") as string)
              : data.report.viatura,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Encarregado
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const address = String(e.currentTarget.textContent).trim();
            if (address !== data.report.encarregado) {
              fetcher.submit(
                { encarregado: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("encarregado") as string)
              : data.report.encarregado,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Auxiliares
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const auxiliares = String(e.currentTarget.textContent).trim();
            if (auxiliares !== data.report.auxiliares) {
              fetcher.submit(
                { auxiliares: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("auxiliares") as string)
              : data.report.auxiliares,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Motorista
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const motorista = String(e.currentTarget.textContent).trim();
            if (motorista !== data.report.motorista) {
              fetcher.submit(
                { motorista: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("motorista") as string)
              : data.report.motorista,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Assinatura do Encarregado
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const assinatura_encarregado = String(e.currentTarget.textContent).trim();
            if (assinatura_encarregado !== data.report.assinatura_encarregado) {
              fetcher.submit(
                { assinatura_encarregado: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("assinatura_encarregado") as string)
              : data.report.assinatura_encarregado,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Batalhão de Polícia
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const batalhao_policia = String(e.currentTarget.textContent).trim();
            if (batalhao_policia !== data.report.batalhao_policia) {
              fetcher.submit(
                { batalhao_policia: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("batalhao_policia") as string)
              : data.report.batalhao_policia,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Área Territorial
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const area_territorial = String(e.currentTarget.textContent).trim();
            if (area_territorial !== data.report.area_territorial) {
              fetcher.submit(
                { area_territorial: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("area_territorial") as string)
              : data.report.area_territorial,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Hora da Ronda
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const hora_honda = String(e.currentTarget.textContent).trim();
            if (hora_honda !== data.report.hora_honda) {
              fetcher.submit(
                { hora_honda: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("hora_honda") as string)
              : data.report.hora_honda,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Rondante
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const rondante = String(e.currentTarget.textContent).trim();
            if (rondante !== data.report.rondante) {
              fetcher.submit(
                { rondante: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("rondante") as string)
              : data.report.rondante,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          KM do Início
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const km_inicio = String(e.currentTarget.textContent).trim();
            if (km_inicio !== data.report.km_inicio) {
              fetcher.submit(
                { km_inicio: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("km_inicio") as string)
              : data.report.km_inicio,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          KM do Término
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const km_termino = String(e.currentTarget.textContent).trim();
            if (km_termino !== data.report.km_termino) {
              fetcher.submit(
                { km_termino: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("km_termino") as string)
              : data.report.km_termino,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          KM Percorrido
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const km_percorrido = String(e.currentTarget.textContent).trim();
            if (km_percorrido !== data.report.km_percorrido) {
              fetcher.submit(
                { km_percorrido: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("km_percorrido") as string)
              : data.report.km_percorrido,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Boletins Confeccionados
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const boletins_confeccionados = String(e.currentTarget.textContent).trim();
            if (boletins_confeccionados !== data.report.boletins_confeccionados) {
              fetcher.submit(
                { boletins_confeccionados: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("boletins_confeccionados") as string)
              : data.report.boletins_confeccionados,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Data Hora da Transferencia do Serviço
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const data_transferencia_servico = String(e.currentTarget.textContent).trim();
            if (data_transferencia_servico !== data.report.data_transferencia_servico) {
              fetcher.submit(
                { data_transferencia_servico: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("data_transferencia_servico") as string)
              : data.report.data_transferencia_servico,
          }}
        />
        <label className="font-bold uppercase bg-gray-800 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Encarregado Seguinte
        </label>
        <div
          className="text-xl p-1 text-center"
          onBlur={(e) => {
            const encarregado_seguinte = String(e.currentTarget.textContent).trim();
            if (encarregado_seguinte !== data.report.encarregado_seguinte) {
              fetcher.submit(
                { encarregado_seguinte: String(e.target.textContent) },
                {
                  action: `/report/${data.report.id}/update`,
                  method: "post",
                }
              );
            }
          }}
          contentEditable
          dangerouslySetInnerHTML={{
            __html: fetcher.submission
              ? (fetcher.submission.formData.get("encarregado_seguinte") as string)
              : data.report.encarregado_seguinte,
          }}
        />


      </Form>
    </div>
  );
}


export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>Um erro inesperado ocorreu: <tr></tr><br />  {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Erro desconhecido</h1>;
  }

  if (error.status === 404) {
    return <div>ID não encontrao</div>;
  }

  return <div>Um erro inesperado ocorreu: <br /> {error.statusText}</div>;
}
