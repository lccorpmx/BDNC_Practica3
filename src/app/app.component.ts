import { Component, OnInit } from '@angular/core';
import { PersonaService } from './service/persona.service';
import { Persona } from './models/persona.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  personas: Persona[] = [];
  currentPersona: Persona = { id: '', nombre: '', direccion: '', telefono: '' };

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.personaService.getPersonas().subscribe(data => {
      this.personas = data;
    });
  }

  addPersona(): void {
    this.personaService.addPersona(this.currentPersona).subscribe(() => {
      this.loadPersonas();
      this.resetForm();
    });
  }

  updatePersona(): void {
    this.personaService.updatePersona(this.currentPersona.id, this.currentPersona).subscribe(() => {
      this.loadPersonas();
      this.resetForm();
    });
  }

  deletePersona(id: string): void {
    this.personaService.deletePersona(id).subscribe(() => {
      this.loadPersonas();
    });
  }

  setEditPersona(persona: Persona): void {
    this.currentPersona = { ...persona };
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.currentPersona = { id: '', nombre: '', direccion: '', telefono: '' };
  }
  buscarPersona(): void {
    if (this.currentPersona.id) {
      this.personaService.getPersona(this.currentPersona.id).subscribe(persona => {
        if (persona) {
          this.currentPersona = persona;
        } else {
          this.resetForm();
          alert('Persona no encontrada');
        }
      });
    } else {
      alert('Por favor ingrese un ID');
    }
  }


}
