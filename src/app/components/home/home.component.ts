import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CatFactService } from '../../services/cat-fact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule,DatePipe],
})
export class HomeComponent {
  activeTab: 'actual' | 'historial' = 'actual';
 // Lista de palabras alternativas para evitar repetición
  private readonly fallbackQueries = ['cats', 'kittens', 'cute cat', 'funny cat', 'animals'];

  currentFact: string = '';
  currentGifUrl: string = '';
  searchHistory: Array<{ date: Date; fact: string; query: string; gif: string }> = [];

  constructor(private catFactService: CatFactService) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.catFactService.getCatFact().subscribe({
      next: (data) => {
        this.currentFact = data.fact;
        this.refreshGif();
      },
      error: (err) => {
      }
    });
  }

refreshGif() {
  if (!this.currentFact) return;
  const words = this.currentFact.split(' ').slice(0, 3).join(' ');
  let query = words.trim();

  if (!query || Math.random() < 0.3) {
    const randomQuery = this.fallbackQueries[
      Math.floor(Math.random() * this.fallbackQueries.length)
    ];
    query = randomQuery;
  }
  this.currentGifUrl = '';

  this.catFactService.getGifFromFact(query).subscribe({
    next: (response) => {
      let gifUrl = 'https://media.giphy.com/media/0cB7n7qDg4oAAAAC/no-gif-available.gif '; // Fallback seguro

      if (response?.data?.length > 0) {
        gifUrl = response.data[0].images.original.url;
      }
      this.currentGifUrl = `${gifUrl}?t=${Date.now()}`;

      this.searchHistory.unshift({
        date: new Date(),
        fact: this.currentFact,
        query,
        gif: this.currentGifUrl,
      });
    },
    error: (err) => {
      console.error('Error al obtener GIF:', err);
    }
  });
}
  changeTab(tab: 'actual' | 'historial') {
    this.activeTab = tab;
  }
}