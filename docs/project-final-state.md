# ApplyKit Beta v1.0 - Estado final del proyecto

## Estado

ApplyKit queda cerrado temporalmente como beta estable.

Dominio principal:

- https://applykit.online

Dominio secundario:

- https://www.applykit.online, redirigido al dominio principal.

## Servicios usados

- Vercel: hosting y despliegue de Next.js.
- Supabase: Auth, PostgreSQL, RLS y datos del MVP.
- Namecheap: dominio applykit.online.
- Google AdSense: monetización inicial con anuncios manuales conservadores.
- Google Search Console: indexación y monitoreo SEO.
- GitHub: repositorio del proyecto.

## Funciones incluidas

- Web bilingüe en español e inglés.
- Rutas `/en` y `/es`.
- 8 herramientas públicas para documentos laborales.
- Generación por plantillas, sin IA externa.
- Resultado editable.
- Botón de copiar.
- Registro, login, logout y recuperación de contraseña con Supabase Auth.
- Dashboard básico.
- Guardado de documentos para usuarios autenticados.
- Historial privado de documentos.
- Marcar favoritos.
- Eliminar documentos.
- RLS en tablas privadas.
- Páginas legales: Privacy y Terms.
- Páginas de confianza: About y Contact.
- Sitemap y robots.txt.
- AdSense integrado manualmente con ubicaciones conservadoras.
- Archivo `/ads.txt`.
- Mensaje de consentimiento publicado en AdSense.
- Analítica interna básica con `usage_events`.

## Funciones excluidas por ahora

No implementar en esta etapa:

- IA externa.
- Pagos.
- Exportación PDF/DOCX.
- CV builder completo.
- Más herramientas.
- Blog grande.
- Panel admin avanzado.
- Rediseño mayor.

## Variables de entorno en Vercel

Producción:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL=https://applykit.online
NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=false
NEXT_PUBLIC_ENABLE_ADS=true
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-2860965210851539
NEXT_PUBLIC_ADSENSE_TOOL_RESULT_SLOT=5544517438
NEXT_PUBLIC_ADSENSE_CONTENT_FAQ_SLOT=2100096449
```

No agregar `SUPABASE_SERVICE_ROLE_KEY` al frontend.

## Supabase Auth URL Configuration

Site URL:

```txt
https://applykit.online
```

Redirect URLs de producción:

```txt
https://applykit.online/auth/callback
https://applykit.online/en/dashboard
https://applykit.online/es/dashboard
https://applykit.online/en/update-password
https://applykit.online/es/update-password
```

Redirect URLs locales para desarrollo:

```txt
http://localhost:3000/auth/callback
http://localhost:3000/en/dashboard
http://localhost:3000/es/dashboard
http://localhost:3000/en/update-password
http://localhost:3000/es/update-password
```

## Base de datos esperada

Tablas principales:

- profiles
- tools
- tool_translations
- template_versions
- generated_documents
- document_favorites
- feedback
- usage_events

Conteos mínimos esperados:

- tools = 8
- tool_translations = 16
- template_versions = 16

## Corrección de cierre del Día 5

Se corrigió el flujo de generación para evitar que la vista previa muestre plantillas crudas con placeholders como `{{full_name}}` cuando la generación falla.

También se alineó la validación de campos requeridos con el `input_schema` activo de Supabase. Esto evita errores como:

```txt
Complete the required fields: Use case.
```

cuando el formulario real no muestra ese campo.

Además, se pulieron las plantillas de:

- Recruiter Message Generator.
- Professional Bio Generator.

La bio profesional ahora usa correctamente `current_role`, `years_experience` y `main_skills` sin inventar datos.

## Checklist de mantenimiento semanal

Una vez por semana revisar:

- Vercel: último deploy exitoso.
- Supabase: Auth funcionando y sin errores críticos.
- AdSense: estado del sitio y `ads.txt` sin problemas.
- Search Console: cobertura, páginas indexadas y errores.
- Herramientas principales: generar, copiar, guardar.
- Mobile: header, formularios y resultado generado.
- usage_events: herramientas más usadas.

## Criterio para retomar el proyecto

Retomar ApplyKit solo si ocurre una de estas condiciones:

- Empieza a recibir tráfico orgánico constante.
- AdSense aprueba y empieza a mostrar impresiones.
- Usuarios reales piden mejoras concretas.
- Alguna herramienta demuestra mayor uso que las demás.

Próximas mejoras si funciona:

1. Mejorar contenido SEO de las herramientas más visitadas.
2. Agregar exportación PDF/DOCX.
3. Agregar mejora con IA como función premium o experimental.
4. Agregar más herramientas solo si hay demanda real.
5. Evaluar plan premium sin anuncios.
