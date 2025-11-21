import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../services/mesa.service';
import { MenuComponent } from '../../layout/menu/menu.component';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mesa-1',
  imports: [
    MenuComponent,
    FormsModule, 
    CommonModule, 
    ReactiveFormsModule
],
  templateUrl: './mesa-1.component.html',
  styleUrl: './mesa-1.component.css'
})
export class Mesa1Component implements OnInit {

  form!: FormGroup;
  

constructor(
  private fb: FormBuilder,
  private mesaService: MesaService
) {}
  ngOnInit(): void {this.form = this.fb.group({

  numeroMesa: ['', Validators.required],

  motivar: this.fb.group({
    acao1: ['', Validators.required],
    acao2: ['', Validators.required],
    acao3: ['', Validators.required]
  }),

  crescer: this.fb.group({
    acao1: ['', Validators.required],
    acao2: ['', Validators.required],
    acao3: ['', Validators.required]
  }),

  inovar: this.fb.group({
    acao1: ['', Validators.required],
    acao2: ['', Validators.required],
    acao3: ['', Validators.required]
  })
});

  }

 async onSubmit() {

  if (this.form.valid) {

    try {

      await this.mesaService.enviarMesa(this.form.value);

      alert(`Mesa ${this.form.value.numeroMesa} enviada com sucesso!`);

      this.form.reset();

    } catch (error) {

      console.error(error);

      alert('Erro ao enviar dados');

    }

  } else {

    this.form.markAllAsTouched();
    alert('Preencha todos os campos');
    
  }
}


}
