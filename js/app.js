var paginacao = {

    urlApi: null,
    tipo: null,//Se é pokémon ou move

    /**
     * Inicializa variáveis de controle da paginação
     * @param $scope Variável de escopo do módulo onde o script está sendo chamado
     */
    init: function ($scope, $http, $filter) {

        this.scope = $scope;
        this.http = $http;
        this.filter = $filter;

        //Armazena todos os itens baixados da api
        this.scope.sourceItens = [];

        //Itens filtrados pela busca
        this.scope.itensModal = [];

        this.scope.itensPagina = [];
        this.scope.resultadoFiltro = [];


        this.scope.paginaAtual = 1;
        this.scope.totalPaginas = 0;
        this.scope.inicioRegistro = 0;

        //Carregamento inicial dos registros
        this.carregarRegistros();

    },

    /**
     * Monta a paginação
     */
    montarPaginacao: function () {

        this.scope.totalPaginas = Math.ceil(this.scope.itensModal.length / this.scope.quantidadeRegistros);

        this.scope.listaPaginas = [];

        for (var i = 1; i <= this.scope.totalPaginas; i++) {

            if (i > 1) {
                this.scope.inicioRegistro = ((i - 1) * this.scope.quantidadeRegistros);
            }

            this.scope.listaPaginas.push({
                num: i,
                inicio: this.scope.inicioRegistro
            });
        }

        //Toda vez que a paginação for refeita
        //a página selecionada será a página 1
        this.scope.paginaAtual = 1;

    },


    /**
     * Verifica quais dos botões de próximo e anterior ficam habilitados ou desabilitados
     */
    validarControlesPagina: function () {

        if (this.scope.paginaAtual == 1) $('li.pagina-anterior').addClass('disabled');
        else $('.pagina-anterior').removeClass('disabled');
        if (this.scope.totalPaginas == this.scope.paginaAtual) $('li.proxima-pagina').addClass('disabled');
        else $('.proxima-pagina').removeClass('disabled');

    },

    /**
     * Seleciona a página de acordo com o que foi clicado
     * @param el Elemento da paginação que foi clicado
     */
    carregarPagina: function (el) {

        //Se for botão anterior/próximo e estiver
        //desabilitado, não faz nada
        if ($(el).hasClass('disabled')) {
            return false;
        }

        if ($(el).hasClass('pagina-anterior')) {
            this.scope.paginaAtual--;
        } else if ($(el).hasClass('proxima-pagina')) {
            this.scope.paginaAtual++;
        } else {
            this.scope.paginaAtual = el.id.replace('pg', '');
        }


        $('.num-pagina').removeClass('active');
        $('#pg' + this.scope.paginaAtual).addClass('active');


        paginacao.validarControlesPagina();

        if (this.scope.paginaAtual > 1) {
            this.scope.inicioRegistro = (this.scope.paginaAtual - 1) * this.scope.quantidadeRegistros;
        } else {
            this.scope.inicioRegistro = 0;
        }


        this.atualizarPagina();
    },


    atualizarPagina: function() {
        //Delimita registros para a página
        var inicioPagina = this.scope.inicioRegistro;
        var fimPagina = parseInt(this.scope.inicioRegistro) + parseInt(this.scope.quantidadeRegistros);
        this.scope.itensPagina = this.scope.itensModal.slice(inicioPagina, fimPagina);

    },

    /**
     * Carrega registros da api
     */
    carregarRegistros: function () {


        var self = this;


        this.http.get(this.urlApi, {cache: true}).then(function (response) {

            self.scope.sourceItens = response.data.results;

            //Acrescenta id e img no caso de pókemons
            //----------------------------------------------

            var img = null;
            var imgAlternativa = null;
            var id = null;
            var patternID = new RegExp("\/[0-9]+\/$");


            for (var i in self.scope.sourceItens) {

                id = patternID.exec(self.scope.sourceItens[i].url)[0].replace(/\//g, '');
                self.scope.sourceItens[i].id = id;


                if (self.tipo == 'pokemon') {
                    img = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png';
                    self.scope.sourceItens[i].img = img;
                }

            }

            //----------------------------------------------


            //Como inicialmente não há filtro
            //o resultado da pesquisa contém todos os registros
            self.scope.itensModal = self.filter('orderBy')(self.scope.sourceItens, 'name');


            self.atualizarPagina();


            self.montarPaginacao();

            //Controla estado dos botões próximo
            //e anterior, na paginação
            paginacao.validarControlesPagina();

        });

    }


};