import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
    import('./authorization/iniciarsesion/iniciarsesion.component').then((c) => c.IniciarsesionComponent)
  },
  {
    path: 'citas',
    loadComponent: () =>
      import('./admisiones/citas/citas.component').then((c) => c.CitasComponent)
  },
  {
    path: 'pacientes',
    loadComponent: () =>
      import('./admisiones/pacientes/pacientes.component').then((c) => c.PacientesComponent)
  },
  {
    path: 'triage',
    loadComponent: () =>
      import('./admisiones/triage/triage.component').then((c) => c.TriageComponent)
  },
  {
    path: 'admision',
    loadComponent: () =>
      import('./admisiones/admision/admision.component').then((c) => c.AdmisionComponent)
  },
  {
    path: 'digiturno',
    loadComponent: () =>
      import('./admisiones/digiturno/digiturno.component').then((c) => c.DigiturnoComponent)
  },
  {
    path: 'laboratorio',
    loadComponent: () =>
      import('./admisiones/laboratorio/laboratorio.component').then((c) => c.LaboratorioComponent)
  },
  {
    path: 'colposcopias',
    loadComponent: () =>
      import('./procedimientos/colposcopia/colposcopia.component').then((c) => c.ColposcopiaComponent)
  },

  {
    path: 'inventario',
    loadComponent: () =>
      import('./inventarios/inventario/inventario.component').then((c) => c.InventarioComponent)
  },
  {
    path: 'kardex',
    loadComponent: () =>
      import('./inventarios/kardex/kardex.component').then((c) => c.KardexComponent)
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./authorization/usuarios/usuarios.component').then((c) => c.UsuariosComponent)
  },
  {
    path: 'hc/:documento',
    loadComponent: () =>
      import('./procedimientos/historialpaciente/historialpaciente.component').then((c) => c.HistorialpacienteComponent)
  },

  {
    path: 'pagos',
    loadComponent: () =>
      import('./contabilidad/pagos/pagos.component').then((c) => c.PagosComponent)
  },
  {
    path: 'gastos',
    loadComponent: () =>
      import('./contabilidad/gastos/gastos.component').then((c) => c.GastosComponent)
  },
  {
    path: 'finanzas',
    loadComponent: () =>
      import('./contabilidad/finanzas/finanzas.component').then((c) => c.FinanzasComponent)
  },
  {
    path: 'reportes',
    loadComponent: () =>
      import('./reportes/reporte/reporte.component').then((c) => c.ReporteComponent)
  },

  {
    path: 'inicio',
    loadComponent: () =>
      import('./authorization/inicio/inicio.component').then((c) => c.InicioComponent)
  },
  {
    path: 'permisos',
    loadComponent: () =>
      import('./authorization/permisousuario/permisousuario.component').then((c) => c.PermisousuarioComponent)
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./inventarios/productos/productos.component').then((c) => c.ProductosComponent)
  },

  {
    path: 'ecografias',
    loadComponent: () =>
      import('./ecografias/ecografia/ecografia.component').then((c) => c.EcografiaComponent)
  },
  {
    path: 'ecografiaprostatica',
    loadComponent: () =>
      import('./ecografias/ecografiaprostatica/ecografiaprostatica.component').then((c) => c.EcografiaprostaticaComponent)
  },
  {
    path: 'ecografiatransvaginal',
    loadComponent: () =>
      import('./ecografias/ecografiatransvaginal/ecografiatransvaginal.component').then((c) => c.EcografiatransvaginalComponent)
  },
  {
    path: 'ecografiapelvica',
    loadComponent: () =>
      import('./ecografias/ecografiapelvica/ecografiapelvica.component').then((c) => c.EcografiapelvicaComponent)
  },
  {
    path: 'ecografiagenetica',
    loadComponent: () =>
      import('./ecografias/ecografiagenetica/ecografiagenetica.component').then((c) => c.EcografiageneticaComponent)
  },
  {
    path: 'ecografiaobstetrica',
    loadComponent: () =>
      import('./ecografias/ecografiaobstetrica/ecografiaobstetrica.component').then((c) => c.EcografiaobstetricaComponent)
  },
  {
    path: 'ecografiamorfologica',
    loadComponent: () =>
      import('./ecografias/ecografiamorfologica/ecografiamorfologica.component').then((c) => c.EcografiamorfologicaComponent)
  },
  {
    path: 'ecografiarenal',
    loadComponent: () =>
      import('./ecografias/ecografiarenal/ecografiarenal.component').then((c) => c.EcografiarenalComponent)
  },
  {
    path: 'ecografiabdominal',
    loadComponent: () =>
      import('./ecografias/ecografiaabdominal/ecografiaabdominal.component').then((c) => c.EcografiaabdominalComponent)
  },
  {
    path: 'ecografiatiroides',
    loadComponent: () =>
      import('./ecografias/ecografiatiroides/ecografiatiroides.component').then((c) => c.EcografiatiroidesComponent)
  },
  {
    path: 'ecografiahisterosonografia',
    loadComponent: () =>
      import('./ecografias/ecografiahisterosonografia/ecografiahisterosonografia.component').then((c) => c.EcografiahisterosonografiaComponent)
  },
  {
    path: 'ecografiaarterial',
    loadComponent: () =>
      import('./ecografias/ecografiaarterial/ecografiaarterial.component').then((c) => c.EcografiaarterialComponent)
  },
  {
    path: 'ecografiavenosa',
    loadComponent: () =>
      import('./ecografias/ecografiavenosa/ecografiavenosa.component').then((c) => c.EcografiavenosaComponent)
  },
];
