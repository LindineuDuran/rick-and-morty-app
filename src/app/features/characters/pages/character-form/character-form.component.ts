import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../../../core/services/character.service';
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
  characterId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.characterId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.characterId;

    this.form = this.fb.group({
      name: ['', Validators.required],
      status: [''],
      species: [''],
      type: [''],
      gender: [''],
      image: [''],
      origin: this.fb.group({
        name: [''],
      }),
      location: this.fb.group({
        name: [''],
      }),
    });

    if (this.isEditMode) {
      this.loadCharacter();
    } else {
      this.prefillFakeCharacter();
    }
  }

  loadCharacter() {
    this.characterService.getCharacterById(this.characterId!).subscribe({
      next: (character: Character) => {
        this.form.patchValue(character);
      },
      error: (err) => {
        console.error('Erro ao carregar personagem:', err);
      },
    });
  }

  prefillFakeCharacter() {
    this.form.patchValue({
      name: ['AAA'],
      status: ['BBB'],
      species: [''],
      type: [''],
      gender: [''],
      image: [''],
      origin: this.fb.group({
        name: [''],
      }),
      location: this.fb.group({
        name: [''],
      }),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = this.form.value;

      if (this.isEditMode) {
        // Simula edição
        console.log('🛠 Editando personagem:', payload);
      } else {
        // Simula criação
        console.log('✨ Criando novo personagem:', payload);
      }

      // Simula navegação após salvar
      setTimeout(() => {
        alert(this.isEditMode ? 'Personagem atualizado com sucesso!' : 'Personagem criado com sucesso!');
        this.router.navigate(['/characters']);
      }, 500);
    } else {
      alert('Formulário inválido!');
    }
  }

  onCancel() {
  this.router.navigate(['/characters']);
}
}
