import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, isRouteErrorResponse, useFetcher, useLoaderData, useRouteError } from "@remix-run/react";
import { getReportHeader } from "~/models/report.header.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { Header } from "~/models/report.header.server";
import { useState } from "react";
import { Tooltip } from "flowbite-react";

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
  const classeInput = "rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent";
  
  const [quartoDas, setQuartoDas] = useState<string>(
    fetcher.submission ? (fetcher.submission.formData.get("quarto_das") as string) : data.report.quarto_das
  );
// --------
const [date, setDate] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("date") as string) : data.report.date
);
const [viatura, setViatura] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("viatura") as string) : data.report.viatura
);
const [encarregado, setEncarregado] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("encarregado") as string) : data.report.encarregado
);
const [auxiliares, setAuxiliares] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("auxiliares") as string) : data.report.auxiliares
);
const [motorista, setMotorista] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("motorista") as string) : data.report.motorista
);
const [assinatura_encarregado, setAssinatura_encarregado] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("assinatura_encarregado") as string) : data.report.assinatura_encarregado
);
const [batalhao_policia, setBatalhao_policia] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("batalhao_policia") as string) : data.report.batalhao_policia
);
const [area_territorial, setArea_territorial] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("area_territorial") as string) : data.report.area_territorial
);
const [hora_honda, setHora_honda] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("hora_honda") as string) : data.report.hora_honda
);
const [rondante, setRondante] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("rondante") as string) : data.report.rondante
);
const [km_inicio, setKm_inicio] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("km_inicio") as string) : data.report.km_inicio
);
const [km_termino, setKm_termino] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("km_termino") as string) : data.report.km_termino
);
const [km_percorrido, setKm_percorrido] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("km_percorrido") as string) : data.report.km_percorrido
);
const [boletins_confeccionados, setBoletins_confeccionados] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("boletins_confeccionados") as string) : data.report.boletins_confeccionados
);
const [data_transferencia_servico, setData_transferencia_servico] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("data_transferencia_servico") as string) : data.report.data_transferencia_servico
);
const [encarregado_seguinte, setEncarregado_seguinte] = useState<string>(
  fetcher.submission ? (fetcher.submission.formData.get("encarregado_seguinte") as string) : data.report.encarregado_seguinte
);


  const handleQuartoDasChange = (e: React.ChangeEvent<HTMLInputElement>) => { setQuartoDas(e.target.value)};
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => { setDate(e.target.value)};
  const handleViaturaChange = (e: React.ChangeEvent<HTMLInputElement>) => { setViatura(e.target.value)};
  const handleEncarregadoChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEncarregado(e.target.value)};
  const handleAuxiliaresChange = (e: React.ChangeEvent<HTMLInputElement>) => { setAuxiliares(e.target.value)};
  const handleMotoristaChange = (e: React.ChangeEvent<HTMLInputElement>) => { setMotorista(e.target.value)};
  const handleAssinaturaEncarregadoChange = (e: React.ChangeEvent<HTMLInputElement>) => { setAssinatura_encarregado(e.target.value)};
  const handleBatalhaoPoliciaChange = (e: React.ChangeEvent<HTMLInputElement>) => { setBatalhao_policia(e.target.value)};
  const handleAreaTerritorialChange = (e: React.ChangeEvent<HTMLInputElement>) => { setArea_territorial(e.target.value)};
  const handleHoraRondaChange = (e: React.ChangeEvent<HTMLInputElement>) => { setHora_honda(e.target.value)};
  const handleRondanteChange = (e: React.ChangeEvent<HTMLInputElement>) => { setRondante(e.target.value)};
  const handleKmInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => { setKm_inicio(e.target.value)};
  const handleKmTerminoChange = (e: React.ChangeEvent<HTMLInputElement>) => { setKm_termino(e.target.value)};
  const handleKmPercorridoChange = (e: React.ChangeEvent<HTMLInputElement>) => { setKm_percorrido(e.target.value)};
  const handleBoletinsConfeccionadosChange = (e: React.ChangeEvent<HTMLInputElement>) => { setBoletins_confeccionados(e.target.value)};
  const handleDataTransferenciaServicoChange = (e: React.ChangeEvent<HTMLInputElement>) => { setData_transferencia_servico(e.target.value)};
  const handleEncarregadoSeguinteChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEncarregado_seguinte(e.target.value)};

  const handleQuartoDasBlur = () => { 
    if (quartoDas !== data.report.quarto_das) {
      fetcher.submit(
        { quarto_das: quartoDas },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleDateBlur = () => { 
    if (date !== data.report.date) {
      fetcher.submit(
        { date: date },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleViaturaBlur = () => { 
    if (viatura !== data.report.viatura) {
      fetcher.submit(
        { viatura: viatura },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };
  const handleEncarregadoBlur = () => { 
    if (encarregado !== data.report.encarregado) {
      fetcher.submit(
        { encarregado: encarregado },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleAuxiliaresBlur = () => { 
    if (auxiliares !== data.report.auxiliares) {
      fetcher.submit(
        { auxiliares: auxiliares },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleMotoristaBlur = () => { 
    if (motorista !== data.report.motorista) {
      fetcher.submit(
        { motorista: motorista },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleAssinaturaEncarregadoBlur = () => { 
    if (assinatura_encarregado !== data.report.assinatura_encarregado) {
      fetcher.submit(
        { assinatura_encarregado: assinatura_encarregado },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleBatalhaoPoliciaBlur = () => { 
    if (batalhao_policia !== data.report.batalhao_policia) {
      fetcher.submit(
        { batalhao_policia: batalhao_policia },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleAreaTerritorialBlur = () => { 
    if (area_territorial !== data.report.area_territorial) {
      fetcher.submit(
        { area_territorial: area_territorial },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };


  const handleHoraRondaBlur = () => { 
    if (hora_honda !== data.report.hora_honda) {
      fetcher.submit(
        { hora_honda: hora_honda },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleRondanteBlur = () => { 
    if (rondante !== data.report.rondante) {
      fetcher.submit(
        { rondante: rondante },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleKmIinicioBlur = () => { 
    if (km_inicio !== data.report.km_inicio) {
      fetcher.submit(
        { km_inicio: km_inicio },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleKmTerminoBlur = () => { 
    if (km_termino !== data.report.km_termino) {
      fetcher.submit(
        { km_termino: km_termino },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleKmPercorridoBlur = () => { 
    if (km_percorrido !== data.report.km_percorrido) {
      fetcher.submit(
        { km_percorrido: km_percorrido },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };


  const handleBoletinsConfeccionadosBlur = () => { 
    if (boletins_confeccionados !== data.report.boletins_confeccionados) {
      fetcher.submit(
        { boletins_confeccionados: boletins_confeccionados },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleDataTransferenciaServicoBlur = () => { 
    if (data_transferencia_servico !== data.report.data_transferencia_servico) {
      fetcher.submit(
        { data_transferencia_servico: data_transferencia_servico },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };

  const handleEncarregadoSeguinteBlur = () => { 
    if (encarregado_seguinte !== data.report.encarregado_seguinte) {
      fetcher.submit(
        { encarregado_seguinte: encarregado_seguinte },
        {
          action: `/report/${data.report.id}/update`,
          method: "post",
        }
      );
    }
  };


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
        <div className="font-bold uppercase bg-blue-500 px-4 py-2 text-white text-center overflow-hidden w-full flex-1">
          Preenchimento do Cabeçalho
        </div>


        <div className="flex gap-4 mb-2">
          <Tooltip content="Quarto de Horas">
            <div className="relative ">
              <input type="text" id="quarto_das"
                className={classeInput}
                name="quarto_das"
                placeholder="quarto_das"
                value={quartoDas}
                onChange={handleQuartoDasChange}
                onBlur={handleQuartoDasBlur}
              />
            </div>
          </Tooltip>
          <Tooltip content="Data">
            <div className="relative ">
              <input type="text" id="date"
                className={classeInput}
                name="date"
                placeholder="Data"
                value={date}
                onChange={handleDateChange}
                onBlur={handleDateBlur}
              />
            </div>
          </Tooltip>
        </div>
        <Tooltip content="Viatura">
          <div className="relative ">
            <input type="text" id="viatura"
              className={classeInput}
              name="viatura"
              placeholder="viatura"
              value={viatura}
              onChange={handleViaturaChange}
              onBlur={handleViaturaBlur}
            />
          </div>
        </Tooltip>
        <hr />
        <div className="flex gap-4 mb-2">
          <Tooltip content="Encarregado">
            <div className="relative ">
              <input type="text" id="Encarregado"
                className={classeInput}
                name="Encarregado"
                placeholder="Encarregado"
                value={encarregado}
                onChange={handleEncarregadoChange}
                onBlur={handleEncarregadoBlur}
              />
            </div>
          </Tooltip>
          <Tooltip content="Auxiliares">
            <div className="relative ">
              <input type="text" id="auxiliares"
                className={classeInput}
                name="auxiliares"
                placeholder="Auxiliares"
                value={auxiliares}
                onChange={handleAuxiliaresChange}
                onBlur={handleAuxiliaresBlur}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex gap-4 mb-2">
          <Tooltip content="Motorista">
            <div className="relative ">
              <input type="text" id="Motorista"
                className={classeInput}
                name="Motorista"
                placeholder="Motorista"
                value={motorista}
                onChange={handleMotoristaChange}
                onBlur={handleMotoristaBlur}
              />
            </div>
          </Tooltip>
          <Tooltip content="Assinatura do Encarregado">
            <div className="relative ">
              <input type="text" id="Assinatura_encarregado"
                className={classeInput}
                name="Assinatura_encarregado"
                placeholder="Assinatura do encarregado"
                value={assinatura_encarregado}
                onChange={handleAssinaturaEncarregadoChange}
                onBlur={handleAssinaturaEncarregadoBlur}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex gap-4 mb-2">
          <Tooltip content="Batalhão de Polícia">
            <div className="relative ">
              <input type="text" id="BatalhaoPolicia"
                className={classeInput}
                name="BatalhaoPolicia"
                placeholder="Batalhão de Polícia"
                value={batalhao_policia}
                onChange={handleBatalhaoPoliciaChange}
                onBlur={handleBatalhaoPoliciaBlur}
              />
            </div>
          </Tooltip>
          <Tooltip content="Área Territorial">
            <div className="relative ">
              <input type="text" id="AreaTerritorial"
                className={classeInput}
                name="handleAreaTerritorialChange"
                placeholder="Área Territorial"
                value={area_territorial}
                onChange={handleAreaTerritorialChange}
                onBlur={handleAreaTerritorialBlur}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex gap-4 mb-2">
          <Tooltip content="Hora Ronda">
            <div className="relative ">
              <input type="text" id="quarto_das"
                className={classeInput}
                name="HoraRonda"
                placeholder="Hora da Ronda"
                value={hora_honda}
                onChange={handleHoraRondaChange}
                onBlur={handleHoraRondaBlur}
              />
            </div>
          </Tooltip>
          <Tooltip content="Rondante">
            <div className="relative ">
              <input type="text" id="rondante"
                className={classeInput}
                name="Rondante"
                placeholder="Rondante"
                value={rondante}
                onChange={handleRondanteChange}
                onBlur={handleRondanteBlur}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex gap-4 mb-2">
          <Tooltip content="Km Início">
            <div className="relative ">
              <input type="text" id="Km Inicio"
                className={classeInput}
                name="Km Inicio"
                placeholder="Km Inicio"
                value={km_inicio}
                onChange={handleKmInicioChange}
                onBlur={handleKmIinicioBlur}
              />
            </div>
          </Tooltip>
          <Tooltip content="Km Término">
            <div className="relative">
              <input type="text" id="KmTermino"
                className={classeInput}
                name="kmtermino"
                placeholder="Km Termino"
                value={km_termino}
                onChange={handleKmTerminoChange}
                onBlur={handleKmTerminoBlur}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex gap-4 mb-2">
          <Tooltip content="Km Percorrido">
            <div className="relative ">
              <input type="text" id="kmPercorrido"
                className={classeInput}
                name="kmPercorrido"
                placeholder="Km Percorrido"
                value={km_percorrido}
                onChange={handleKmPercorridoChange}
                onBlur={handleKmPercorridoBlur}
              />
            </div>
          </Tooltip>
          <Tooltip content="boletins_confeccionados">
            <div className="relative ">
              <input type="text" id="boletins_confeccionados"
                className={classeInput}
                name="boletins_confeccionados"
                placeholder="boletins_confeccionados"
                value={boletins_confeccionados}
                onChange={handleBoletinsConfeccionadosChange}
                onBlur={handleBoletinsConfeccionadosBlur}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex gap-4 mb-2">
          <Tooltip content="Encarregado Seguinte">
            <div className="relative ">
              <input type="text" id="encarregado_seguinte"
                className={classeInput}
                name="encarregado_seguinte"
                placeholder="Encarregado Seguinte"
                value={encarregado_seguinte}
                onChange={handleEncarregadoSeguinteChange}
                onBlur={handleEncarregadoSeguinteBlur}
              />
            </div>
          </Tooltip>
          <Tooltip content="boletins_confeccionados">
            <div className="relative ">
              <input type="text" id="boletins_confeccionados"
                className={classeInput}
                name="boletins_confeccionados"
                placeholder="boletins_confeccionados"
                value={boletins_confeccionados}
                onChange={handleBoletinsConfeccionadosChange}
                onBlur={handleBoletinsConfeccionadosBlur}
              />
            </div>
          </Tooltip>
        </div>

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
