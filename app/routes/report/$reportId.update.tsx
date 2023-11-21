import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { updateReportHeader } from "~/models/report.header.server";
import { requireUserId } from "~/session.server";


export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const id:string = params.reportId;
  const updates = Object.fromEntries(await request.formData());
  invariant(id, "sem id configurado" + JSON.stringify(updates));
  const quarto_das = updates.quarto_das
  const date = updates.date
  const viatura = updates.viatura
  const encarregado = updates.encarregado
  const auxiliares = updates.auxiliares
  const motorista = updates.motorista
  const assinatura_encarregado = updates.assinatura_encarregado
  const batalhao_policia = updates.batalhao_policia
  const area_territorial = updates.area_territorial
  const hora_honda = updates.hora_honda
  const rondante = updates.rondante
  const km_inicio = updates.km_inicio
  const km_termino = updates.km_termino
  const km_percorrido = updates.km_percorrido
  const boletins_confeccionados = updates.boletins_confeccionados
  const data_transferencia_servico = updates.data_transferencia_servico
  const encarregado_seguinte = updates.encarregado_seguinte
  console.log(" result -> " + JSON.stringify(updates))
  await updateReportHeader( id,userId, 
    quarto_das,
    date,
    viatura,
    encarregado,
    auxiliares,
    motorista,
    assinatura_encarregado,
    batalhao_policia,
    area_territorial,
    hora_honda,
    rondante,
    km_inicio,
    km_termino,
    km_percorrido,
    boletins_confeccionados,
    data_transferencia_servico,
    encarregado_seguinte,
);
  return json(updates);
};
