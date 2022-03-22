import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const array = [pokemons[0]];

describe('TESTANDO COMPONETE FAVORITEPOKEMONS', () => {
  it('Testa se não tiver favoritos, é exibido "No favorite pokemon found"', () => {
    RenderWithRouter(<FavoritePokemons />);
    const texto = screen.getByText('No favorite pokemon found');
    expect(texto).toBeInTheDocument();
  });
  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    RenderWithRouter(<FavoritePokemons pokemons={ array } />);
    const texto = screen.queryByText('No favorite pokemon found');
    expect(texto).not.toBeInTheDocument();
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
  });
});
