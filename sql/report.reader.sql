create table public.report_header
(
    id         uuid      default uuid_generate_v4() not null
        primary key,
    quarto_das text,
    date text,
    viatura text,
    encarregado text,
    auxiliares text,
    motorista text,
    assinatura_encarregado text,
    batalhao_policia text,
    area_territorial text,
    hora_honda text,
    rondante text,
    km_inicio text,
    km_termino text,
    km_percorrido text,
    boletins_confeccionados text,
    data_transferencia_serviço text,
    encarregado_seguinte text,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP,
    profile_id uuid                                 not null
        references public.profiles
);

alter table public.notes
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on public.notes to anon;

-- grant delete, insert, references, select, trigger, truncate, update on public.notes to authenticated;

grant delete, insert, references, select, trigger, truncate, update on public.notes to service_role;

