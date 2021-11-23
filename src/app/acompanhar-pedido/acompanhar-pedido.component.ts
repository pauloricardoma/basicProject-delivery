import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { Pedido } from '../pedido';
import { PedidoService } from '../pedido/pedido.service';

@Component({
  selector: 'app-acompanhar-pedido',
  templateUrl: './acompanhar-pedido.component.html',
  styles: [],
})
export class AcompanharPedidoComponent implements OnInit {
  idPedido: number = 0;
  pedido: Pedido = {
    id: 0,
    dataHora: ' ',
    situacao: ' ',
    itens: [],
  };
  pararPagina: number = 0;

  constructor(
    private route: ActivatedRoute,
    public pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.idPedido = parseInt(paramMap.get('idPedido') || '0');
      this.carregaPedido();
      this.atualizaPagina(this.pedido.situacao);
    });
  }

  atualizaPagina(e: string) {
    this.pararPagina = window.setInterval(() => {
      window.location.reload();
    }, 5000);
  }

  paraAtualizacao() {
    window.clearInterval(this.pararPagina);
  }

  ngOnDestroy() {
    this.paraAtualizacao();
  }

  carregaPedido() {
    this.pedidoService.carregaPedido(this.idPedido).subscribe((pedido) => {
      this.pedido = pedido;
    });
  }

  valorTotalPedido() {
    let valor = 0;
    for (let item of this.pedido.itens) {
      valor += item.produto.preco * item.quantidade;
    }
    return valor;
  }
}
