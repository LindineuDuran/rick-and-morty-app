import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../../../core/models/character.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      species: [''],
      image: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      // Simula preenchimento de dados para edição
      this.form.patchValue({
        name: 'Nome Exemplo',
        species: 'Humano',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
      });
    }
  }

  onSubmit(): void {
    const newCharacter: Character = this.form.value;
    console.log(this.isEditMode ? 'Editado:' : 'Criado:', newCharacter);
    this.router.navigateByUrl('/');
  }
}
