import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../services/mesa.service';

import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { MenuComponent } from '../../layout/menu/menu.component';

declare var UIkit: any;

@Component({
  selector: 'app-tables',
  imports: [ FormsModule, CommonModule, MenuComponent, ReactiveFormsModule ],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent implements OnInit {

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
