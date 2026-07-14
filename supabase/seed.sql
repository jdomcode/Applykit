-- ApplyKit MVP seed data - fixed
-- This file only inserts seed data. It does not create tables, functions, RLS, or policies.
-- Run this after the migration has already created the schema.

begin;

insert into public.tools (slug, category, status, icon)
values
  ('cover-letter-generator', 'application', 'active', 'CL'),
  ('job-application-email-generator', 'application', 'active', 'EA'),
  ('follow-up-email-generator', 'communication', 'active', 'FU'),
  ('recruiter-message-generator', 'communication', 'active', 'RM'),
  ('resignation-letter-generator', 'communication', 'active', 'RL'),
  ('salary-negotiation-email-generator', 'communication', 'active', 'SN'),
  ('linkedin-bio-generator', 'career-profile', 'active', 'LB'),
  ('professional-bio-generator', 'career-profile', 'active', 'PB')
on conflict (slug) do update
set
  category = excluded.category,
  status = excluded.status,
  icon = excluded.icon;

insert into public.tool_translations (
  tool_id,
  locale,
  title,
  description,
  seo_title,
  seo_description,
  intro_content,
  faq
)
select
  t.id,
  v.locale,
  v.title,
  v.description,
  v.seo_title,
  v.seo_description,
  v.intro_content,
  v.faq::jsonb
