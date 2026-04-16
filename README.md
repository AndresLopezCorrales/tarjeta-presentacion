# 🃏 Tarjetas App — Angular

Aplicación web construida con **Angular** para crear, visualizar y dar "like" a tarjetas de perfiles. Los datos se persisten en el navegador usando `localStorage`.

---

## 📋 Funcionalidades

- **Crear tarjetas** con nombre, edad, descripción e imagen opcional.
- **Validación de formulario** con mensajes de error en tiempo real.
- **Dar like** a tarjetas individuales (contador persistente).
- **Ver detalle** de una tarjeta en un modal.
- **Persistencia local** — las tarjetas se guardan en `localStorage` y sobreviven recargas de página.
- **Imagen por defecto** si el usuario no proporciona una URL.

---

## 🧩 Componentes y Responsabilidades

### `App` (componente raíz)
- Gestiona el array de tarjetas y el estado de los modales.
- Contiene la lógica de agregar tarjetas con validación.
- Se comunica con `TarjetaService` para persistir los datos.
- Escucha los eventos `(like)` y `(ver)` emitidos por `TarjetaComponent`.

### `TarjetaComponent`
- Componente de presentación ("dumb component").
- Recibe una tarjeta vía `@Input()`.
- Emite eventos `@Output()` al padre: `like` y `ver`.
- No maneja lógica de negocio directamente.

### `TarjetaService`
- Servicio inyectable (`providedIn: 'root'`).
- Abstrae el acceso a `localStorage` con dos métodos simples:
  - `obtener()` — deserializa y devuelve el array de tarjetas.
  - `guardar(tarjetas)` — serializa y persiste el array.

---

## 🗂️ Modelo de Datos

```typescript
interface Tarjeta {
  nombre: string;
  edad: number;
  descripcion: string;
  imagen: string;    // URL o imagen por defecto
  likes: number;
}
```

---

## ✅ Validaciones del Formulario

| Campo        | Regla                                      |
|--------------|--------------------------------------------|
| `nombre`     | Obligatorio (no puede estar vacío)         |
| `edad`       | Obligatoria y debe ser mayor a 0           |
| `descripcion`| Obligatoria y máximo **100 palabras**      |
| `imagen`     | Opcional — se usa imagen placeholder si no se proporciona |

---

## 🚀 Instalación y Uso

### Requisitos
- Node.js >= 18
- Angular CLI >= 17

### Pasos

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd tarjetas-app

# Instalar dependencias
npm install

# Levantar servidor de desarrollo
ng serve
```

Abre tu navegador en `http://localhost:4200`.

---

## 🛠️ Tecnologías

| Tecnología     | Versión  | Uso                              |
|----------------|----------|----------------------------------|
| Angular         | 17+      | Framework principal              |
| TypeScript      | 5+       | Tipado estático                  |
| FormsModule     | —        | Two-way binding (`ngModel`)      |
| CommonModule    | —        | Directivas `*ngIf`, `*ngFor`     |
| localStorage    | Web API  | Persistencia de datos            |

---

## 📝 Notas

- Los datos **no se sincronizan entre dispositivos** ya que usan `localStorage`.
- El límite de 100 palabras en la descripción se valida contando tokens separados por espacio (`split(' ')`).
- El proyecto usa **standalone components** (sin `NgModule`).