angular.module('App', ['ngStorage']).controller('AppController', function($scope, $http, $localStorage, $filter) {

    $scope.$storage = $localStorage;
    $scope.timePokemons= [];


    $jQuery = window.jQuery;


    //Altera quantidade de registros por página
    $scope.quantidadePorPagina = function() {

        $scope.inicioRegistro = 0;

        paginacao.atualizarPagina();

        paginacao.montarPaginacao();

    }


    $scope.pesquisarItem = function() {


        //Filtra elementos
        $scope.itensModal = $filter('filter')($scope.sourceItens, {name: $scope.pesquisa});

        $scope.itensModal = $filter('orderBy')($scope.itensModal, 'name')


        $scope.inicioRegistro = 0;


        paginacao.atualizarPagina();

        paginacao.montarPaginacao();

    }



    if($scope.$storage.time) {
        $scope.timePokemons = $scope.$storage.time;
    }



    $scope.carregarPokemons = function($event) {

        $event.preventDefault();

        $scope.pesquisa = '';

        paginacao.tipo = 'pokemon';
        paginacao.urlApi = 'testes/pokemons.json';
        // paginacao.urlApi = 'http://pokeapi.co/api/v2/pokemon/?limit=784';
        paginacao.init($scope, $http, $filter);

    }


    $scope.adicionarPokemon = function($event) {

        $event.preventDefault();

        var idPoke = $event.currentTarget.id;


        if($scope.timePokemons.length == 6) {
            $jQuery('#msg-alerta')
                .html('<strong>O time deve ter no máximo 6 pokémons.</strong>')
                .fadeIn();


            setTimeout(function() {
                $jQuery('#msg-alerta').fadeOut();
            }, 3000)

            return false;
        }


        var consultaPokemon = $scope.procurarItem($scope.timePokemons, idPoke);

        if(consultaPokemon) {
            $jQuery('#msg-alerta')
                .html('<strong>' + consultaPokemon.nome + '</strong> já foi adicionado ao seu time.')
                .fadeIn();


            setTimeout(function() {
                $jQuery('#msg-alerta').fadeOut();
            }, 3000)


            return false;
        }


        var poke = $scope.procurarItem($scope.itensModal, idPoke);


        $scope.timePokemons.push({
            id: poke.id,
            nome: poke.name,
            foto: poke.img,
            moves: []
        });

        //Guarda no localStorage
        $scope.$storage.time = $scope.timePokemons;



        $jQuery('#msg-sucesso')
            .html('<strong>Pokémon adicionado com sucesso.</strong>')
            .fadeIn();


        setTimeout(function() {
            $jQuery('#msg-sucesso').fadeOut();
        }, 3000)


    }


    $scope.confirmarExclusao = function($event) {

        var idPokeExcluir = $event.currentTarget.id;


        var poke = $scope.procurarItem($scope.timePokemons, idPokeExcluir);


        $scope.modalExcluir = {
            nome: poke.nome,
            id: poke.id,
            tipo: 'pokemon'
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



    $scope.carregarMoves = function($event) {


        $event.preventDefault();

        $scope.tituloModal = 'Gerenciar Moves';



        paginacao.tipo = 'move';
        paginacao.urlApi = 'testes/moves.json';
        // paginacao.urlApi = 'http://pokeapi.co/api/v2/move/';

        paginacao.init($scope, $http, $filter);


        var id = $scope.extrairId($event.currentTarget.href);

        //Carrega id do pokemon para ser utilizado
        $scope.modalMove = {idPokemon: id};



    }

    $scope.adicionarMove = function($event) {

        $event.preventDefault();



        var id = $scope.extrairId($event.currentTarget.href);
        var idPokemon = $scope.modalMove.idPokemon;

        var pokemon = $scope.procurarItem($scope.timePokemons, $scope.modalMove.idPokemon);
        var move = $scope.procurarItem($scope.itensModal, id);

        if(pokemon.moves.length >= 4) {
            $jQuery('#msg-alerta')
                .html('<strong>Cada pokemón só pode ter até 4 moves.</strong>')
                .fadeIn();


            setTimeout(function() {
                $jQuery('#msg-alerta').fadeOut();
            }, 3000)


            return false;
        }


        var consultaMove = $scope.procurarItem(pokemon.moves, id);

        if(consultaMove) {

            $jQuery('#msg-alerta')
                .html('<strong>' + move.name + '</strong> já foi adicionado a ' + '<strong>' + pokemon.nome + '<strong>.')
                .fadeIn();


            setTimeout(function() {
                $jQuery('#msg-alerta').fadeOut();
            }, 3000)


            return false;
        }

        pokemon.moves.push(move);


        $jQuery('#msg-sucesso')
            .html('<strong>' + move.name + '</strong> adicionado a ' + '<strong>' + pokemon.nome + '</strong>.')
            .fadeIn();


        setTimeout(function() {
            $jQuery('#msg-sucesso').fadeOut();
        }, 3000)


    }

    $scope.confirmarExclusaoMove = function($event, idPoke, idMove) {

        var pokemon = $scope.procurarItem($scope.timePokemons, idPoke);
        var move = $scope.procurarItem(pokemon.moves, idMove);

        $scope.modalExcluir = {
            id: move.id,
            idPoke: pokemon.id,
            nome: move.name,
            tipo: 'move'
        };

    }


    $scope.removerMove = function($event) {


        var pokemon = $scope.procurarItem($scope.timePokemons, $scope.modalExcluir.idPoke);
        var move = $scope.procurarItem(pokemon.moves, $scope.modalExcluir.id);

        var moves = pokemon.moves;
        var id = $scope.modalExcluir.id;

        for(var i in moves) {
            if(moves[i].id == id) {
                moves.splice(i, 1);
            }
        }

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

    /**
     * Extrai id da url
     * @param url URL no formato http://localhost/#{id}
     */
    $scope.extrairId = function(url) {
        var patternID = new RegExp("#[0-9]+$");
        return patternID.exec(url)[0].replace('#', '');
    }


});