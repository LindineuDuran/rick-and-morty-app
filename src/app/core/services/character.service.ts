import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Character } from '../../core/models/character.model';
import { Observable } from 'rxjs';

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
}

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private readonly apiUrl = 'https://rickandmortyapi.com/api/character';

  // 👇 Sinal local para armazenar personagens criados/alterados/excluídos
  private _localCharacters = signal<Character[]>([]);
  public readonly localCharacters = this._localCharacters.asReadonly();

  constructor(private http: HttpClient) {}

  // 🔹 Consulta à API oficial
  getCharacters(page: number = 1, name?: string): Observable<ApiResponse> {
    let url = `${this.apiUrl}?page=${page}`;
    if (name) url += `&name=${name}`;
    return this.http.get<ApiResponse>(url);
  }

  // 🔹 Consulta à API oficial
  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Busca local (usada para simular detalhes, edição ou exclusão de personagens locais)
  getLocalCharacterById(id: number): Character | undefined {
    return this._localCharacters().find(c => c.id === id);
  }

  // 🔹 Criação simulada localmente
  createCharacter(character: Partial<Character>) {
    const currentList = this._localCharacters();
    const newId = Math.max(0, ...currentList.map(c => c.id)) + 1000; // Evita conflitos com IDs reais da API
    const newCharacter: Character = {
      id: newId,
    name: character.name || 'Sem nome',
    status: character.status || 'unknown',
    species: character.species || 'unknown',
    type: character.type || '',
    gender: character.gender || 'unknown',
    origin: character.origin || { name: 'Desconhecido', url: '' },
    location: character.location || { name: 'Desconhecido', url: '' },
    image: character.image || 'https://via.placeholder.com/150',
    episode: character.episode || [],
    url: character.url || '',
    created: character.created || new Date().toISOString(),
    };
    this._localCharacters.set([newCharacter, ...currentList]);
  }

  // 🔹 Atualização local simulada
  updateCharacter(id: number, updatedData: Partial<Character>) {
    const updated = this._localCharacters().map(c =>
      c.id === id ? { ...c, ...updatedData } : c
    );
    this._localCharacters.set(updated);
  }

  // 🔹 Exclusão local simulada
  deleteCharacter(id: number) {
    const updated = this._localCharacters().filter(c => c.id !== id);
    this._localCharacters.set(updated);
  }

  // 🔹 Lista combinada (API + locais), se quiser usar com computed:
  public readonly allCharacters = computed(() => {
    return this._localCharacters(); // Você pode combinar com os da API futuramente, se quiser
  });
}