from public.tools t
join (
  values
    ('cover-letter-generator', 'en', 'Cover Letter Generator', 'Create a clear, professional cover letter for a job application.', 'Cover Letter Generator | ApplyKit', 'Create a professional cover letter in minutes with a simple form.', 'Use this tool to create a professional cover letter based on your role, company, skills, tone, and experience level.', '[{"question":"Can I edit the result?","answer":"Yes. The generated text is meant to be editable before you send it."}]'),
    ('cover-letter-generator', 'es', 'Generador de carta de presentación', 'Crea una carta de presentación clara y profesional para aplicar a un empleo.', 'Generador de carta de presentación | ApplyKit', 'Crea una carta de presentación profesional en minutos usando un formulario simple.', 'Usa esta herramienta para crear una carta de presentación basada en el puesto, empresa, habilidades, tono y nivel de experiencia.', '[{"question":"¿Puedo editar el resultado?","answer":"Sí. El texto generado está pensado para que puedas editarlo antes de enviarlo."}]'),

    ('job-application-email-generator', 'en', 'Job Application Email Generator', 'Create a professional email to send your resume or CV.', 'Job Application Email Generator | ApplyKit', 'Write a professional email to send your resume or CV in minutes.', 'Use this tool to create a concise email for sending your resume or CV to a company or recruiter.', '[{"question":"Should I attach my CV?","answer":"Yes. This tool helps you write the email, but you still need to attach your CV before sending it."}]'),
    ('job-application-email-generator', 'es', 'Generador de correo para enviar CV', 'Crea un correo profesional para enviar tu CV.', 'Generador de correo para enviar CV | ApplyKit', 'Escribe un correo profesional para enviar tu CV en minutos.', 'Usa esta herramienta para crear un correo breve y profesional para enviar tu CV a una empresa o reclutador.', '[{"question":"¿Debo adjuntar mi CV?","answer":"Sí. Esta herramienta te ayuda a escribir el correo, pero debes adjuntar tu CV antes de enviarlo."}]'),

    ('follow-up-email-generator', 'en', 'Follow-Up Email Generator', 'Create a polite follow-up email after a job interview.', 'Follow-Up Email After Interview | ApplyKit', 'Write a professional follow-up email after an interview.', 'Use this tool to follow up after an interview without sounding pushy or generic.', '[{"question":"When should I send a follow-up email?","answer":"Usually within 24 to 48 hours after the interview, unless the recruiter gave you another timeline."}]'),
    ('follow-up-email-generator', 'es', 'Generador de correo de seguimiento', 'Crea un correo de seguimiento profesional después de una entrevista.', 'Generador de correo de seguimiento | ApplyKit', 'Escribe un correo profesional de seguimiento después de una entrevista.', 'Usa esta herramienta para dar seguimiento después de una entrevista sin sonar insistente ni genérico.', '[{"question":"¿Cuándo debo enviar un correo de seguimiento?","answer":"Normalmente entre 24 y 48 horas después de la entrevista, salvo que el reclutador te haya dado otro plazo."}]'),

    ('recruiter-message-generator', 'en', 'Recruiter Message Generator', 'Create a short message to contact a recruiter professionally.', 'Recruiter Message Generator | ApplyKit', 'Create a professional recruiter message for LinkedIn, email, or job platforms.', 'Use this tool to contact recruiters with a clear and direct message based on your target role and skills.', '[{"question":"Can I use this on LinkedIn?","answer":"Yes. You can adapt the message for LinkedIn, email, or job platforms."}]'),
    ('recruiter-message-generator', 'es', 'Generador de mensaje para reclutador', 'Crea un mensaje breve para contactar a un reclutador de forma profesional.', 'Generador de mensaje para reclutador | ApplyKit', 'Crea un mensaje profesional para reclutadores en LinkedIn, correo o plataformas laborales.', 'Usa esta herramienta para contactar reclutadores con un mensaje claro y directo basado en el puesto que buscas y tus habilidades.', '[{"question":"¿Puedo usarlo en LinkedIn?","answer":"Sí. Puedes adaptar el mensaje para LinkedIn, correo o plataformas laborales."}]'),

    ('resignation-letter-generator', 'en', 'Resignation Letter Generator', 'Create a professional resignation letter.', 'Resignation Letter Generator | ApplyKit', 'Write a clear and professional resignation letter in minutes.', 'Use this tool to create a respectful resignation letter with your role, company, and final working day.', '[{"question":"Should I include a reason?","answer":"Only if you want to. A resignation letter can be professional without giving many details."}]'),
    ('resignation-letter-generator', 'es', 'Generador de carta de renuncia', 'Crea una carta de renuncia profesional.', 'Generador de carta de renuncia | ApplyKit', 'Escribe una carta de renuncia clara y profesional en minutos.', 'Usa esta herramienta para crear una carta de renuncia respetuosa con tu puesto, empresa y último día laboral.', '[{"question":"¿Debo incluir una razón?","answer":"Solo si quieres. Una carta de renuncia puede ser profesional sin dar demasiados detalles."}]'),

    ('salary-negotiation-email-generator', 'en', 'Salary Negotiation Email Generator', 'Create a professional email to negotiate salary.', 'Salary Negotiation Email Generator | ApplyKit', 'Write a clear salary negotiation email for a job offer.', 'Use this tool to respond to an offer and negotiate salary in a professional and respectful way.', '[{"question":"Should I mention a specific number?","answer":"If you have a clear target range, yes. If not, keep the message open and professional."}]'),
    ('salary-negotiation-email-generator', 'es', 'Generador de email para negociar salario', 'Crea un email profesional para negociar salario.', 'Generador de email para negociar salario | ApplyKit', 'Escribe un email claro para negociar salario en una oferta laboral.', 'Usa esta herramienta para responder a una oferta y negociar salario de manera profesional y respetuosa.', '[{"question":"¿Debo mencionar una cifra específica?","answer":"Si tienes un rango claro, sí. Si no, mantén el mensaje abierto y profesional."}]'),

    ('linkedin-bio-generator', 'en', 'LinkedIn Bio Generator', 'Create a professional LinkedIn bio.', 'LinkedIn Bio Generator | ApplyKit', 'Create a concise LinkedIn bio for your professional profile.', 'Use this tool to create a LinkedIn bio that summarizes your role, skills, experience, and professional focus.', '[{"question":"Can I use this as my LinkedIn About section?","answer":"Yes. You can paste it into your LinkedIn profile and edit it as needed."}]'),
    ('linkedin-bio-generator', 'es', 'Generador de bio para LinkedIn', 'Crea una bio profesional para LinkedIn.', 'Generador de bio para LinkedIn | ApplyKit', 'Crea una bio breve para tu perfil profesional de LinkedIn.', 'Usa esta herramienta para crear una bio de LinkedIn que resuma tu rol, habilidades, experiencia y enfoque profesional.', '[{"question":"¿Puedo usarlo como sección Acerca de en LinkedIn?","answer":"Sí. Puedes pegarlo en tu perfil de LinkedIn y editarlo según necesites."}]'),

    ('professional-bio-generator', 'en', 'Professional Bio Generator', 'Create a short professional bio for applications, portfolios, or profiles.', 'Professional Bio Generator | ApplyKit', 'Create a professional bio for job applications and profiles.', 'Use this tool to create a polished professional bio for your portfolio, resume, website, or job platform profile.', '[{"question":"Can I use this outside LinkedIn?","answer":"Yes. It can be used for resumes, portfolios, websites, and job platforms."}]'),
    ('professional-bio-generator', 'es', 'Generador de bio profesional', 'Crea una bio profesional breve para aplicaciones, portafolios o perfiles.', 'Generador de bio profesional | ApplyKit', 'Crea una bio profesional para aplicaciones laborales y perfiles.', 'Usa esta herramienta para crear una bio profesional para tu portafolio, CV, web o perfil en plataformas laborales.', '[{"question":"¿Puedo usarla fuera de LinkedIn?","answer":"Sí. Puede usarse en CVs, portafolios, webs y plataformas laborales."}]')
) as v(slug, locale, title, description, seo_title, seo_description, intro_content, faq)
on t.slug = v.slug
on conflict (tool_id, locale) do update
set
  title = excluded.title,
  description = excluded.description,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  intro_content = excluded.intro_content,
  faq = excluded.faq;

