import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs, {type EmailJSResponseStatus} from '@emailjs/browser'
import { Subject, debounceTime } from 'rxjs';
@Component({
  selector: 'app-formularios',
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.css'
})
export class FormulariosComponent implements OnInit  {
  emails = [
    'abednego.ferreira@angolacables.co.ao',
    'ada.bento@angolacables.co.ao',
    'aderito.pinto@angolacables.co.ao',
    'adilson.camenha@angolacables.co.ao',
    'agostinho.pascoal@angolacables.co.ao',
    'aida.pascoal@angolacables.co.ao',
    'albertina.paxi@angolacables.co.ao',
    'amit.salunke@angolacables.co.ao',
    'angelo.gama@angolacables.co.ao',
    'angelo.gomes@angolacables.co.ao',
    'antonia.gouveia@angolacables.co.ao',
    'antonio.tomas@angolacables.co.ao',
    'ariete.pereira@angolacables.co.ao',
    'artur.mendes@angolacables.co.ao',
    'augusto.carvalho@angolacables.co.ao',
    'augusto.gomes@angolacables.co.ao',
    'beatriz.jordao@angolacables.co.ao',
    'belizandro.calupeteca@angolacables.co.ao',
    'brigida.fortunato@angolacables.co.ao',
    'brunilde.caxala@angolacables.co.ao',
    'bruno.oliveira@angolacables.co.ao',
    'carlos.guerreiro@angolacables.co.ao',
    'claudio.gomes@angolacables.co.ao',
    'claudio.manuel@angolacables.co.ao',
    'clementino.fernando@angolacables.co.ao',
    'constantino.mbaca@angolacables.co.ao',
    'costa.cula@angolacables.co.ao',
    'crisostomo.mbundu@angolacables.co.ao',
    'cristina.malua@angolacables.co.ao',
    'danilson.cabila@angolacables.co.ao',
    'divaldo.diva@angolacables.co.ao',
    'djamila.caetano@angolacables.co.ao',
    'domingos.cahoji@angolacables.co.ao',
    'domingos.mendonca@angolacables.co.ao',
    'domingos.ngola@angolacables.co.ao',
    'dorcas.maria@angolacables.co.ao',
    'eder.guimaraes@angolacables.co.ao',
    'eduardo.manuel@angolacables.co.ao',
    'edvaldo.gomes@angolacables.co.ao',
    'elizandra.companhia@angolacables.co.ao',
    'fabio.jose@angolacables.co.ao',
    'fabio.marcos@angolacables.co.ao',
    'felizardo.miguel@angolacables.co.ao',
    'fernando.fernandes@telcables.ng',
    'fitu.sofrimento@angolacables.co.ao',
    'frederico.daniel@angolacables.co.ao',
    'francisco.ginga@angolacables.co.ao',
    'francisco.rodrigues@angolacables.co.ao',
    'gaspar.zangao@angolacables.co.ao',
    'gomes.cochi@angolacables.co.ao',
    'helio.ferreira@angolacables.co.ao',
    'vanusa.gomes@angolacables.co.ao',
    'inacio.jose@angolacables.co.ao',
    'ivette.paca@angolacables.co.ao',
    'izilda.tanda@angolacables.co.ao',
    'jaime.mutali@angolacables.co.ao',
    'joao.massuquinina@angolacables.co.ao',
    'joaquim.candulo@angolacables.co.ao',
    'joel.oliveira@angolacables.co.ao',
    'joelson.oscar@angolacables.co.ao',
    'joffrina.lima@angolacables.co.ao',
    'josefina.francisco@angolacables.co.ao',
    'julio.chilela@angolacables.co.ao',
    'laura.carneiro@angolacables.co.ao',
    'lilia.carvalho@angolacables.co.ao',
    'lizeth.bastos@angolacables.co.ao',
    'lucas.chaves@angolacables.co.ao',
    'lucenildo.junior@angolacables.co.ao',
    'lukeba.jorge@angolacables.co.ao',
    'manuel.direito@angolacables.co.ao',
    'marcia.tome@angolacables.co.ao',
    'maria.cuzambila@angolacables.co.ao',
    'maria.antonia@angolacables.co.ao',
    'marinela.liomba@angolacables.co.ao',
    'mauro.bartolomeu@angolacables.co.ao',
    'mauro.santos@angolacables.co.ao',
    'mirian.tavares@angolacables.co.ao',
    'moises.tuhumba@angolacables.co.ao',
    'mussoli.machai@angolacables.co.ao',
    'neiciriany.afonso@angolacables.co.ao',
    'neusa.rocha@angolacables.co.ao',
    'niura.fernandes@angolacables.co.ao',
    'nuno.silva@angolacables.co.ao',
    'olavio.pucuta@angolacables.co.ao',
    'osvaldo.livondeni@angolacables.co.ao',
    'otniel.acacio@angolacables.co.ao',
    'pamela.braz@angolacables.co.ao',
    'ricardo.faustino@angolacables.co.ao',
    'roberta.silva@angolacables.co.ao',
    'rosa.sardinha@angolacables.co.ao',
    'rui.faria@angolacables.co.ao',
    'sabedoria.kiangani@angolacables.co.ao',
    'samuel.carvalho@angolacables.co.ao',
    'sidney.andre@angolacables.co.ao',
    'solange.carvalho@angolacables.co.ao',
    'tania.santos@angolacables.co.ao',
    'teresa.nunes@angolacables.co.ao',
    'tome.gomes@angolacables.co.ao',
    'valter.abreu@angolacables.co.ao',
    'vilma.esteves@angolacables.co.ao',
    'virgilio.alves@angolacables.co.ao',
    'vita.ngombo@angolacables.co.ao',
    'vitor.pinho@angolacables.co.ao',
    'walter.fernandes@angolacables.co.ao',
    'yara.sousa@angolacables.co.ao',
    'joelson.quiuma@angolacables.co.ao',
    'jose.batalha@angolacables.co.ao',
    'clesio.seco@angolacables.co.ao',
    'emerson.tiago@angolacables.co.ao',
    'elizabeth.francisco@angolacables.co.ao',
    'gustavo.trony@angolacables.com',
    'etelvina.kasselala@angolacables.co.ao',
    'p.pereira@angolacables.co.ao',
    'fernando.cruz@angolacables.co.ao',
    'florindo.jamba@angolacables.co.ao',
    'ilidio.janota@angolacables.co.ao',
    'b.bernardo@angolacables.co.ao',
    'jose.kayesse@angolacables.co.ao',
    'jose.sandele@angolacables.co.ao',
    'julieta.delgado@angolacables.co.ao',
    'kelveny.ramos@angolacables.co.ao',
    'lucio.bengue@angolacables.co.ao',
    'maria.tchitchi@angolacables.co.ao',
    'ricardo.dala@angolacables.co.ao',
    'rosema.matias@angolacables.co.ao',
    'teresa.vunge@angolacables.co.ao',
    'vita.miguel@angolacables.co.ao',
    'walter.narciso@angolacables.co.ao',
    'janelton.vunge@angolacables.com',
    'claudia.couceiro@angolacables.com',
    'joao.bioco@angolacables.com',
    'tatiana.joao@angolacables.co.ao',
    'sudhir.juggernath@telcables.co.za',
'mahendran.naidu@telcables.co.za',
'jacqueline.kitching@telcables.co.za',
'estella.quintal@telcables.co.za',
'thabo.ntlatsang@telcables.co.za',
'patience.tigere@telcables.co.za',
'alisha.badassy@telcables.co.za',
'fernando.fernandes@telcables.ng',
'jonadab.brown@telcables.ng',
'babatunde.adeoye@telcables.ng',
'israel.ogboi@telcables.ng',
'osibanjo.olalekan@telcables.ng',
'celma.paulo@telcables.pt',
'eric.owusu@telcables.net',
'amanda.arruda@angolacables.co.ao',
'ana.santos@telcables.com.br',
'ana.sales@telcables.com.br',
'anderson.nunes@angolacables.co.ao',
'andre.castelo@angolacables.co.ao',
'andrea.brito@telcables.com.br',
'barbara.stoenescu@telcables.com.br',
'benjamim.andrade@angolacables.co.ao',
'bruna.lassakoski@angolacables.co.ao',
'bruno.burgoa@angolacables.co.ao',
'carlos.ponciano@telcables.com.br',
'cicera.cesario@telcables.com.br',
'claudio.florindo@telcables.com.br',
'frederico.oliveira@angolacables.co.ao',
'daniele.maranhao@telcables.com.br',
'daynara.lacerda@angolacables.co.ao',
'diego.aquino@telcables.com.br',
'diego.ribeiro@angolacables.co.ao',
'emanuel.silva@angolacables.co.ao',
'eva.rolim@telcables.com.br',
'felipe.yasuda@angolacables.co.ao',
'fernanda.freitas@telcables.com.br',
'gabriel.oliveira@angolacables.co.ao',
'gefran.bezerra@angolacables.co.ao',
'guilherme.vieira@telcables.com.br',
'guilherme.vidal@angolacables.co.ao',
'hemil.ribeiro@angolacables.co.ao',
'igor.melo@telcables.com.br',
'igor.barrozo@angolacables.co.ao',
'Joao.silva@telcables.com.br',
'joao.marcos@angolacables.co.ao',
'jonatas.cartaxo@angolacables.co.ao',
'kamilla.lemos@telcables.com.br',
'karoline.trevizani@angolacables.co.ao',
'leandro.souza@angolacables.co.ao',
'livia.diola@telcables.com.br',
'luana.raizer@telcables.com.br',
'lucas.paulino@angolacables.co.ao',
'lucenildo.junior@angolacables.co.ao',
'mauricio.costa@telcables.com.br',
'marciel.silva@angolacables.co.ao',
'marcos.conceicao@angolacables.co.ao',
'zuila.moreira@telcables.com.br',
'nazaro.brito@telcables.com.br',
'rafael.siqueira@telcables.com.br',
'rafael.regis@angolacables.co.ao',
'rafael.timbo@angolacables.co.ao',
'rafael.akiyama@angolacables.co.ao',
'rafaela.carvalho@telcables.com.br',
'rayana.gadelha@angolacables.co.ao',
'rodrigo.carvalho@angolacables.co.ao',
'rodrigo.barbosa@telcables.com.br',
'taina.aguiar@telcables.com.br',
'thamires.santos@telcables.com.br',
'thiago.ribeiro@angolacables.co.ao',
'vitoria.varriale@telcables.com.br',
'wilson.matos@angolacables.co.ao',
'yuri.lima@angolacables.co.ao',
'yuri.jorge@angolacables.co.ao'
  ];

