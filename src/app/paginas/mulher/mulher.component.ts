import { Component, ElementRef, viewChild, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { MenuComponent } from '../../layout/menu/menu.component';

@Component({
  selector: 'app-mulher',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent ],
  templateUrl: './mulher.component.html',
  styleUrl: './mulher.component.css'
})
export class MulherComponent {
  readonly socialPlatforms = ['facebook', 'twitter', 'whatsapp', 'linkedin'] as const;
  

  // Hardcoded names list (sorted alphabetically)
  readonly allNames = [
    
    { name: 'Aida Pascoal', photo: 'img/mulheres/aidapasqual.jpg' },
    { name: 'Amanda Arruda de Souza e Silva', photo: 'img/mulheres/amanda.jpg' },
    { name: 'Ana Virginia Oliveira P. Sales Ferreira', photo: 'img/mulheres/ana virijna.jpg' },
    { name: 'Andrea de Oliveira Brito', photo: 'img/mulheres/andrea.jpg' },
    { name: 'Ariete', photo: 'img/mulheres/ariete.jpg' },
    { name: 'Beatriz J.D.', photo: 'img/mulheres/beatrizjd.jpg' },
    { name: 'Brigida', photo: 'img/mulheres/brigida.jpg' },
    { name: 'Bruna', photo: 'img/mulheres/bruna.jpg' },
    { name: 'Brunilde', photo: 'img/mulheres/brunilde.jpg' },
    { name: 'Celma', photo: 'img/mulheres/celma.jpg' },
    { name: 'Cicera', photo: 'img/mulheres/cicera.jpg' },
    { name: 'Claudia', photo: 'img/mulheres/claudia.jpg' },
    { name: 'Cristina', photo: 'img/mulheres/cristina.jpg' },
    { name: 'Daniele', photo: 'img/mulheres/daniele.jpg' },
    { name: 'Daynara', photo: 'img/mulheres/daynara.jpg' },
    { name: 'Djamila', photo: 'img/mulheres/djamila.jpg' },
    { name: 'Dorcas', photo: 'img/mulheres/dorcas.jpg' },
    { name: 'Elizabeht', photo: 'img/mulheres/elizabeht.jpg' },
    { name: 'Elizabeth', photo: 'img/mulheres/elizabeth.jpg' },
    { name: 'Elizandra', photo: 'img/mulheres/elizandra.jpg' },
    { name: 'Evarolim', photo: 'img/mulheres/evarolim.jpg' },
    { name: 'Izilda', photo: 'img/mulheres/izilda.jpg' },
    { name: 'Jacqueline', photo: 'img/mulheres/jacqueline.jpg' },
    { name: 'Jofrina', photo: 'img/mulheres/jofrina.jpg' },
    { name: 'Josefina', photo: 'img/mulheres/josefina.jpg' },
    { name: 'Julieta', photo: 'img/mulheres/julieta.jpg' },
    { name: 'Kamila', photo: 'img/mulheres/kamila.jpg' },
    { name: 'Karolini', photo: 'img/mulheres/karolini.jpg' },
    { name: 'Laura', photo: 'img/mulheres/laura.jpg' },
    { name: 'Lilia', photo: 'img/mulheres/lilia.jpg' },
    { name: 'Lionboabb', photo: 'img/mulheres/lionboabb.jpg' },
    { name: 'Pamela', photo: 'img/mulheres/pamela.jpg' },
  ];

  postcardElement = viewChild.required<ElementRef<HTMLDivElement>>('postcardRef');

  // Reactive state with signals
  selectedPhoto = signal('assets/photos/default.jpg');
  name = signal('Seu nome aqui');
  position = signal('Posição');
  message = signal('Sua mensagem aqui');
  showNameDropdown = signal(false);
  searchQuery = signal('');

  // Computed filtered names
 filteredNames = computed(() => {
  if (!this.searchQuery()) return this.allNames.slice(0, 5);
  return this.allNames.filter(item => 
    item.name.toLowerCase().includes(this.searchQuery().toLowerCase())
  ).slice(0, 10);
});

  // Profile photos mapping
  private readonly profilePhotos = {
    'Maria Silva': 'https://placehold.co/120x120/007bff/ffffff?text=Maria',
    'Aisha Khan': 'https://placehold.co/120x120/28a745/ffffff?text=Aisha',
    'Nia Jones': 'https://placehold.co/120x120/ffc107/000000?text=Nia',
    'Fatima Diallo': 'https://placehold.co/120x120/dc3545/ffffff?text=Fatima',
    'Default': 'https://placehold.co/120x120/6c757d/ffffff?text=Foto',
  } as const;

  // Computed profile photo
  profilePhoto = computed(() => {
    const currentName = this.name().trim();
    return this.profilePhotos[currentName as keyof typeof this.profilePhotos]
      || this.profilePhotos.Default;
  });

  // Event handlers
  onNameSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.showNameDropdown.set(true);
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
    this.position.set(value);
  }

  onMessageChange(value: string): void {
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