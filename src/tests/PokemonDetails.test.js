import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('TESTANDO COMPONENTE POKEMONDETAILS', () => {
  it('Testa se os detalhes do Pokémon selecionado são mostradas na tela.', () => {
    RenderWithRouter(<App />);
    userEvent.click((screen.getByRole('link', { name: /more details/i })));
    const name = screen.getByRole('heading', { level: 2, name: /pikachu details/i });
    expect(name).toBeInTheDocument();
    const noLink = screen.queryByRole('link', { name: /more details/i });
    expect(noLink).not.toBeInTheDocument();
    const sumaryHeading = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(sumaryHeading).toBeInTheDocument();
    const namePokemon = screen.getByTestId('pokemon-name', { name: /pikachu/i });
    const typePokemon = screen.getByTestId('pokemon-type', { name: /electric/i });
    const weightPokemon = screen.getByTestId('pokemon-weight', {
      name: /Average weight: 6.0 kg/i });
    const sumary = screen.getByText(pokemons[0].summary);
    expect(sumary).toBeInTheDocument();
    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(weightPokemon).toBeInTheDocument();
  });
  it('Testa se existe os mapas contendo as localizações do pokémon', () => {
    RenderWithRouter(<App />);
    userEvent.click((screen.getByRole('link', { name: /more details/i })));
    const heading = screen.getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`, level: 2 });
    expect(heading).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images[2]).toHaveAttribute('src', pokemons[0].foundAt[1].map);
    expect(images[1]).toHaveAttribute('src', pokemons[0].foundAt[0].map);
    const tittleLocation1 = screen.getByText(pokemons[0].foundAt[0].location);
    const tittleLocation2 = screen.getByText(pokemons[0].foundAt[1].location);
    expect(tittleLocation1).toBeInTheDocument();
    expect(tittleLocation2).toBeInTheDocument();
    expect(images[2]).toHaveAttribute('alt', `${pokemons[0].name} location`);
    expect(images[1]).toHaveAttribute('alt', `${pokemons[0].name} location`);
  });
  it('Testa se o usuário pode favoritar um pokémon', () => {
    RenderWithRouter(<App />);
    userEvent.click((screen.getByRole('link', { name: /more details/i })));
    const checkbox = screen.getByLabelText(/pokémon favoritado?/i);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox.type).toBe('checkbox');
    userEvent.click(checkbox);
    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(checkbox);
    const imagesClick = screen.getAllByRole('img');
    expect(imagesClick[1]).not.toHaveAttribute('src', '/star-icon.svg');
  });
});