-- Re-seed templates for the initial MVP tools.
-- Safe for a fresh MVP database. Avoid running this after real users have saved generated documents.
delete from public.template_versions
where tool_id in (
  select id
  from public.tools
  where slug in (
    'cover-letter-generator',
    'job-application-email-generator',
    'follow-up-email-generator',
    'recruiter-message-generator',
    'resignation-letter-generator',
    'salary-negotiation-email-generator',
    'linkedin-bio-generator',
    'professional-bio-generator'
  )
);

insert into public.template_versions (
  tool_id,
  locale,
  version,
  name,
  tone,
  template_body,
  input_schema,
  is_active
)
select
  t.id,
  v.locale,
  1,
  v.name,
  v.tone,
  v.template_body,
  v.input_schema::jsonb,
  true
from public.tools t
join (
  values
    ('cover-letter-generator', 'en', 'Default cover letter', 'Formal', 'Dear Hiring Manager,\n\nI am writing to express my interest in the {{job_title}} position at {{company_name}}. With my background in {{main_skills}} and my {{experience_level}} level of experience, I believe I can contribute effectively to your team.\n\nI am particularly interested in this opportunity because it aligns with my professional goals and allows me to apply my skills in a meaningful way.\n\nThank you for considering my application. I would welcome the opportunity to discuss how my experience can support your team.\n\nSincerely,\n{{full_name}}', '{"fields":["full_name","job_title","company_name","experience_level","main_skills","tone","language","length"]}'),
    ('cover-letter-generator', 'es', 'Carta de presentación base', 'Formal', 'Estimado equipo de reclutamiento:\n\nMe dirijo a ustedes para expresar mi interés en la posición de {{job_title}} en {{company_name}}. Cuento con experiencia de nivel {{experience_level}} y conocimientos en {{main_skills}}, por lo que considero que puedo aportar valor al equipo.\n\nEsta oportunidad me interesa porque se alinea con mis objetivos profesionales y me permitiría aplicar mis habilidades de manera efectiva.\n\nGracias por considerar mi postulación. Quedo atento a la posibilidad de conversar sobre cómo mi experiencia puede contribuir a la empresa.\n\nAtentamente,\n{{full_name}}', '{"fields":["full_name","job_title","company_name","experience_level","main_skills","tone","language","length"]}'),

    ('job-application-email-generator', 'en', 'Default job application email', 'Formal', 'Dear Hiring Team,\n\nI hope you are doing well. I am writing to apply for the {{job_title}} position at {{company_name}}. Please find my resume attached for your review.\n\n{{attachment_note}}\n\nThank you for your time and consideration. I would welcome the opportunity to discuss my application further.\n\nBest regards,\n{{full_name}}', '{"fields":["full_name","job_title","company_name","attachment_note","tone","language"]}'),
    ('job-application-email-generator', 'es', 'Correo base para enviar CV', 'Formal', 'Estimado equipo de reclutamiento:\n\nEspero que se encuentren bien. Me dirijo a ustedes para postularme a la posición de {{job_title}} en {{company_name}}. Adjunto mi CV para su revisión.\n\n{{attachment_note}}\n\nGracias por su tiempo y consideración. Quedo atento a la posibilidad de conversar sobre mi postulación.\n\nAtentamente,\n{{full_name}}', '{"fields":["full_name","job_title","company_name","attachment_note","tone","language"]}'),

    ('follow-up-email-generator', 'en', 'Default follow-up email', 'Formal', 'Dear {{interviewer_name}},\n\nThank you again for taking the time to speak with me about the {{job_title}} position at {{company_name}} on {{interview_date}}. I appreciated the opportunity to learn more about the role and the team.\n\nI remain interested in the opportunity and would be glad to provide any additional information if needed.\n\nBest regards,\n{{full_name}}', '{"fields":["full_name","interviewer_name","job_title","company_name","interview_date","tone","language"]}'),
    ('follow-up-email-generator', 'es', 'Correo base de seguimiento', 'Formal', 'Estimado/a {{interviewer_name}}:\n\nGracias nuevamente por tomarse el tiempo de conversar conmigo sobre la posición de {{job_title}} en {{company_name}} el día {{interview_date}}. Aprecié la oportunidad de conocer más sobre el puesto y el equipo.\n\nSigo interesado/a en la oportunidad y quedo disponible para proporcionar cualquier información adicional si es necesario.\n\nAtentamente,\n{{full_name}}', '{"fields":["full_name","interviewer_name","job_title","company_name","interview_date","tone","language"]}'),

    ('recruiter-message-generator', 'en', 'Default recruiter message', 'Direct', 'Hello,\n\nMy name is {{full_name}}. I am interested in opportunities related to {{target_role}}. I have {{years_experience}} of experience and skills in {{main_skills}}.\n\nI would appreciate the opportunity to connect and learn whether there are relevant openings where my profile could be a fit.\n\nBest regards,\n{{full_name}}', '{"fields":["full_name","target_role","years_experience","main_skills","platform","tone","language"]}'),
    ('recruiter-message-generator', 'es', 'Mensaje base para reclutador', 'Directo', 'Hola,\n\nMi nombre es {{full_name}}. Estoy interesado/a en oportunidades relacionadas con {{target_role}}. Cuento con {{years_experience}} de experiencia y habilidades en {{main_skills}}.\n\nMe gustaría conectar y conocer si existen vacantes donde mi perfil pueda encajar.\n\nSaludos,\n{{full_name}}', '{"fields":["full_name","target_role","years_experience","main_skills","platform","tone","language"]}'),

    ('resignation-letter-generator', 'en', 'Default resignation letter', 'Formal', 'Dear Manager,\n\nPlease accept this letter as formal notice of my resignation from my position as {{job_title}} at {{company_name}}. My last working day will be {{last_working_day}}.\n\n{{reason_optional}}\n\nThank you for the opportunity to be part of the team. I appreciate the experience and support received during my time with the company.\n\nSincerely,\n{{full_name}}', '{"fields":["full_name","job_title","company_name","last_working_day","reason_optional","tone","language"]}'),
    ('resignation-letter-generator', 'es', 'Carta de renuncia base', 'Formal', 'Estimado/a supervisor/a:\n\nPor medio de la presente, presento formalmente mi renuncia a mi posición de {{job_title}} en {{company_name}}. Mi último día laboral será {{last_working_day}}.\n\n{{reason_optional}}\n\nAgradezco la oportunidad de haber formado parte del equipo, así como la experiencia y el apoyo recibidos durante mi tiempo en la empresa.\n\nAtentamente,\n{{full_name}}', '{"fields":["full_name","job_title","company_name","last_working_day","reason_optional","tone","language"]}'),

    ('salary-negotiation-email-generator', 'en', 'Default salary negotiation email', 'Formal', 'Dear Hiring Team,\n\nThank you for offering me the {{job_title}} position at {{company_name}}. I appreciate the opportunity and remain very interested in joining the team.\n\nBefore moving forward, I would like to discuss the compensation package to better align it with the responsibilities of the role, my experience, and my target range of {{target_range}}.\n\nThank you for your consideration. I look forward to your feedback.\n\nBest regards,\n{{full_name}}', '{"fields":["full_name","job_title","company_name","current_offer","target_range","reason","tone","language"]}'),
    ('salary-negotiation-email-generator', 'es', 'Email base para negociar salario', 'Formal', 'Estimado equipo de reclutamiento:\n\nGracias por ofrecerme la posición de {{job_title}} en {{company_name}}. Aprecio mucho la oportunidad y mantengo mi interés en formar parte del equipo.\n\nAntes de avanzar, me gustaría conversar sobre el paquete de compensación para alinearlo mejor con las responsabilidades del puesto, mi experiencia y mi rango deseado de {{target_range}}.\n\nGracias por su consideración. Quedo atento/a a sus comentarios.\n\nAtentamente,\n{{full_name}}', '{"fields":["full_name","job_title","company_name","current_offer","target_range","reason","tone","language"]}'),

    ('linkedin-bio-generator', 'en', 'Default LinkedIn bio', 'Formal', 'I am {{full_name}}, a professional focused on {{current_role}} with experience in {{main_skills}}. My work is centered on delivering practical results, improving processes, and contributing to teams with a clear and professional approach.', '{"fields":["full_name","current_role","main_skills","tone","language"]}'),
    ('linkedin-bio-generator', 'es', 'Bio base para LinkedIn', 'Formal', 'Soy {{full_name}}, profesional enfocado/a en {{current_role}} con experiencia en {{main_skills}}. Mi trabajo se centra en aportar resultados prácticos, mejorar procesos y contribuir a equipos con un enfoque claro y profesional.', '{"fields":["full_name","current_role","main_skills","tone","language"]}'),

    ('professional-bio-generator', 'en', 'Default professional bio', 'Formal', '{{full_name}} is a professional with experience in {{main_skills}} and a focus on {{current_role}}. This background supports a practical, organized, and results-oriented approach to professional work.', '{"fields":["full_name","current_role","main_skills","tone","language"]}'),
    ('professional-bio-generator', 'es', 'Bio profesional base', 'Formal', '{{full_name}} es un/a profesional con experiencia en {{main_skills}} y enfoque en {{current_role}}. Esta trayectoria respalda una forma de trabajo práctica, organizada y orientada a resultados.', '{"fields":["full_name","current_role","main_skills","tone","language"]}')
) as v(slug, locale, name, tone, template_body, input_schema)
on t.slug = v.slug;

commit;

-- Validation queries
select count(*) as total_tools from public.tools;
select count(*) as total_translations from public.tool_translations;
select count(*) as total_templates from public.template_versions;
