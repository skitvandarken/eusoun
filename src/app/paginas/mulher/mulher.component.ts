import { Component, ElementRef, viewChild, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-mulher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mulher.component.html',
  styleUrl: './mulher.component.css'
})



export class MulherComponent {

  readonly socialPlatforms = ['facebook', 'twitter', 'whatsapp', 'linkedin'] as const;


  postcardElement = viewChild.required<ElementRef<HTMLDivElement>>('postcardRef');

  // Reactive state with signals
  name = signal('Seu nome aqui');
  position = signal('Posição');
  message = signal('Sua mensagem aqui');

  // Profile photos mapping - using a type-safe object
  private readonly profilePhotos = {
    'Maria Silva': 'https://placehold.co/120x120/007bff/ffffff?text=Maria',
    'Aisha Khan': 'https://placehold.co/120x120/28a745/ffffff?text=Aisha',
    'Nia Jones': 'https://placehold.co/120x120/ffc107/000000?text=Nia',
    'Fatima Diallo': 'https://placehold.co/120x120/dc3545/ffffff?text=Fatima',
    'Default': 'https://placehold.co/120x120/6c757d/ffffff?text=User',
  } as const;

  // Computed profile photo
  profilePhoto = computed(() => {
    const currentName = this.name().trim();
    return this.profilePhotos[currentName as keyof typeof this.profilePhotos]
      || this.profilePhotos.Default;
  });

  // Event handlers
onNameChange(value: string): void {
  this.name.set(value);
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