import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../../core/models/character.model';

@Component({
  standalone: true,
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
  imports: [CommonModule],
})
export class CharacterCardComponent {
  @Input() character!: Character;

  @Output() view = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Character>();

  // Evento de clique no botão "Editar"
  onEditClick(): void {
    this.edit.emit(this.character);
  }

  onCardClick(): void {
    this.view.emit(this.character.id);
  }
}