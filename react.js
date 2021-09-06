// https://pt-br.reactjs.org/tutorial/tutorial.html

// 07- Nós vamos agora mudar o Square para ser um componente de função.
//  Em React, componentes de função são os mais simples de serem escritos, contém apenas um método render e não possuem seu próprio state. Ao invés de definir uma classe que extende de React.Component, nós podemos escrever uma função que recebe props como entrada e retorna o que deverá ser renderizado. Esse tipo de componente é menos tedioso de escrever do que classes e muitos componentes podem ser expressados desta maneira.
//  Troque a classe Square por esta função:
function Square(props) {
  return (
    <button 
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

// cópia da classe Square sem comentários
// class Square extends React.Component {
//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

// class Square extends React.Component {
//   // 04- Como próximo passo, queremos que o componente Square “lembre” que foi clicado e preencha com um “X”. Para “lembrar” as coisas, os componentes usam o estado (state).
//   //  Os componentes React podem ter estado (state) configurando this.state em seus construtores. this.state deve ser considerado como privado para o componente React que o definiu. Vamos armazenar o valor atual do Square em this.state e alterá-lo quando o Square for clicado.
//   //  Primeiro, adicionaremos um construtor à classe para inicializar o estado:
//   // 06g- Deletar o constructor do Quadrado, já que não manteremos mais o state do jogo nele;

//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     value: null,
//   //   }
//   // }

//   render() {
//     // 02- Vamos preencher o componente Square com um “X” quando clicamos nele. Primeiro, altere a tag button que é retornada na função render() do componente Square para isto: */}
//     //   Para salvar a digitação e evitar o comportamento confuso de this,vamos usar a sintaxe arrow function para manipuladores de eventos:
//     // 03- Note que com onClick = {() => console.log('click')}, estamos passando uma função como prop onClick. O React só chamará essa função depois de um clique. 
//     //  Esquecendo () => e escrevendo somente onClick = {console.log('click')} é um erro comum e seria acionado sempre que o componente fosse renderizado novamente.
//     return (
//       <button 
//         className="square" 
//         // 05- Agora vamos mudar o método render do componente Square para exibir o valor do estado (state) atual quando clicado:
//         //  Substitua o onClick={...} event handler por onClick={() => this.setState({value: 'X'})}.
//         // 06e- Agora nós iremos passar duas props do Tabuleiro para o Quadrado: value e onClick. A propriedade onClick é uma função que será chamada quando o Quadrado for clicado. Nós manteremos as seguintes mudanças no componente Quadrado:
//         //  Substituir this.setState() por this.props.onClick() no método render;
//         onClick={() => this.props.onClick()}
//       >
//         {/* 01b- Altere o método render do Square para mostrar esse valor substituindo {/ * TODO * /} por {this.props.value}: */}
//         {/* 05b- Substitua this.props.value por this.state.value dentro da tag <button>. */}
//         {/* 06f- Substituir this.state.value por this.props.value no método render; */}
//         {this.props.value}
//       </button>
//     );
//   }
// }

class Board extends React.Component {
  // 06a- Vamos adicionar um construtor no Tabuleiro e definir que seu estado inicial irá ter um array com 9 posições preenchidas por nulo (null). Esses 9 nulls corresponderão aos 9 quadrados:
  // 08a- Agora precisamos consertar um defeito óbvio em nosso Jogo da Velha: os “O”s não podem ser marcados no tabuleiro.
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // 08b- Vamos definir a primeira jogadas para ser “X” por padrão. Podemos definir esse padrão modificando o state inicial no construtor do nosso tabuleiro (Board)
      xIsNext: true,
    };
  }

  // 06h- Após essas mudanças, seremos capazes novamente de clicar nos Squares para preenche-los. Entretanto, agora o state é guardado no componente Board ao invés de em cada Square. Quando o state do Board for alterado, os componentes Square serão re-renderizados automaticamente. Manter o state de todos os quadrados no componente Board nos permitirá determinar o vencedor no futuro.
  //  Como o componente Square não mantém mais state, os componentes Square receberão os valores do Board e o informarão quando forem clicados. Em “termos React”, os Squares são agora componentes controlados (controlled components). O Board terá controle total sobre eles.
  //  Note como na função handleClick, nós chamamos .slice() para criar uma cópia do array de quadrados para o modificar ao invés de faze-lo no array existente. Explicaremos o motivo quando criarmos uma copia do array de quadrados na próxima sessão.
  // 08c- Sempre que um jogador fizer uma jogada, xIsNext (um boolean) será trocado para determinar qual jogador será o próximo e o state do jogo será salvo. Nós atualizaremos a função handleClick do Board para trocar o valor de xIsNext:
  handleClick(i) {
    const squares = this.state.squares.slice()
    // 12- Agora podemos modificar a função handleClick do Board para retornar antes, ignorando o click, caso alguém tenha vencido o jogo ou se o quadrado (square) já esteja ocupado:
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
  }

  renderSquare(i) {
    return (
      <Square 
        // 01a- No método renderSquare do Board, altere o código para passar um prop chamado value para o Square:
        // 06b- Iremos agora utilizar novamente o mesmo mecanismo de propriedades. Vamos modificar o Tabuleiro para instruir cada Quadrado individualmente qual é o valor correto ('X', 'O' ou null). Nós já temos definidos o array de quadrados no construtor do Tabuleiro e iremos modificar o método renderSquare para definir o valor a partir do estado:
        value={this.state.squares[i]} 
        // 06c- Agora, precisamos mudar o que acontece quando um Quadrado é clicado. O componente Tabuleiro agora mantém quais quadrados são preenchidos. Precisamos criar uma maneira para cada Quadrado atualizar o state do Tabuleiro. O state é considerado privado ao componente em que é definido, ou seja, nós não podemos atualizar o state do Tabuleiro diretamente do Quadrado.
        //  Para manter a privacidade do state do Tabuleiro, nós vamos passar a função responsável do Tabuleiro para o Quadrado. Essa função irá ser chamada assim que o Quadrado for clicado. Nós então mudaremos o método renderSquare no Tabuleiro para:
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render() {
    // 09- Também vamos modificar o texto de “status” na função render do Board para que ela passe a exibir quem jogará o próximo turno.
    // 11- Chamaremos calculateWinner(squares) na função render do Board para checar se um jogador venceu. Caso tenha vencido, podemos mostrar um texto como “Winner: X” ou “Winner: O”. Vamos substituir a declaração de status na função render com esse código:
    const winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = 'Vencedor(a): ' + winner
    } else {
      status = 'Próximo jogador: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// 10- Declarando um Vencedor
//  Agora que mostramos quem jogará o próximo turno, também deveríamos mostrar quando o jogo foi vencido e que não há mais turnos a serem jogados
//  Dado um array de 9 quadrados, esta função irá verificar se há um vencedor e retornará 'X', 'O' ou null conforme apropriado
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}