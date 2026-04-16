import { Component } from '@angular/core';
import { TarjetaComponent } from './tarjeta/tarjeta';
import { TarjetaService } from './tarjeta/service/tarjeta.service';
import { Tarjeta as tarjetaModel } from './tarjeta/model/tarjeta.model';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaComponent, FormsModule, CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  tarjetas: tarjetaModel[] = [];
  tarjetaSeleccionada: tarjetaModel | null = null;

  nombre = '';
  edad: number | null = null;
  descripcion = '';
  imagen = '';

  defaultImage = 'https://placehold.co/300x180?text=Sin+Imagen';

  // errores
  errorNombre = '';
  errorEdad = '';
  errorDescripcion = '';

  constructor(private servicio: TarjetaService) {
    this.tarjetas = this.servicio.obtener();
  }

  agregar() {

    // limpiar errores
    this.errorNombre = '';
    this.errorEdad = '';
    this.errorDescripcion = '';

    let hayError = false;

    if (!this.nombre.trim()) {
      this.errorNombre = 'El nombre es obligatorio';
      hayError = true;
    }

    if (!this.edad || this.edad <= 0) {
      this.errorEdad = 'La edad debe ser mayor a 0';
      hayError = true;
    }

    if (!this.descripcion.trim()) {
      this.errorDescripcion = 'La descripción es obligatoria';
      hayError = true;
    } else if (this.descripcion.split(' ').length > 100) {
      this.errorDescripcion = 'Máximo 100 palabras';
      hayError = true;
    }

    if (hayError) return;

    const nueva: tarjetaModel = {
      nombre: this.nombre,
      edad: this.edad!,
      descripcion: this.descripcion,
      imagen: this.imagen.trim() || this.defaultImage,
      likes: 0
    };

    this.tarjetas.push(nueva);
    this.servicio.guardar(this.tarjetas);

    // limpiar
    this.nombre = '';
    this.edad = null;
    this.descripcion = '';
    this.imagen = '';

    this.cerrarFormulario();
  }

  darLike(tarjeta: tarjetaModel) {
    tarjeta.likes++;
    this.servicio.guardar(this.tarjetas);
  }

  limitarCaracteres(texto: string, max: number): string {
    if (!texto) return '';
    return texto.length > max ? texto.slice(0, max) : texto;
  }

  abrirTarjeta(t: tarjetaModel) {
    this.tarjetaSeleccionada = t;
  }

  cerrarModal() {
    this.tarjetaSeleccionada = null;
  }

  modalFormularioAbierto = false;

  abrirFormulario() {
    this.modalFormularioAbierto = true;
  }

  cerrarFormulario() {
    this.modalFormularioAbierto = false;
  }
}