  minLength: number = 1;

    filteredEmails: string[] = []; // Filtered list for autocomplete
  selectedEmail: string = ''; // The selected or typed email
  loading: boolean = false; // Flag to control the loading state

  private inputChangeSubject: Subject<string> = new Subject();

  formData = {
    name: '',
    email: '',
    message: '',
    prefilled: '',
  };
  successMessage = false;

  constructor() {}

  ngOnInit() {
    this.filteredEmails = []; // Initialize with all emails
    this.inputChangeSubject
    .pipe(debounceTime(300)) // Add a debounce of 300ms
      .subscribe((value: string) => {
        this.filterEmails(value);
      });

  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.inputChangeSubject.next(input.value); // Use the subject to handle the input change
    } else {
      this.filteredEmails = [];
    }
  }

  filterEmails(value: string) {
    // Filter emails based on user input
    if (value.length >= this.minLength) {
      this.filteredEmails = this.emails.filter((email) =>
        email.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredEmails = [];
    }
  }


  selectEmail(email: string) {
    // Set the selected email and clear the filtered list
    this.selectedEmail = email;
    this.filteredEmails = [];
  }

  public sendEmail(e: Event, templateId: string) {
    e.preventDefault();

    emailjs
      .sendForm('service_dr89jgu', templateId, e.target as HTMLFormElement, {
        publicKey: 'oT4Vp8OvVm40Rg-oA',
        ...this.formData,
      })
      .then(
        () => {
          this.successMessage = true;
          console.log('SUCCESSO!');
          this.formData = {
            name: '',
            email: '',
            message: '',
            prefilled: '',
          };

          window.alert('Mensagem enviada com sucesso! 🎉. Obrigado por partilhar felicidade nesta quadra festiva.');
          window.location.href = 'https://eu-sou-nos.angolacables.co.ao';
        },
        (error) => {
          console.log('FALHOU...', (error as EmailJSResponseStatus).text);
          window.alert('😞 Awn... Não foi possível enviar o seu postal, verifique o e-mail introduzido e tente novamente. ');
        }
      );
  }


  onSubmit(e: Event) {
    e.preventDefault(); // Prevent default form submission

    this.loading = true; // Show the loading spinner when the form is submitted

    // Simulate form submission (e.g., sending data to a server)
    setTimeout(() => {
      this.loading = false; // Hide the spinner after the submission completes
      // Handle successful form submission here (e.g., display a success message)
    }, 2500); // Simulate a 2-second delay for the submission
  }

}

