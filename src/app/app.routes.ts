import { Routes } from '@angular/router';
import { IniciarsesionComponent } from './authorization/iniciarsesion/iniciarsesion.component';
import { PacientesComponent } from './admisiones/pacientes/pacientes.component';
import { TriageComponent } from './admisiones/triage/triage.component';
import { AdmisionComponent } from './admisiones/admision/admision.component';
import { LaboratorioComponent } from './admisiones/laboratorio/laboratorio.component';
import { ColposcopiaComponent } from './procedimientos/colposcopia/colposcopia.component';
import { EcografiaComponent } from './ecografias/ecografia/ecografia.component';
import { InventarioComponent } from './inventarios/inventario/inventario.component';
import { KardexComponent } from './inventarios/kardex/kardex.component';
import { UsuariosComponent } from './authorization/usuarios/usuarios.component';
import { HistorialpacienteComponent } from './procedimientos/historialpaciente/historialpaciente.component';
import { PagosComponent } from './contabilidad/pagos/pagos.component';
import { GastosComponent } from './contabilidad/gastos/gastos.component';
import { FinanzasComponent } from './contabilidad/finanzas/finanzas.component';
import { ReporteComponent } from './reportes/reporte/reporte.component';
import { InicioComponent } from './authorization/inicio/inicio.component';
import { ProductosComponent } from './inventarios/productos/productos.component';
import { CitasComponent } from './admisiones/citas/citas.component';

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
    path: 'ecografias',
    loadComponent: () =>
      import('./ecografias/ecografia/ecografia.component').then((c) => c.EcografiaComponent)
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
    path: 'productos',
    loadComponent: () =>
      import('./inventarios/productos/productos.component').then((c) => c.ProductosComponent)
  },
  {
    path: 'doctores',
    loadComponent: () =>
      import('./authorization/doctores/doctores.component').then((c) => c.DoctoresComponent)
  },

];
