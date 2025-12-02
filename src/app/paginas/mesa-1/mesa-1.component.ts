import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../services/mesa.service';
import { MenuComponent } from '../../layout/menu/menu.component';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';


declare var UIkit: any;


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
    acao1: ['', [Validators.required, Validators.maxLength(60)]],
    acao2: ['', [Validators.required, Validators.maxLength(60)]],
    acao3: ['', [Validators.required, Validators.maxLength(60)]]
  }),

  crescer: this.fb.group({
    acao1: ['', [Validators.required, Validators.maxLength(60)]],
    acao2: ['', [Validators.required, Validators.maxLength(60)]],
    acao3: ['', [Validators.required, Validators.maxLength(60)]],
  }),

  inovar: this.fb.group({
    acao1: ['', [Validators.required, Validators.maxLength(60)]],
    acao2: ['', [Validators.required, Validators.maxLength(60)]],
    acao3: ['', [Validators.required, Validators.maxLength(60)]]
  })
});

  }


  loading: boolean = false;

 async onSubmit() {

  if (this.form.valid) {

    this.loading = true; // LIGA SPINNER

    try {

      await this.mesaService.enviarMesa(this.form.value);

      this.loading = false; // DESLIGA

      UIkit.modal('#modalSuccess').show();

      this.form.reset();

    } catch (error) {

      this.loading = false; // DESLIGA

      console.error(error);

      UIkit.modal('#modalError').show();
    }

  } else {

    this.form.markAllAsTouched();
    alert('Preencha todos os campos');
  }
}



}
