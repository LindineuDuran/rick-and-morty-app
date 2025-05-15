import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../../core/services/character.service';
import { Character } from '../../../../core/models/character.model';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  character?: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location // ⬅️ injetando Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterService.getCharacterById(+id).subscribe(data => {
        this.character = data;
      });
    }
  }

  goBack(): void {
    this.location.back(); // ⬅️ método que volta à página anterior
  }
}
