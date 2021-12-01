import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      this.atualizaSituacao();
    });
  }

  atualizaSituacao() {
    return (this.pararPagina = window.setInterval(() => {
      this.carregaPedido();
    }, 5000));
  }

  pararAtualizacao() {
    window.clearInterval(this.pararPagina);
  }

  ngOnDestroy() {
    this.pararAtualizacao();
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
