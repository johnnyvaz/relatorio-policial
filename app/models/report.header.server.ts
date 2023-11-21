import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Header = {
  id: string;
  quarto_das: string;
  date: string;
  viatura: string;
  encarregado: string;
  auxiliares: string;
  motorista: string;
  assinatura_encarregado: string;
  batalhao_policia: string;
  area_territorial: string;
  hora_honda: string;
  rondante: string;
  km_inicio: string;
  km_termino: string;
  km_percorrido: string;
  boletins_confeccionados: string;
  data_transferencia_servico: string;
  encarregado_seguinte: string;
  profile_id: string;
}

export async function getReportHeaderListItems({ userId }: { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("report_header")
    .select("*")
    .eq("profile_id", userId);
  if (!error) {
    return data;
  }
  return error;
}

export async function createRelatorio({

  encarregado,
  userId,
}: Pick<Header, "encarregado"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("report_header")
    .insert([{ encarregado, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }
  return error;
}

export async function deleteReport({
  id,
  userId,
}: Pick<Header, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("report_header")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getReportHeader({
  id,
  userId,
}: Pick<Header, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("report_header")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      quarto_das: data.quarto_das,
      date: data.date,
      viatura: data.viatura,
      encarregado: data.encarregado,
      auxiliares: data.auxiliares,
      motorista: data.motorista,
      assinatura_encarregado: data.assinatura_encarregado,
      batalhao_policia: data.batalhao_policia,
      area_territorial: data.area_territorial,
      hora_honda: data.hora_honda,
      rondante: data.rondante,
      km_inicio: data.km_inicio,
      km_termino: data.km_termino,
      km_percorrido: data.km_percorrido,
      boletins_confeccionados: data.boletins_confeccionados,
      data_transferencia_servico: data.data_transferencia_servico,
      encarregado_seguinte: data.encarregado_seguinte,
    };
  }
}

export async function updateReportHeader(id:string, userId: string, 
  quarto_das: string,
  date: string,
  viatura: string,
  encarregado: string,
  auxiliares: string,
  motorista: string,
  assinatura_encarregado: string,  
  batalhao_policia: string,
  area_territorial: string,
  hora_honda: string,
  rondante: string,
  km_inicio: string,
  km_termino: string,
  km_percorrido: string,
  boletins_confeccionados: string,
  data_transferencia_servico: string,
  encarregado_seguinte: string,
  ) {
  const { data, error } = await supabase
    .from("report_header")
    .update({ 
      quarto_das: quarto_das,
      date: date,
      viatura: viatura,
      encarregado: encarregado,
      auxiliares: auxiliares,
      motorista: motorista,
      assinatura_encarregado: assinatura_encarregado,
      batalhao_policia: batalhao_policia,
      area_territorial: area_territorial,
      hora_honda: hora_honda,
      rondante: rondante,
      km_inicio: km_inicio,
      km_termino: km_termino,
      km_percorrido: km_percorrido,
      boletins_confeccionados: boletins_confeccionados,
      data_transferencia_servico: data_transferencia_servico,
      encarregado_seguinte: encarregado_seguinte,
    })
    .match({profile_id: userId, id: id});

  if (!error) {
    return data;
  }
  return null;
}


