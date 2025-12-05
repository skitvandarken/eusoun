

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AcaoSelecionada {
  mesa: string | number;
  categoria: string;
  acao: string;
}

@Injectable({
  providedIn: 'root'
})
export class SelecoesService {

  // BehaviorSubject para armazenar as ações selecionadas
  private selecoesSubject = new BehaviorSubject<AcaoSelecionada[]>([]);
  
  // Observable público para componentes ouvirem mudanças
  selecoes$ = this.selecoesSubject.asObservable();

  constructor() { }

  // Retorna o array atual
  getSelecoes(): AcaoSelecionada[] {
    return this.selecoesSubject.getValue();
  }

  // Adicionar uma ação
  adicionarAcao(acao: AcaoSelecionada) {
    const atual = this.getSelecoes();
    // Evita duplicados
    if (!atual.some(a => a.mesa === acao.mesa && a.categoria === acao.categoria && a.acao === acao.acao)) {
      this.selecoesSubject.next([...atual, acao]);
    }
  }

  // Remover uma ação
  removerAcao(acao: AcaoSelecionada) {
    const atual = this.getSelecoes();
    this.selecoesSubject.next(
      atual.filter(a => !(a.mesa === acao.mesa && a.categoria === acao.categoria && a.acao === acao.acao))
    );
  }

  // Limpar todas as ações
  limparSelecoes() {
    this.selecoesSubject.next([]);
  }
}
