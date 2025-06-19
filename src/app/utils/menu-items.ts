// menu.model.ts

export interface MenuItem {
  title: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
  role?: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "layout-dashboard",
    role: ["ADMIN", "USER"]
  },
  {
    title: "Principal",
    icon: "grid",
    children: [
      { title: "Usuarios", path: "/usuarios", icon: "users", role: ["ADMIN"] },
      { title: "Alimento", path: "/Alimento/Alimento", icon: "utensils", role: ["ADMIN", "USER"] },
      { title: "Casa", path: "/Casa/casa", icon: "home", role: ["ADMIN", "USER"] },
      { title: "Vacunas", path: "/Vacunas/vacunas", icon: "syringe", role: ["ADMIN", "USER"] },
      { title: "Proveedor", path: "/Maestros Proveedor/Proveedor", icon: "truck", role: ["ADMIN", "USER"] },
      { title: "Ubicaciones", path: "/Maestros Ubicaciones/Ubicaciones", icon: "map-pin", role: ["ADMIN", "USER"] },
      { title: "Tipo-Proveedores", path: "/Maestros Proveedores/Proveedores", icon: "tag", role: ["ADMIN", "USER"] },
      { title: "Shed", path: "/Maestros Shed/shed", icon: "home", role: ["ADMIN", "USER"] },
      { title: "Productos", path: "/Maestros Productos/productos", icon: "package", role: ["ADMIN", "USER"] },
      { title: "Gallinas", path: "/Maestros Gallinas/gallinas", icon: "feather", role: ["ADMIN", "USER"] },
      { title: "Producción de huevos", path: "/Produción de huevo/huevos", icon: "egg", role: ["ADMIN", "USER"] },
    ],
  },
  {
    title: "Funcionalidades",
    icon: "layers",
    children: [
     { title: "Aplicación Vacunas", path: "/Modulo-Galpon/vaccineApliocations", icon: "syringe", role: ["ADMIN", "USER"] },
      { title: "Ventas", path: "/ventas/ventas", icon: "shopping-cart", role: ["ADMIN", "USER"] },
      { title: "Ciclo de vida", path: "/Ciclo de vida/ciclo vida", icon: "repeat", role: ["ADMIN", "USER"] },
      { title: "Costo adicional", path: "/COSTO ADICIONAL/costo adicional", icon: "dollar-sign", role: ["ADMIN", "USER"] },
      { title: "Costo alimento", path: "/Costo de alimento/costo alimento", icon: "utensils", role: ["ADMIN", "USER"] },
      { title: "Consumo Interno", path: "/Consumo/consumo-interno", icon: "activity", role: ["ADMIN", "USER"] },
      { title: "Materias Primas", path: "/KARDEX/Kardex Materias Primas", icon: "box", role: ["ADMIN", "USER"] },
      { title: "Procesos", path: "/KARDEX/Kardex de Procesos", icon: "settings", role: ["ADMIN", "USER"] },
      { title: "Huevos", path: "/KARDEX/Kardex", icon: "egg", role: ["ADMIN", "USER"] },

    ],
  },
];
