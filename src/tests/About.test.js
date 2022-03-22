import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import About from '../components/About';

describe('TESTANDO COMPONENTE ABOUT', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    RenderWithRouter(<About />);
    const textAbout = screen.getByText('This application simulates a Pokédex,');
    const textAbout2 = screen.getByText('One can filter Pokémons ');
    expect(textAbout).toBeInTheDocument();
    expect(textAbout2).toBeInTheDocument();
  });
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    RenderWithRouter(<About />);
    const header = screen.getByRole('heading', {
      name: /about pokédex/i, level: 2,
    });
    expect(header).toBeInTheDocument();
  });
  it('Testa se a pagina possui a imagem da pokedex', () => {
    RenderWithRouter(<About />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
