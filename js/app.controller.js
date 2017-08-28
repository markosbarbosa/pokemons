angular.module('App', ['ngStorage']).controller('AppController', function($scope, $http, $localStorage) {


    $scope.$storage = $localStorage;
    $scope.timePokemons= [];
    $scope.itensModal = [];


    if($scope.$storage.time) {
        $scope.timePokemons = $scope.$storage.time;
    }



    $scope.carregarPokemons = function($event) {

        $event.preventDefault();

        $scope.tituloModal = 'Escolher Pokémon';

        paginacao.init($scope, $http);

    }


    $scope.adicionarPokemon = function($event) {

        $event.preventDefault();

        var idPoke = $event.currentTarget.id;


        var poke = $scope.procurarItem($scope.itensModal, idPoke);


        $scope.timePokemons.push({
            id: poke.id,
            nome: poke.name,
            foto: poke.img,
            moves: []
        });



        $scope.$storage.time = $scope.timePokemons;

    }


    $scope.confirmarExclusao = function($event) {

        var idPokeExcluir = $event.currentTarget.id;


        var poke = $scope.procurarItem($scope.timePokemons, idPokeExcluir);


        // $scope.modalExcluir.nome = poke.nome
        $scope.modalExcluir = {
            nome: poke.nome,
            id: poke.id,
        }

    }

    $scope.removerPokemon = function($event) {

        $event.preventDefault();

        var idPoke = $scope.modalExcluir.id;


        for(var i in $scope.timePokemons) {

           if($scope.timePokemons[i].id == idPoke) {
                $scope.timePokemons.splice(i, 1);
                break;
            }

        }

        $scope.$storage.time = $scope.timePokemons;

    }


    $scope.carregarPagina = function($event) {

        $event.preventDefault();

        paginacao.carregarPagina($event.currentTarget);

    }



    $scope.editarHabilidades = function($event) {


        $event.preventDefault();

        $scope.tituloModal = 'Gerenciar Moves';



        // $http.get({
        //     url: 'testes/moves.json',
        //     method: 'GET',
        //     cache: true
        // }).success(function(response) {
        //         $scope.itensModal = response.data;
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
        //         $scope.itensModal = data;
        //     });
        // }
        //
        //
        //
        // console.log(data);


        $http.get('testes/moves.json', {cache: true}).then(function(response) {

            $scope.itensModal = response.data;
            // cache.put('movies', $scope.itensModal);

            // console.log(response.data);
        });

    }

    /**
     * Procura um item dentro de uma coleção
     * Dentro da coleção irá procurar pelo campo com nome "id"
     */
    $scope.procurarItem = function(colecao, idItem) {

        for(var i in colecao) {
            if(colecao[i].id == idItem) {
                return colecao[i];
            }
        }

        return false;
    }


});