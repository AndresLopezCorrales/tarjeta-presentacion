import { Injectable } from '@angular/core';
import { Tarjeta } from '../model/tarjeta.model';

@Injectable({
    providedIn: 'root'
})
export class TarjetaService {

    private key = 'tarjetas';

    obtener(): Tarjeta[] {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    guardar(tarjetas: Tarjeta[]) {
        localStorage.setItem(this.key, JSON.stringify(tarjetas));
    }
}