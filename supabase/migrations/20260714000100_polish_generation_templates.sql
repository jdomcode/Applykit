-- ApplyKit Day 5: polish generation templates and align required fields.
-- Safe to run on the existing production beta database.
-- It updates active MVP templates in place without deleting saved documents.

begin;

update public.template_versions tv
set
  template_body = v.template_body,
  input_schema = v.input_schema::jsonb
from public.tools t
join (
  values
    ('recruiter-message-generator', 'en', 'Hello,\n\nMy name is {{full_name}}. I am reaching out through {{platform}} regarding opportunities related to {{target_role}}. I have {{years_experience}} of experience and skills in {{main_skills}}.\n\nI would appreciate the opportunity to connect and learn whether there are relevant openings where my profile could be a strong fit.\n\nBest regards,\n{{full_name}}', '{"fields":["full_name","target_role","years_experience","main_skills","platform","tone","language"]}'),
    ('recruiter-message-generator', 'es', 'Hola,\n\nMi nombre es {{full_name}}. Le escribo por {{platform}} sobre oportunidades relacionadas con {{target_role}}. Cuento con {{years_experience}} de experiencia y habilidades en {{main_skills}}.\n\nMe gustaría conectar y conocer si existen vacantes donde mi perfil pueda encajar de forma sólida.\n\nSaludos,\n{{full_name}}', '{"fields":["full_name","target_role","years_experience","main_skills","platform","tone","language"]}'),

    ('professional-bio-generator', 'en', '{{full_name}} is a {{current_role}} with {{years_experience}} of experience and skills in {{main_skills}}. This profile reflects a practical, organized, and quality-focused approach to professional work, with an emphasis on clear communication, process improvement, and reliable results.', '{"fields":["full_name","current_role","years_experience","main_skills","tone","language"]}'),
    ('professional-bio-generator', 'es', '{{full_name}} es {{current_role}} con {{years_experience}} de experiencia y habilidades en {{main_skills}}. Su perfil refleja una forma de trabajo práctica, organizada y orientada a la calidad, con enfoque en comunicación clara, mejora de procesos y resultados confiables.', '{"fields":["full_name","current_role","years_experience","main_skills","tone","language"]}')
) as v(slug, locale, template_body, input_schema)
  on t.slug = v.slug
where tv.tool_id = t.id
  and tv.locale = v.locale
  and tv.is_active = true;

commit;

-- Optional validation
select t.slug, tv.locale, tv.input_schema
from public.template_versions tv
join public.tools t on t.id = tv.tool_id
where t.slug in ('recruiter-message-generator', 'professional-bio-generator')
  and tv.is_active = true
order by t.slug, tv.locale;
