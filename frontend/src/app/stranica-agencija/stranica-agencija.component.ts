import { Component, OnInit } from '@angular/core';
import { Agencija } from '../models/agencija';
import { AgencijaService } from '../services/agencija.service';
import { RecenzijaService } from '../services/recenzija.service';
import { Recenzija } from '../models/recenzija';
import { KlijentService } from '../services/klijent.service';
import { Objekat } from '../models/objekat';
import { ObjekatService } from '../services/objekat.service';
import { PosaoService } from '../services/posao.service';
import { Posao } from '../models/posao';
import { BlokiranaAgencija } from '../models/blokiranaAgencija';
import { BlokiranjeService } from '../services/blokiranje.service';

@Component({
  selector: 'app-stranica-agencija',
  templateUrl: './stranica-agencija.component.html',
  styleUrls: ['./stranica-agencija.component.css'],
})
export class StranicaAgencijaComponent implements OnInit {
  constructor(
    private agencijaServis: AgencijaService,
    private recenzijaServis: RecenzijaService,
    private objekatServis: ObjekatService,
    private posaoServis: PosaoService,
    private blokiranjeServis: BlokiranjeService
  ) {}

  ngOnInit(): void {
    let korisnickoIme = sessionStorage.getItem('agencijaIzbor');
    this.agencijaServis
      .dohvatiAgenciju(korisnickoIme)
      .subscribe((agencija: Agencija) => {
        this.agencija = agencija;
        this.recenzijaServis
          .dohvatiRecenzijeAgencije(agencija.korisnickoIme)
          .subscribe((recenzije: Recenzija[]) => {
            this.recenzije = recenzije;
          });
      });
    this.registrovan = sessionStorage.getItem('registrovan') == 'true';

    if (this.registrovan) {
      this.klijent = sessionStorage.getItem('korisnik');
      this.objekatServis
        .dohvatiObjekteVlasnika(this.klijent)
        .subscribe((objekti: Objekat[]) => {
          this.objekti = objekti;
          this.objekat = this.objekti[0]._id;
        });
    }

    this.posaoServis
      .dohvatiPosloveKlijenta(this.klijent)
      .subscribe((poslovi: Posao[]) => {
        this.posloviKlijenta = poslovi;
      });
    this.blokiranjeServis
      .dohvatiAgenciju(korisnickoIme)
      .subscribe((blokiranaAgencija: BlokiranaAgencija) => {
        this.blokiranaAgencija = blokiranaAgencija;
      });
  }

  objekatZauzet(idObjekat) {
    for (let posao of this.posloviKlijenta) {
      if (
        posao.idObjekat == idObjekat &&
        posao.status != 'zavrsen' &&
        posao.status != 'odbijen' &&
        posao.status != 'otkazan'
      ) {
        return true;
      }
    }

    return false;
  }

  zatraziSaradnju() {
    if (this.objekatZauzet(this.objekat)) {
      this.greska = 'Izabrani objekat se vec nalazi medju poslovima';
      return;
    }
    if (new Date(this.pocetak) < new Date()) {
      this.greska = 'Izabrani datum mora biti u buducnosti';
      return;
    }
    if (new Date(this.kraj) < new Date(this.pocetak)) {
      this.greska = 'Krajnji datum mora biti posle pocetnog';
      return;
    }
    this.posaoServis
      .ubaciPosao(
        this.klijent,
        this.agencija.korisnickoIme,
        this.objekat,
        'na cekanju',
        false,
        this.pocetak,
        this.kraj
      )
      .subscribe((posao) => {
        alert('Uspesno poslat zahtev za saradnju!');
        this.objekat = '';
        this.pocetak = new Date();
        this.kraj = new Date();
        this.greska = '';
        this.ngOnInit();
      });
  }

  agencija: Agencija = new Agencija();
  klijent: string = '';
  registrovan: boolean = false;
  recenzije: Recenzija[] = [];
  blokiranaAgencija: BlokiranaAgencija = new BlokiranaAgencija();

  objekat: string = '';
  objekti: Objekat[] = [];
  pocetak: Date = new Date();
  kraj: Date = new Date();

  posloviKlijenta: Posao[] = [];

  greska: string = '';
}
