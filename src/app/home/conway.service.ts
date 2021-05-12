import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ConwayService {

    public createNextGeneration(nodes: any[], rowCount: number, colCount: number) {
        const newGeneration: number[][] = [];
        for (let rowNum = 0; rowNum < rowCount; rowNum++) {
          for (let colNum = 0; colNum < colCount; colNum++) {
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

    private getLiveNeighbors(rowNum: number, colNum: number, nodes: any[]): number {
        const neighbors: number[][] = [];
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