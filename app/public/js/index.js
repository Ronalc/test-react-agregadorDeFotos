var global;
var ListaTareas = React.createClass({
  CrearElementosDeLista: function(itemText) {
    return <img src={itemText} alt="test" className="col-md-2" onClick={this.props.EstadoBorrar.bind(this)}/>;
  },
  render: function() {
    return <div id="sortable" className="row">
              {this.props.ElementosLista.map(this.CrearElementosDeLista)}
          </div>;
  }
});
var AplicacionTareas = React.createClass({
  getInitialState: function() {
    return {
      ElementosLista: ["https://d2e1tcbrruuso7.cloudfront.net/static/images/web-dev-icon.a6e158d1aa09.png"], text: ''
    };
  },
  componentWillMount: function() {
    this.actualizarInformacion();
  },
  actualizarInformacion: function() {
    // input clean
    this.setState({text: ''});
    // urls bd for img
    var urls = [];
    $.get('http://127.0.0.1:8030/imagenes', function(resultado) {
      for (var i = 0; i < resultado.length; i++) {
        urls.push(resultado[i].url)
      }
      this.setState({ElementosLista:urls});
    }.bind(this));
  },
  EstadoBorrar: function(ElementoAborrar) {
    var LosElementosLista = this.state.ElementosLista;
    var indice = LosElementosLista.indexOf(ElementoAborrar);
    LosElementosLista.splice(indice, 1);
    this.setState({ElementosLista: LosElementosLista});
  },
  EstadoCambio: function(e) {
    this.setState({text: e.target.value});
  },
  EstadoSubmit: function(e) {
    e.preventDefault();
    if (this.state.text != '') {
      $.ajax({
        url: 'http://127.0.0.1:8030/imagenes',
        dataType:'son',
        type:'POST',
        data:{url:this.state.text},
        success: function(data) {

        }.bind(this)
      });
    }
    this.actualizarInformacion();
  },
  render: function() {
    return (
      <div className="col-md-12">
        <div className="col-md-6 col-md-offset-3">
          <h3>Lista de imagenes</h3>
          <form onSubmit={this.EstadoSubmit} >
            <input className="form-control"
              placeholder="Agregar a la lista"
              onChange={this.EstadoCambio} value={this.state.text}/>
            <br/>
            <button className="btn btn-success btn-block " >
              {'Agregar a lista'}
            </button>
            <br/>
            <label>
              {(this.state.ElementosLista.length) + ' Elementos agregados'}
            </label>
          </form>
          <hr/>
        </div>
        <div className="col-md-12">
          <ListaTareas ElementosLista={this.state.ElementosLista}
                  EstadoBorrar={this.EstadoBorrar} />
        </div>
      </div>
    );
  }
});
React.render(<AplicacionTareas />, document.getElementById('row'));
