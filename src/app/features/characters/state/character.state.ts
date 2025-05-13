import { computed, effect, signal } from '@angular/core';
import { inject } from '@angular/core';
import { Character } from '../../../core/models/character.model';
import { CharacterService } from '../../../core/services/character.service';

export class CharacterState {
  private characterService = inject(CharacterService);

  readonly characters = signal<Character[]>([]);
  readonly page = signal(1);
  readonly loading = signal(false);
  readonly searchTerm = signal('');

  readonly filteredCharacters = computed(() => this.characters());

  constructor() {
    effect(() => {
      this.fetchCharacters();
    });
  }

  fetchCharacters() {
    this.loading.set(true);
    this.characterService.getCharacters(this.page(), this.searchTerm()).subscribe({
      next: (response) => {
        const current = this.page() === 1 ? [] : this.characters();
        this.characters.set([...current, ...response.results]);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  loadMore() {
    this.page.set(this.page() + 1);
    this.fetchCharacters();
  }

  search(name: string) {
    this.page.set(1);
    this.characters.set([]);
    this.searchTerm.set(name);
    this.fetchCharacters();
  }
}
