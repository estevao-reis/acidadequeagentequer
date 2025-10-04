export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/40 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-foreground">
              &copy; {currentYear} A Cidade Que A Gente Quer
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Planejando o Futuro
            </p>
          </div>

          {/* Créditos */}
          <div className="text-center md:text-right">
            <p className="text-xs text-muted-foreground">
              Uma iniciativa de <span className="font-medium">Estevão Reis</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Desenvolvido por <span className="font-medium">Eduardo Dourado</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
); }