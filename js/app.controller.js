angular.module('App', []).controller('AppController', function($scope, $http) {


    $scope.itens_modal = [];

    $scope.cadastrarPokemon = function($event) {

        $event.preventDefault();

        $scope.tituloModal = 'Escolher Pokémon';

        paginacao.init($scope, $http);

    }



    $scope.carregarPagina = function($event) {

        $event.preventDefault();

        paginacao.carregarPagina($event.currentTarget);

    }



    $scope.editarHabilidades = function($event) {


        $event.preventDefault();

        $scope.tituloModal = 'Gerenciar Moves';

        // $scope.itens_modal =


        // $http.get({
        //     url: 'testes/moves.json',
        //     method: 'GET',
        //     cache: true
        // }).success(function(response) {
        //         $scope.itens_modal = response.data;
        //     });


        // var cache = $cacheFactory('myCache');


        // var data = cache.get('movies');
        //
        // var teste = 'oioiooio';
        //
        // if(!data) {
        //     console.log('sem cache');
        //     $http.get('testes/moves.json').then(function(response) {
        //
        //
        //
        //         data = response.data;
        //         cache.put('movies', data);
        //
        //         console.log(data);
        //         $scope.itens_modal = data;
        //     });
        // }
        //
        //
        //
        // console.log(data);


        $http.get('testes/moves.json', {cache: true}).then(function(response) {
            $scope.itensModal = response.data;
            // cache.put('movies', $scope.itens_modal);

            // console.log(response.data);
        });

    }


});