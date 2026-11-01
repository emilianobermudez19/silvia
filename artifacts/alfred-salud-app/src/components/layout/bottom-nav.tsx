import { MessageCircle, Pill, Leaf, Clock, FileText } from "lucide-react";
import { Link, useLocation } from "wouter";

export function BottomNav() {
  const [location] = useLocation();

  const tabs = [
    { href: "/", label: "Consulta", icon: MessageCircle },
    { href: "/medicamentos", label: "Medicamentos", icon: Pill },
    { href: "/herbolaria", label: "Herbolaria", icon: Leaf },
    { href: "/recordatorios", label: "Recordatorios", icon: Clock },
    { href: "/receta", label: "Receta", icon: FileText },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-[430px] bg-card border-t border-border flex justify-around py-2 px-1 z-50 rounded-b-3xl sm:rounded-none shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => {
        const isActive = location === tab.href;
        const Icon = tab.icon;
        
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center w-16 h-12 gap-1 rounded-xl transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground hover:bg-muted/50"
            }`}
            data-testid={`nav-${tab.label.toLowerCase()}`}
          >
            <div className={`p-1 rounded-full ${isActive ? 'bg-primary/10' : ''}`}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium tracking-tight leading-none">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
