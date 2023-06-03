import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Radnik } from '../models/radnik';

@Injectable({
  providedIn: 'root',
})
export class RadnikService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000';

  dohvatiRadnikeAgencije(agencija: string) {
    return this.http.post(`${this.url}/radnik/dohvatiRadnikeAgencije`, {
      agencija: agencija,
    });
  }

  azurirajRadnika(radnik: Radnik) {
    return this.http.post(`${this.url}/radnik/azurirajRadnika`, radnik);
  }

  dodajRadnika(
    ime: string,
    prezime: string,
    mejl: string,
    telefon: string,
    specijalizacija: string,
    agencija: string
  ) {
    return this.http.post(`${this.url}/radnik/dodajRadnika`, {
      ime: ime,
      prezime: prezime,
      mejl: mejl,
      telefon: telefon,
      specijalizacija: specijalizacija,
      agencija: agencija,
      zauzet: false,
    });
  }

  obrisiRadnika(id: string) {
    return this.http.post(`${this.url}/radnik/obrisiRadnika`, { id: id });
  }
}
