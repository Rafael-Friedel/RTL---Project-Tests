import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('TESTANDO COMPONENTE POKEMON', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    RenderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img');
    expect(name).toHaveTextContent(/pikachu/i);
    expect(type).toHaveTextContent(/electric/i);
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('Testa se existe link de detalhes com url especifica', () => {
    RenderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const link = screen.queryByRole('link');
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    RenderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const img = screen.getAllByRole('img');
    expect(img[1]).toBeInTheDocument();
    expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(img[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
