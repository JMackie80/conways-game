import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  public rows = Array(100).fill(0);
  public columns = Array(100).fill(0);
  public nodes: any[] = [[10,10], [10,11], [11,10], [11,11], [12,12], [12,13], [13,12], [13,13], [20,10], [20,11], [20,12], [21,9], [21,10], [21,11], [30,10], [30,11], [30,12]];
  private timeInterval = 500;

  constructor() { }

  ngAfterViewInit(): void {
    this.drawCells(this.nodes);
    setInterval(() => {
      this.nodes = this.createNextGeneration(this.nodes);
      this.drawCells(this.nodes);
    }, this.timeInterval);
  }

  private createNextGeneration(nodes: any[]) {
    const newGeneration: any[] = [];
    for (let rowNum = 0; rowNum < this.rows.length; rowNum++) {
      for (let colNum = 0; colNum < this.columns.length; colNum++) {
        /*
          Any live cell with fewer than two live neighbours dies, as if by underpopulation.
          Any live cell with two or three live neighbours lives on to the next generation.
          Any live cell with more than three live neighbours dies, as if by overpopulation.
          Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        */
        const liveNeighborCount = this.getLiveNeighbors(rowNum, colNum, nodes);
        const node = nodes.find(node => node[0] === rowNum && node[1] === colNum);
        if ((node != null && (liveNeighborCount === 2 || liveNeighborCount === 3)) 
              || (node == null && liveNeighborCount === 3)) {
          newGeneration.push([rowNum, colNum]);
        }
      }
    }

    return newGeneration;
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

  private getLiveNeighbors(rowNum: number, colNum: number, nodes: any[]): number {
    const neighbors: any[] = [];
    neighbors.push(nodes.find(node => node[0] === rowNum - 1 && node[1] === colNum));
    neighbors.push(nodes.find(node => node[0] === rowNum + 1 && node[1] === colNum));
    neighbors.push(nodes.find(node => node[0] === rowNum && node[1] === colNum - 1));
    neighbors.push(nodes.find(node => node[0] === rowNum && node[1] === colNum + 1));
    neighbors.push(nodes.find(node => node[0] === rowNum - 1 && node[1] === colNum + 1));
    neighbors.push(nodes.find(node => node[0] === rowNum + 1 && node[1] === colNum + 1));
    neighbors.push(nodes.find(node => node[0] === rowNum - 1 && node[1] === colNum - 1));
    neighbors.push(nodes.find(node => node[0] === rowNum + 1 && node[1] === colNum - 1));
    return neighbors.filter(neighbor => neighbor != null).length;
  }

}
