import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Header = {
  id: string;
  quartoDas?: string;
  date: string;
  viatura: string;
  encarregado?: string;
  auxiliares: string;
  motorista: string;
  assinaturaEncarregado: string;
  batalhaoPolicia: string;
  areaTerritorial: string;
  horaHonda: string;
  rondante: string;
  kmInicio: string;
  kmTermino: string;
  kmPercorrido: string;
  boletinsConfeccionados: string;
  dataTransferenciaServiço: string;
  encarregadoSeguinte: string;
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
}: Pick<Header, "encarregado"  > & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("report_header")
    .insert([{ encarregado, profile_id: userId }])
    .single();

  if (!error) {
    console.log(" -- eu > " + data)
    return data;
  }
  console.log(" -- eu > " + error)
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
      quartoDas: data.quartoDas,
      date: data.date,
      viatura: data.viatura,
      encarregado: data.encarregado,
      auxiliares: data.auxiliares,
      motorista: data.motorista,
      assinaturaEncarregado: data.assinaturaEncarregado,
      batalhaoPolicia: data.batalhaoPolicia,
      areaTerritorial: data.areaTerritorial,
      horaHonda: data.horaHonda,
      rondante: data.rondante,
      kmInicio: data.kmInicio,
      kmTermino: data.kmTermino,
      kmPercorrido: data.kmPercorrido,
      boletinsConfeccionados: data.boletinsConfeccionados,
      dataTransferenciaServiço: data.dataTransferenciaServiço,
      encarregadoSeguinte: data.encarregadoSeguinte,
    };
  }

  return null;
}
