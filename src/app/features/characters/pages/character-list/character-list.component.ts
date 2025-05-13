import { Component, effect, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { CharacterService } from '../../../../core/services/character.service';
import { Character } from '../../../../core/models/character.model';
import { CharacterState } from '../../state/character.state';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  imports: [NgFor, CharacterCardComponent, FormsModule],
})
export class CharacterListComponent {
  state = new CharacterState();

  characters = signal<Character[]>([]);
  currentPage = signal(1);
  searchQuery = signal('');
  isLoading = signal(false);
  totalPages = signal(1);

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {
    this.loadCharacters();

    // Recarrega ao buscar
    effect(() => {
      this.loadCharacters();
    });
  }

  loadCharacters() {
    this.isLoading.set(true);
    this.characterService
      .getCharacters(this.currentPage(), this.searchQuery())
      .subscribe({
        next: (response) => {
          this.characters.set(response.results);
          this.totalPages.set(response.info.pages);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Erro ao carregar personagens:', error);
          this.characters.set([]);
          this.isLoading.set(false);
        },
      });
  }

  onSearch(event: Event) {
  const input = event.target as HTMLInputElement;
  const query = input.value;
  this.searchQuery.set(query);
  this.currentPage.set(1);
  this.loadCharacters(); // Adicionado para garantir recarregamento imediato
}


  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.loadCharacters();
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.loadCharacters();
    }
  }

  // Método chamado ao clicar no card
  viewDetails(characterId: number) {
    this.router.navigate(['/character', characterId]);
  }

  // Método chamado ao clicar no botão "Editar"
  editCharacter(character: Character) {
    this.router.navigate(['/edit', character.id]);
  }

  // Navegar para a criação de novo personagem
  createNewCharacter() {
    this.router.navigate(['/create']);
  }

  onScrollEnd() {
    this.state.loadMore();
  }
}
