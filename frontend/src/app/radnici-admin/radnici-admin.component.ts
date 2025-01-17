import { Component, OnInit } from '@angular/core';
import { RadnikService } from '../services/radnik.service';
import { AgencijaService } from '../services/agencija.service';
import { Agencija } from '../models/agencija';
import { Radnik } from '../models/radnik';
import { ProveraService } from '../services/provera.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-radnici-admin',
  templateUrl: './radnici-admin.component.html',
  styleUrls: ['./radnici-admin.component.css'],
})
export class RadniciAdminComponent implements OnInit {
  constructor(
    private radnikServis: RadnikService,
    private agencijaServis: AgencijaService,
    private proveraServis: ProveraService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    let korisnickoIme = sessionStorage.getItem('agencijaRadnici');

    this.agencijaServis
      .dohvatiAgenciju(korisnickoIme)
      .subscribe((agencija: Agencija) => {
        this.agencija = agencija;
      });

    this.radnikServis
      .dohvatiRadnikeAgencije(korisnickoIme)
      .subscribe((radnici: Radnik[]) => {
        this.radnici = radnici;
      });
  }

  odobriZahtev() {
    this.agencijaServis
      .azurirajPodatak(
        this.agencija.korisnickoIme,
        'kapacitetRadnika',
        this.agencija.zahtev + this.agencija.kapacitetRadnika
      )
      .subscribe((agencija: Agencija) => {
        this.agencija.kapacitetRadnika =
          this.agencija.zahtev + this.agencija.kapacitetRadnika;
        this.agencija.zahtev = 0;
      });
    this.agencijaServis
      .azurirajPodatak(this.agencija.korisnickoIme, 'zahtev', 0)
      .subscribe((agencija: Agencija) => {
        alert('Uspesno ste odobrili zahtev!');
      });
  }

  odbijZahtev() {
    this.agencijaServis
      .azurirajPodatak(this.agencija.korisnickoIme, 'zahtev', 0)
      .subscribe((agencija: Agencija) => {
        this.agencija.zahtev = 0;
        alert('Uspesno ste odbili zahtev!');
      });
  }

  obrisiRadnika(radnik: Radnik) {
    this.radnikServis.obrisiRadnika(radnik._id).subscribe((radnik: Radnik) => {
      this.radnikServis
        .dohvatiRadnikeAgencije(this.agencija.korisnickoIme)
        .subscribe((radnici: Radnik[]) => {
          this.radnici = radnici;
        });
    });
  }

  izmeniRadnika(radnik: Radnik) {
    this.radnikServis.azurirajRadnika(radnik).subscribe((radnik: Radnik) => {
      this.radnikServis
        .dohvatiRadnikeAgencije(this.agencija.korisnickoIme)
        .subscribe((radnici: Radnik[]) => {
          this.radnici = radnici;
        });
    });
    this.rezimIzmene = false;
  }

  async dodajRadnika() {
    const radnik = {
      telefon: this.telefon,
      mejl: this.mejl,
      ime: this.ime,
      prezime: this.prezime,
    };

    let provera = await this.proveraServis.proveraRadnik(radnik);
    if (provera != 'ok') {
      this.greska = provera;
      return;
    }
    this.radnikServis
      .dodajRadnika(
        this.ime,
        this.prezime,
        this.mejl,
        this.telefon,
        this.specijalizacija,
        this.agencija.korisnickoIme
      )
      .subscribe((radnik: Radnik) => {
        alert('Uspesno ste dodali radnika!');
        this.radnikServis
          .dohvatiRadnikeAgencije(this.agencija.korisnickoIme)
          .subscribe((radnici: Radnik[]) => {
            this.radnici = radnici;
          });
      });

    this.ime = '';
    this.prezime = '';
    this.mejl = '';
    this.telefon = '';
    this.specijalizacija = '';
    this.greska = '';
  }

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }

  radnici: Radnik[] = [];
  agencija: Agencija = new Agencija();

  rezimIzmene: boolean = false;

  ime: string = '';
  prezime: string = '';
  mejl: string = '';
  telefon: string = '';
  specijalizacija: string = '';

  greska: string = '';
}
