import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
// import Pokedex from '../components/Pokedex';
// import pokemons from '../data';
import App from '../App';

// const array = [pokemons[0], pokemons[1]];
// const arrayBool = pokemons[0];
const testId = 'pokemon-name';

describe('TESTANDO COMPONENTE POKEDEX', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    RenderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2, name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it('Testa ao clicar no botão Próximo pokémon, exibe o próximo Pokémon da lista', () => {
    RenderWithRouter(<App />);
    const button = screen.getByTestId('next-pokemon');
    expect(button).toHaveTextContent(/próximo pokémon/i);
    const pokemon = screen.getByTestId(testId);
    expect(pokemon).toHaveTextContent(/pikachu/i);
    userEvent.click(button);
    const pokemon1 = screen.getByTestId(testId);
    expect(pokemon1).toHaveTextContent(/charmander/i);
    userEvent.click(button);
    const pokemon2 = screen.getByTestId(testId);
    expect(pokemon2).toHaveTextContent(/pikachu/i);
  });
});
