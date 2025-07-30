import { Component, ElementRef, viewChild, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { MenuComponent } from '../../layout/menu/menu.component';

@Component({
  selector: 'app-mulher',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './mulher.component.html',
  styleUrl: './mulher.component.css'
})
export class MulherComponent {
  readonly socialPlatforms = ['facebook', 'twitter', 'whatsapp', 'linkedin'] as const;


  // Hardcoded names list (sorted alphabetically)
  readonly allNames = [
    { name: 'Aida Pascoal', photo: 'img/mulheres/aidapascual.jpg' },
    { name: 'Amanda Arruda de Souza e Silva', photo: 'img/mulheres/enhaced/amanda-Picsart-AiImageEnhancer.jpg' },
    { name: 'Ana Virginia Oliveira P. Sales Ferreira', photo: 'img/mulheres/enhaced/anavirjinia-Picsart-AiImageEnhancer.jpg' },
    { name: 'Andrea de Oliveira Brito', photo: 'img/mulheres/enhaced/andrea-Picsart-AiImageEnhancer.jpg' },
    { name: 'Ariete Pereira', photo: 'img/mulheres/enhaced/ariete-Picsart-AiImageEnhancer.jpg' },
    { name: 'Beatriz Jordão', photo: 'img/mulheres/beatrizjd.jpg' },
    { name: 'Brigida Fortunato', photo: 'img/mulheres/enhaced/brigida-Picsart-AiImageEnhancer.jpg' },
    { name: 'Bruna Lassakowski Fontes', photo: 'img/mulheres/enhaced/bruna-Picsart-AiImageEnhancer.jpg' },
    { name: 'Celma Paulo', photo: 'img/mulheres/enhaced/celma-Picsart-AiImageEnhancer.jpg' },
    { name: 'Cicera Silvaneida Bezerra Cezario', photo: 'img/mulheres/cicera.jpg' },
    { name: 'Cláudia Couceiro', photo: 'img/mulheres/claudia.jpg' },
    { name: 'Cristina Amálua', photo: 'img/mulheres/cristina.jpg' },
    { name: 'Daniele Sousa da Silva Maranhão', photo: 'img/mulheres/daniele.jpg' },
    { name: 'Daynara da Silva Lacerda', photo: 'img/mulheres/enhaced/daynara-Picsart-AiImageEnhancer.jpg' },
    { name: 'Djamila Caetano', photo: 'img/mulheres/enhaced/djamila-Picsart-AiImageEnhancer.jpg' },
    { name: 'Dorcas Maria', photo: 'img/mulheres/enhaced/dorcas-Picsart-AiImageEnhancer.jpg' },
    { name: 'Elizabeth Francisco', photo: 'img/mulheres/elizabeht-Picsart-AiImageEnhancer.jpg' },
    { name: 'Elizandra Companhia', photo: 'img/mulheres/elizandra-Picsart-AiImageEnhancer.jpg' },
    { name: 'Eva Janine Ricarte Rolim', photo: 'img/mulheres/enhaced/evarolim-Picsart-AiImageEnhancer.jpg' },
    { name: 'Izilda Tanda', photo: 'img/mulheres/enhaced/izilda-Picsart-AiImageEnhancer.jpg' },
    { name: 'Jacqueline Kitching', photo: 'img/mulheres/enhaced/jacqueline-Picsart-AiImageEnhancer.jpg' },
    { name: 'Jofrina Lima', photo: 'img/mulheres/enhaced/jofrina-Picsart-AiImageEnhancer.jpg' },
    { name: 'Josefina Francisco', photo: 'img/mulheres/enhaced/josefina-Picsart-AiImageEnhancer.jpg' },
    { name: 'Julieta Delgado', photo: 'img/mulheres/enhaced/julieta-Picsart-AiImageEnhancer.png' },
    { name: 'Kamilla de Lemos Caldas', photo: 'img/mulheres/enhaced/kamila-Picsart-AiImageEnhancer.jpg' },
    { name: 'Karoline Holanda Costa Trevizani', photo: 'img/mulheres/enhaced/karolini-Picsart-AiImageEnhancer.jpg' },
    { name: 'Laura Carneiro', photo: 'img/mulheres/enhaced/laura-Picsart-AiImageEnhancer.jpg' },
    { name: 'Lília Carvalho', photo: 'img/mulheres/enhaced/lilia-Picsart-AiImageEnhancer.jpg' },
    { name: 'Marinela Liomba', photo: 'img/mulheres/enhaced/lionboabb-Picsart-AiImageEnhancer.jpg' },
    { name: 'Pamela Bráz', photo: 'img/mulheres/enhaced/pamela-Picsart-AiImageEnhancer.jpg' },

  ];

  postcardElement = viewChild.required<ElementRef<HTMLDivElement>>('postcardRef');

  // Reactive state with signals
  selectedPhoto = signal('/img/mulheres/default.jpg');
  name = signal('');
  position = signal('');
  message = signal('');
  showNameDropdown = signal(false);
  searchQuery = signal('');

  // Computed filtered names
  filteredNames = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (query.length < 2) return [];
    return this.allNames
      .filter(item => item.name.toLowerCase().includes(query))
      .slice(0, 10);
  });
  // Profile photos mapping
  private readonly profilePhotos = {
    'Maria Silva': 'https://placehold.co/120x120/007bff/ffffff?text=Maria',
    'Aisha Khan': 'https://placehold.co/120x120/28a745/ffffff?text=Aisha',
    'Nia Jones': 'https://placehold.co/120x120/ffc107/000000?text=Nia',
    'Fatima Diallo': 'https://placehold.co/120x120/dc3545/ffffff?text=Fatima',
    'Default': 'https://placehold.co/120x120/6c757d/ffffff?text=Foto',
  } as const;

  onKeyDown(event: KeyboardEvent): void {
    const results = this.filteredNames();
    const index = this.activeIndex();
    if (!results.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.set((index + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.set((index - 1 + results.length) % results.length);
    } else if (event.key === 'Enter' && index >= 0) {
      event.preventDefault();
      this.selectName(results[index]);
    }
  }
  // Computed profile photo
  profilePhoto = computed(() => {
    const currentName = this.name().trim();
    return this.profilePhotos[currentName as keyof typeof this.profilePhotos]
      || this.profilePhotos.Default;
  });

  loading = signal(false);


  activeIndex = signal(-1); // to track keyboard navigation

  // Event handlers
  onNameSearchChange(value: string): void {
    this.searchQuery.set(value);
    // Reset results and show spinner while "retrieving"
    this.loading.set(true);

    clearTimeout((this as any).typingTimeout);
    (this as any).typingTimeout = setTimeout(() => {
      this.showNameDropdown.set(true);
      this.loading.set(false);
    }, 300); // 300ms delay simulates gradual retrieval

  }

  highlightMatch(name: string, query: string): string {
    const regex = new RegExp(`(${query})`, 'gi');
    return name.replace(regex, '<strong>$1</strong>');
  }
  closeDropdown(): void {
    this.showNameDropdown.set(false);
  }
  selectName(selected: { name: string; photo: string }): void {
    this.name.set(selected.name);
    this.searchQuery.set(selected.name);
    this.selectedPhoto.set(selected.photo);
    this.showNameDropdown.set(false);
  }
  onNameInputBlur(): void {
    setTimeout(() => {
      this.showNameDropdown.set(false);
    }, 200);
  }

  onPositionChange(value: string): void {
      this.searchQuery.set(value);
    this.position.set(value);
  }

  onMessageChange(value: string): void {
      this.searchQuery.set(value);
    this.message.set(value);
  }

  async downloadPostcard(format: 'png' | 'jpeg') {
    try {
      const canvas = await html2canvas(this.postcardElement().nativeElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const dataUrl = format === 'png'
        ? canvas.toDataURL('image/png')
        : canvas.toDataURL('image/jpeg', 0.9);

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `african-woman-day-${Date.now()}.${format}`;
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
    }
  }

  shareOn(platform: (typeof this.socialPlatforms)[number]) {
    const text = encodeURIComponent(`${this.message()} - ${this.name()}`);
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Dia da Mulher Africana - [eu-sou – mulher]');

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${title}%0A${text}&url=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${title}%0A${text}%0A${url}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}`,
    } as const;

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
}