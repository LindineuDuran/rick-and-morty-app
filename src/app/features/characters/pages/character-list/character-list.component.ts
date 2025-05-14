import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { CharacterState } from '../../state/character.state';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [NgFor, CharacterCardComponent, FormsModule],
  templateUrl: 'character-list.component.html',
  styleUrls: ['character-list.component.css'],
  providers: [CharacterState]
})
export class CharacterListComponent {
  constructor(
    public state: CharacterState,
    private router: Router
  ) {}

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.state.search(value);
  }

  onScrollEnd() {
    this.state.loadMore();
  }

  viewDetails(characterId: number) {
    this.router.navigate(['/character', characterId]);
  }

  editCharacter(character: any) {
    this.router.navigate(['/edit', character.id]);
  }

  createNewCharacter() {
    this.router.navigate(['/create']);
  }
}
