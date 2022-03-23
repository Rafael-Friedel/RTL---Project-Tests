import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';
import App from '../App';

const testId = 'pokemon-name';
const nextPokemon = 'next-pokemon';
const number7 = 7;

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
    const button = screen.getByTestId(nextPokemon);
    expect(button).toHaveTextContent(/próximo pokémon/i);
    const pokemon = screen.getByTestId(testId);
    expect(pokemon).toHaveTextContent(/pikachu/i);
    userEvent.click(button);
    const pokemon1 = screen.getByTestId(testId);
    expect(pokemon1).toHaveTextContent(/charmander/i);
    userEvent.click(button);
    const pokemon2 = screen.getByTestId(testId);
    expect(pokemon2).toHaveTextContent(/caterpie/i);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    const pokemon3 = screen.getByTestId(testId);
    expect(pokemon3).toHaveTextContent(/pikachu/i);
  });
  it('Testa se mostra apenas um pokemon por vez', () => {
    RenderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(testId);
    expect(pokemon).toHaveLength(1);
  });
  it('Testea se a Pokédex tem os botões de filtro', () => {
    RenderWithRouter(<App />);
    pokemons.forEach(({ type }) => {
      const filtro = pokemons.filter(({ type: poketype }) => poketype === type);
      const buttonAll = screen.getByRole('button', { name: /all/i });
      expect(buttonAll).toBeInTheDocument();

      const button = screen.getByRole('button', { name: type });
      expect(button).toBeInTheDocument();
      userEvent.click(button);
      const buttonNext = screen.getByTestId(nextPokemon);
      const pokemon = screen.getByTestId(testId);
      expect(pokemon).toHaveTextContent(filtro[0].name);
      if (filtro.length > 1) expect(buttonNext).toBeEnabled();
      else expect(buttonNext).toBeDisabled();
    });
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(number7);
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    RenderWithRouter(<App />);
    const buttonNext = screen.getByTestId(nextPokemon);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent(/all/i);
    expect(buttonNext).toBeEnabled();
    userEvent.click(buttons[1]);
    expect(buttonNext).toBeDisabled();
    userEvent.click(buttons[0]);
    expect(buttonNext).toBeEnabled();
  });
});
