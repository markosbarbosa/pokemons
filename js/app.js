var paginacao = ({

    urlApi: 'http://localhost/pokemonapi/',


    /**
     * Inicializa variáveis de controle da paginação
     * @param $scope Variável de escopo do módulo onde o script está sendo chamado
     */
    init: function($scope, $http) {

        this.scope = $scope;
        this.http = $http;


        this.scope.quantidadeRegistros = 20;
        this.scope.paginaAtual = 1;
        this.scope.totalPaginas = 0;
        this.scope.inicioRegistro = 0;

        //Carregamento inicial dos registros
        this.carregarRegistros();

    },

    /**
     * Monta a paginação
     */
    montarPaginacao: function() {

        this.scope.totalPaginas = Math.ceil(this.totalRegistros / this.scope.quantidadeRegistros);

        this.scope.listaPaginas = [];

        for(var i=1; i <= this.scope.totalPaginas; i++) {

            if(i > 1) {
                this.scope.inicioRegistro = ((i - 1) * this.scope.quantidadeRegistros);
            }

            this.scope.listaPaginas.push({
                num: i,
                inicio: this.scope.inicioRegistro
            });
        }


    },


    /**
     * Verifica quais dos botões de próximo e anterior ficam habilitados ou desabilitados
     */
    validarControlesPagina: function() {

        if(this.scope.paginaAtual == 1) $('li.pagina-anterior').addClass('disabled');
        else $('.pagina-anterior').removeClass('disabled');

        if(this.scope.totalPaginas == this.scope.paginaAtual) $('li.proxima-pagina').addClass('disabled');
        else $('.proxima-pagina').removeClass('disabled');

    },

    /**
     * Seleciona a página de acordo com o que foi clicado
     * @param el Elemento da paginação que foi clicado
     */
    carregarPagina: function(el) {

        //Se for botão anterior/próximo e estiver
        //desabilitado, não faz nada
        if($(el).hasClass('disabled')) {
            return false;
        }

        if($(el).hasClass('pagina-anterior')) {
            this.scope.paginaAtual--;
        } else if($(el).hasClass('proxima-pagina')) {
            this.scope.paginaAtual++;
        } else {
            this.scope.paginaAtual = el.id.replace('pg', '');
        }


        $('.num-pagina').removeClass('active');
        $('#pg' + this.scope.paginaAtual).addClass('active');


        paginacao.validarControlesPagina();

        if(this.scope.paginaAtual > 1) {
            this.scope.inicioRegistro = (this.scope.paginaAtual - 1) * this.scope.quantidadeRegistros;
        } else {
            this.scope.inicioRegistro = 0;
        }


        this.scope.itensModal = this.carregarRegistros(this.scope.inicioRegistro);


        console.log(this.scope.inicioRegistro);

        this.carregarRegistros();

    },


    /**
     * Carrega registros da api
     * @param offset A partir de qual registro irá iniciar
     */
    carregarRegistros: function() {


        var self = this;


        var offset = this.scope.inicioRegistro > 1 ? '?offset=' + this.scope.inicioRegistro : '';

        // this.http.get('testes/pokemons.json', {cache: true}).then(function(response) {
        this.http.get(this.urlApi + offset, {cache: true}).then(function(response) {

            var offset = self.scope.inicioRegistro;

            self.scope.itensModal = response.data.results;

            self.totalRegistros = response.data.count;

            self.montarPaginacao();

            paginacao.validarControlesPagina();

        });


        // this.http.get('http://pokeapi.co/api/v2/pokemon/', {cache: true}).then(function(response) {
        //
        //     var offset = self.scope.inicioRegistro;
        //
        //     self.scope.itensModal = response.data.results;
        //
        //     self.totalRegistros = response.data.count;
        //
        //     self.montarPaginacao();
        //
        //     paginacao.validarControlesPagina();
        //
        // });



    }


});