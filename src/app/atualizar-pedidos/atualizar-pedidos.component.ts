import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from '../pedido';
import { PedidoService } from '../pedido/pedido.service';

@Component({
  selector: 'app-atualizar-pedidos',
  templateUrl: './atualizar-pedidos.component.html',
  styles: [],
})
export class AtualizarPedidosComponent implements OnInit {
  idPedido: number = 0;
  pedido: Pedido = {
    id: 0,
    dataHora: ' ',
    situacao: ' ',
    itens: [],
  };

  constructor(
    private route: ActivatedRoute,
    public pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.idPedido = parseInt(paramMap.get('idPedido') || '0');
      this.carregaPedido();
    });
  }

  carregaPedido() {
    this.pedidoService.carregaPedido(this.idPedido).subscribe((pedido) => {
      this.pedido = pedido;
    });
  }

  salvaSituacao() {
    if (this.pedido) {
      this.pedidoService.atualizaPedido(this.pedido).subscribe((pedido) => {
        this.pedido = pedido;
      });
    }
  }

  valorTotalPedido() {
    let valor = 0;
    for (let item of this.pedido.itens) {
      valor += item.produto.preco * item.quantidade;
    }
    return valor;
  }
}
