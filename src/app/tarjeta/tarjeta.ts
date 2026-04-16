import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarjeta } from './model/tarjeta.model';

@Component({
  selector: 'app-tarjeta',
  imports: [],
  templateUrl: './tarjeta.html',
  styleUrl: './tarjeta.css',
})
export class TarjetaComponent {

  @Input() tarjeta!: Tarjeta;

  @Output() like = new EventEmitter<void>();
  @Output() ver = new EventEmitter<void>();

  darLike() {
    this.like.emit();
  }

  abrir() {
    this.ver.emit();
  }

}