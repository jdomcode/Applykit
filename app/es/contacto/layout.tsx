import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function SpanishContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header locale="es" />
      <main className="flex-1">{children}</main>
      <Footer locale="es" />
    </div>
  );
}
