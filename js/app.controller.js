angular.module('App', [])
    .controller('AppController',

        function($scope, $http) {


    $scope.criaturas = ['Bulbasaur', 'Ivysaur', 'Venusaur'];








    // $http.get('http://pokeapi.co/api/v2/pokemon')
    //     .then(function(response) {
    //
    //         console.log(response.data);
    //
    //         $scope.pokemons = response.data.results;
    //     });


    // $http.get({
    //  url: 'testes/pokemons.json'
    // }).then(function(response) {
    //         $scope.pokemons = response.data;
    // });


    $scope.cadastrarPokemon = function($event) {

        $event.preventDefault();

        $scope.titulo_modal = 'Escolher Pokémon';


        $http.get('testes/pokemons.json', {cache: true}).then(function(response) {
            $scope.itens_modal = response.data;
            // cache.put('movies', $scope.itens_modal);

            // console.log(response.data);
        });
    }


    $scope.editarHabilidades = function($event) {


        $event.preventDefault();

        $scope.titulo_modal = 'Gerenciar Moves';

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
            $scope.itens_modal = response.data;
            // cache.put('movies', $scope.itens_modal);

            // console.log(response.data);
        });

    }


});