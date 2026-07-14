type AuthMessageProps = Readonly<{
  message?: string;
  error?: string;
  detail?: string;
  locale: "en" | "es";
}>;

const messages = {
  en: {
    check_email: "Check your email to confirm your account before signing in.",
    signed_out: "You have been signed out.",
    reset_sent: "Password reset instructions were sent if the email exists.",
    password_updated: "Your password was updated.",
    profile_updated: "Your profile was updated."
  },
  es: {
    check_email: "Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.",
    signed_out: "Cerraste sesión correctamente.",
    reset_sent: "Las instrucciones para recuperar contraseña fueron enviadas si el correo existe.",
    password_updated: "Tu contraseña fue actualizada.",
    profile_updated: "Tu perfil fue actualizado."
  }
};

const errors = {
  en: {
    supabase_not_configured: "Supabase is not configured. Add your environment variables first.",
    missing_credentials: "Enter your email and password.",
    invalid_credentials: "The email or password is incorrect.",
    invalid_signup: "Enter a valid email and a password with at least 6 characters.",
    signup_failed: "The account could not be created.",
    signups_disabled: "New signups are disabled in Supabase Auth settings.",
    user_already_registered: "This email is already registered. Try signing in instead.",
    profile_trigger_failed: "Supabase created the auth request but failed while creating the user profile. Review the profiles trigger and table structure.",
    invalid_email: "Use a valid email address.",
    missing_email: "Enter your email.",
    reset_failed: "The password reset email could not be sent.",
    invalid_password: "Use a password with at least 6 characters.",
    update_failed: "The password could not be updated.",
    login_required: "Sign in to continue.",
    profile_update_failed: "Your profile could not be updated."
  },
  es: {
    supabase_not_configured: "Supabase no está configurado. Agrega primero las variables de entorno.",
    missing_credentials: "Escribe tu correo y contraseña.",
    invalid_credentials: "El correo o la contraseña no son correctos.",
    invalid_signup: "Escribe un correo válido y una contraseña de al menos 6 caracteres.",
    signup_failed: "No se pudo crear la cuenta.",
    signups_disabled: "Los registros nuevos están desactivados en Supabase Auth.",
    user_already_registered: "Este correo ya está registrado. Intenta iniciar sesión.",
    profile_trigger_failed: "Supabase recibió el registro, pero falló al crear el perfil del usuario. Revisa el trigger y la tabla profiles.",
    invalid_email: "Usa un correo válido.",
    missing_email: "Escribe tu correo.",
    reset_failed: "No se pudo enviar el correo de recuperación.",
    invalid_password: "Usa una contraseña de al menos 6 caracteres.",
    update_failed: "No se pudo actualizar la contraseña.",
    login_required: "Inicia sesión para continuar.",
    profile_update_failed: "No se pudo actualizar tu perfil."
  }
};

export function AuthMessage({ message, error, detail, locale }: AuthMessageProps) {
  if (!message && !error) {
    return null;
  }

  const text = error
    ? errors[locale][error as keyof (typeof errors)[typeof locale]] ?? errors[locale].login_required
    : messages[locale][message as keyof (typeof messages)[typeof locale]] ?? message;

  return (
    <div
      className={`mb-5 rounded-2xl border px-4 py-3 text-sm ${
        error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      <p>{text}</p>
      {detail ? <p className="mt-2 text-xs opacity-80">{detail}</p> : null}
    </div>
  );
}
