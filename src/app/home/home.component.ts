import { Component, AfterViewInit } from '@angular/core';
import { ConwayService } from './conway.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  public rows = Array(100).fill(0);
  public columns = Array(100).fill(0);
  public nodes: number[][] = [[10,10], [10,11], [11,10], [11,11], [12,12], [12,13], [13,12], [13,13], [20,10], [20,11], [20,12], [21,9], [21,10], [21,11], [30,10], [30,11], [30,12]];
  private timeInterval = 500;

  constructor(private conwayService: ConwayService) { }

  ngAfterViewInit(): void {
    this.drawCells(this.nodes);
    setInterval(() => {
      this.nodes = this.conwayService.createNextGeneration(this.nodes, this.columns.length, this.rows.length);
      this.drawCells(this.nodes);
    }, this.timeInterval);
  }

  private clearCells() {
    const tdElements = document.querySelectorAll("td.fill");
    tdElements.forEach(td => td.classList.remove("fill"));
  }

  private drawCells(nodes: any[]) {
    this.clearCells();
    const tableElement = <HTMLTableElement> document.getElementById('gameTable');
    if (tableElement != null) {
      for (let node of nodes) {
        tableElement.rows[node[0]].cells[node[1]].classList.add("fill");
      }
    }
  }

}
