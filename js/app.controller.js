angular.module('App', []).controller('AppController', function($scope, $http) {


    $scope.criaturas = ['Bulbasaur', 'Ivysaur', 'Venusaur'];


    $http.get('http://pokeapi.co/api/v2/')
        .then(function(response) {
            $scope.google = response.data;
        });


    // $http.get('http://pokeapi.co/api/v2/pokemon')
    //     .then(function(response) {
    //
    //         console.log(response.data);
    //
    //         $scope.pokemons = response.data.results;
    //     });


    $http.get('testes/pokemons.json')
        .then(function(response) {
            // $scope.pokemons = response.data;
        });


    $scope.cadastrarPokemon = function($event) {

        $event.preventDefault();

        $scope.titulo_modal = 'Escolher Pokémon';
    }


    $scope.editarHabilidades = function($event) {


        $event.preventDefault();

        $scope.titulo_modal = 'Gerenciar Moves';

        $scope.itens_modal =


        $http.get('testes/moves.json')
            .then(function(response) {
                $scope.itens_modal = response.data;
            });


    }


});