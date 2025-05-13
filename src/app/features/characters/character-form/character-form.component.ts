import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Character } from '../../../core/models/character.model';


@Component({
  standalone: true,
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CharacterFormComponent {
  private fb = inject(FormBuilder);

  @Input() initialData?: Character | null;
  @Output() formSubmit = new EventEmitter<Partial<Character>>();
  @Output() formCancel = new EventEmitter<void>();

  characterForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    status: ['Alive'],
    species: ['Human'],
    gender: ['Male'],
    image: ['https://via.placeholder.com/150'],
  });

  ngOnInit() {
    if (this.initialData) {
      this.characterForm.patchValue(this.initialData);
    }
  }

  onSubmit() {
  if (this.characterForm.valid) {
    const cleaned = Object.fromEntries(
      Object.entries(this.characterForm.value).map(([key, value]) => [
        key,
        value === null ? undefined : value,
      ])
    );

    this.formSubmit.emit(cleaned);
  }
}

  onCancel() {
    this.formCancel.emit();
  }
}
