import { Routes } from "@angular/router";
import { AuthGuard } from "./auth/guards/auth.guard";
import { ProfileComponent } from "./auth/profile/profile.component";
import { ConfigurationComponent } from "./auth/configuration/configuration.component";

export const routes: Routes = [
  // 🔹 Rutas de autenticación (No requieren autenticación)
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [AuthGuard],
    data: { public: true },
  },

  // 🔹 Rutas protegidas
  {
    path: "",
    canMatch: [AuthGuard],
    children: [
      {
        path: "dashboard",
        title: "Dashboard General",
        loadComponent: () =>
          import("./components/pages/dashboard/dashboard.component").then(
            (m) => m.DashboardComponent
          ),
      },

      /**
        ====================================================================================
        ================================== TRANSACCIONAL ===================================
        ====================================================================================
      **/

      {
        path: "Modulo-Galpon",
        canMatch: [AuthGuard],
        children: [
          {
            path: "vaccineApliocations",
            title: "Aplicacion Vacunas",
            loadComponent: () =>
              import("./components/pages/functionality/vaccineAplications/vaccine-aplications.component").then(
                (m) => m.VaccineApplicationsComponent
              ),
          },
        ],
      },

      {
        path: "ventas",
        canMatch: [AuthGuard],
        children: [
          {
            path: "ventas",
            title: "Ventas",
            loadComponent: () =>
              import("./components/pages/functionality/sale/sale.component").then(
                (m) => m.SaleComponent
              ),
          },
        ],
      },

      {
        path: "Ciclo de vida",
        canMatch: [AuthGuard],
        children: [
          {
            path: "ciclo vida",
            title: "Ciclo de vida",
            loadComponent: () =>
              import("./components/pages/functionality/lifecycle/lifecycle.component").then(
                (m) => m.LifecycleComponent
              ),
          },
        ],
      },

      {
        path: "COSTO ADICIONAL",
        canMatch: [AuthGuard],
        children: [
          {
            path: "costo adicional",
            title: "COSTO ADICIONAL",
            loadComponent: () =>
              import("./components/pages/functionality/additional-cost/additional-cost.component").then(
                (m) => m.AdditionalCostComponent
              ),
          },
        ],
      },

      {
        path: "Costo de alimento",
        canMatch: [AuthGuard],
        children: [
          {
            path: "costo alimento",
            title: "Costo de alimento",
            loadComponent: () =>
              import("./components/pages/functionality/costs-food/costs-food.component").then(
                (m) => m.CostsFoodComponent
              ),
          },
        ],
      },

      {
        path: "Consumo",
        canMatch: [AuthGuard],
        children: [
          {
            path: "consumo-interno",
            title: "consumo-interno",
            loadComponent: () =>
              import("./components/pages/functionality/consumption-internal/consumption-internal.component").then(
                (m) => m.ConsumptionInternalComponent
              ),
          },
        ],
      },

      {
        path: "KARDEX",
        canMatch: [AuthGuard],
        children: [
          {
            path: "Kardex Materias Primas",
            title: "Kardex Materias Primas",
            loadComponent: () =>
              import("./components/pages/functionality/kardex-primal/kardex-primal.component").then(
                (m) => m.KardexPrimalComponent
              ),
          },
        ],
      },

      {
        path: "KARDEX",
        canMatch: [AuthGuard],
        children: [
          {
            path: "Kardex Materias Primas",
            title: "Kardex Materias Primas",
            loadComponent: () =>
              import("./components/pages/functionality/kardex-primal/kardex-primal.component").then(
                (m) => m.KardexPrimalComponent
              ),
          },
        ],
      },


      {
        path: "KARDEX",
        canMatch: [AuthGuard],
        children: [
          {
            path: "Kardex de Procesos",
            title: "Kardex de Procesos",
            loadComponent: () =>
              import("./components/pages/functionality/kardex-process/kardex-process.component").then(
                (m) => m.KardexProcessComponent
              ),
          },
        ],
      },

      {
        path: "KARDEX",
        canMatch: [AuthGuard],
        children: [
          {
            path: "Kardex",
            title: "Kardex",
            loadComponent: () =>
              import("./components/pages/functionality/kardex-egg/kardex-egg.component").then(
                (m) => m.KardexEggComponent
              ),
          },
        ],
      },


      /**
      ====================================================================================
      ================================== MAESTROS ===================================
      ====================================================================================
      **/

      // 📌 Módulo de Usuarios (solo para ADMIN)
      {
        path: "usuarios",
        canMatch: [AuthGuard],
        data: { role: "ADMIN" }, // 👈 Rol requerido
        title: "Gestión de Usuarios",
        loadComponent: () =>
          import("./components/pages/main/users/users.component").then(
            (m) => m.UsersComponent
          ),
      },


       // 📌 Módulo de beneficiarios (Team 02)
      {
        path: "Alimento",
        canMatch: [AuthGuard],
        children: [
          {
            path: "Alimento",
            title: "Food",
            loadComponent: () =>
              import("./components/pages/main/food/food.component").then(
                (m) => m.FoodComponent
              ),
          },
        ],
      },


      {
        path: "Casa",
        canMatch: [AuthGuard],
        children: [
          {
            path: "casa",
            title: "Casa",
            loadComponent: () =>
              import("./components/pages/main/home/home.component").then(
                (m) => m.HomeComponent
              ),
          },
        ],
      },

      {
        path: "Vacunas",
        canMatch: [AuthGuard],
        children: [
          {
            path: "vacunas",
            title: "vacunas",
            loadComponent: () =>
              import("./components/pages/main/vaccine/vaccine.component").then(
                (m) => m.VaccineComponent
              ),
          },
        ],
      },

      {
        path: "Maestros Proveedor",
        canMatch: [AuthGuard],
        children: [
          {
            path: "Proveedor",
            title: "Proveedor",
            loadComponent: () =>
              import("./components/pages/main/proveedor/proveedor.component").then(
                (m) => m.ProveedorComponent
              ),
          },
        ],
      },

      {
        path: "Maestros Ubicaciones",
        canMatch: [AuthGuard],
        children: [
          {
            path: "Ubicaciones",
            title: "Ubicaciones",
            loadComponent: () =>
              import("./components/pages/main/location/location.component").then(
                (m) => m.LocationComponent
              ),
          },
        ],
      },

      {
        path: "Maestros Proveedores",
        canMatch: [AuthGuard],
        children: [
          {
            path: "Proveedores",
            title: "Tipo-Proveedores",
            loadComponent: () =>
              import("./components/pages/main/type-supplier/type-supplier.component").then(
                (m) => m.TypeSupplierComponent
              ),
          },
        ],
      },


      {
        path: "Maestros Shed",
        canMatch: [AuthGuard],
        children: [
          {
            path: "shed",
            title: "Shed",
            loadComponent: () =>
              import("./components/pages/main/shed/shed.component").then(
                (m) => m.ShedComponent
              ),
          },
        ],
      },


      {
        path: "Maestros Productos",
        canMatch: [AuthGuard],
        children: [
          {
            path: "productos",
            title: "Productos",
            loadComponent: () =>
              import("./components/pages/main/product/product.component").then(
                (m) => m.ProductComponent
              ),
          },
        ],
      },

      {
        path: "Maestros Gallinas",
        canMatch: [AuthGuard],
        children: [
          {
            path: "gallinas",
            title: "Gallinas",
            loadComponent: () =>
              import("./components/pages/main/hen/hen.component").then(
                (m) => m.HenComponent
              ),
          },
        ],
      },

      {
        path: "Produción de huevo",
        canMatch: [AuthGuard],
        children: [
          {
            path: "huevos",
            title: "Producción de huevos",
            loadComponent: () =>
              import("./components/pages/main/egg-production/egg-production.component").then(
                (m) => m.EggProductionComponent
              ),
          },
        ],
      },





      /**
        ====================================================================================
        ================================== USUARIOS ===================================
        ====================================================================================
      **/

      // 📌 Módulo de perfil
      {
        path: 'perfil',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      // 📌 Módulo de configuracion
      {
        path: 'configuracion',
        component: ConfigurationComponent,
        canActivate: [AuthGuard]
      }

    ],
  },

  // 🔹 Redirecciones
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard",
  },
  {
    path: "**",
    redirectTo: "login",
  },
];
